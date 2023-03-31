/**
 * @param type - The {@link @edtr-io/internal__plugin-state#StateType | state type} for defined values
 * @param initiallyDefined - Whether the value should be defined initially
 * @public
 */
export function optional(type, initiallyDefined = false) {
    return {
        init(state, onChange) {
            if (state.defined) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const value = type.init(state.value, innerOnChange);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return Object.assign(value, {
                    defined: true,
                    remove() {
                        onChange(() => {
                            return {
                                defined: false,
                                value: null,
                            };
                        });
                    },
                });
            }
            return {
                defined: false,
                create(value) {
                    onChange((_previousState, helpers) => {
                        return {
                            defined: true,
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            value: value === undefined
                                ? type.createInitialState(helpers)
                                : type.deserialize(value, helpers),
                        };
                    });
                },
            };
            function innerOnChange(initial, { executor, } = {}) {
                return onChange(wrapStateUpdater(initial), {
                    executor: typeof executor === 'function'
                        ? (resolve, reject, next) => {
                            executor((value) => {
                                resolve(wrapStateUpdater(value));
                            }, (value) => {
                                reject(wrapStateUpdater(value));
                            }, (value) => {
                                next(wrapStateUpdater(value));
                            });
                        }
                        : undefined,
                });
            }
            function wrapStateUpdater(f) {
                return (previousState, helpers) => {
                    if (previousState.defined) {
                        return {
                            defined: true,
                            value: f(previousState.value, helpers),
                        };
                    }
                    else {
                        return {
                            defined: true,
                            value: f(type.createInitialState(helpers), helpers),
                        };
                    }
                };
            }
        },
        createInitialState(helpers) {
            if (initiallyDefined) {
                return {
                    defined: true,
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    value: type.createInitialState(helpers),
                };
            }
            return {
                defined: false,
                value: null,
            };
        },
        deserialize(serialized, helpers) {
            if (serialized === undefined) {
                return {
                    defined: false,
                    value: null,
                };
            }
            return {
                defined: true,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                value: type.deserialize(serialized, helpers),
            };
        },
        serialize(deserialized, helpers) {
            if (deserialized.defined) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return type.serialize(deserialized.value, helpers);
            }
            return undefined;
        },
        getFocusableChildren(state) {
            if (state.defined)
                return type.getFocusableChildren(state.value);
            return [];
        },
    };
}
