/**
 * @param initialValue - The initial value
 * @public
 */
export function boolean(initialValue) {
    return scalar(initialValue || false);
}
/**
 * @param initialValue - The initial value
 * @public
 */
export function number(initialValue) {
    return scalar(initialValue || 0);
}
/**
 * @param initialValue - The initial value
 * @public
 */
export function string(initialValue) {
    return scalar(initialValue || '');
}
/**
 * @param initialState - The initial value
 * @public
 */
export function scalar(initialState) {
    return serializedScalar(initialState, {
        deserialize(state) {
            return state;
        },
        serialize(state) {
            return state;
        },
    });
}
/**
 * @param initialState - The initial state
 * @param serializer - The {@link Serializer | serializer}
 * @public
 */
export function serializedScalar(initialState, serializer) {
    return {
        init(state, onChange) {
            class SerializedScalarType {
                get value() {
                    return state;
                }
                set value(param) {
                    this.set(param);
                }
                get() {
                    return state;
                }
                set(param, reverse) {
                    onChange((previousValue) => {
                        if (typeof param === 'function') {
                            const updater = param;
                            return updater(previousValue);
                        }
                        return param;
                    }, {
                        reverse,
                    });
                }
            }
            return new SerializedScalarType();
        },
        createInitialState() {
            return initialState;
        },
        getFocusableChildren() {
            return [];
        },
        ...serializer,
    };
}
/**
 * @param initial - The initialValue
 * @param isTemporaryValue - Checks whether the given value is temporary
 * @public
 */
export function asyncScalar(initial, isTemporaryValue) {
    // warp boolean to typeguard
    function isTemporary(field) {
        return isTemporaryValue(field);
    }
    return {
        init(state, onChange) {
            return {
                value: state,
                get() {
                    return state;
                },
                set(initial, executor) {
                    onChange((previousState) => {
                        if (typeof initial === 'function') {
                            const f = initial;
                            return f(previousState);
                        }
                        return initial;
                    }, {
                        executor: executor
                            ? (resolve, reject, next) => {
                                if (!executor)
                                    return;
                                executor(wrapResolverParam(resolve), wrapResolverParam(reject), wrapResolverParam(next));
                            }
                            : undefined,
                    });
                },
            };
            function wrapResolverParam(callback) {
                return (update) => {
                    if (typeof update === 'function') {
                        const f = update;
                        return callback(f);
                    }
                    return callback(() => update);
                };
            }
        },
        createInitialState() {
            return initial;
        },
        getFocusableChildren() {
            return [];
        },
        deserialize(serialized) {
            return serialized;
        },
        serialize(deserialized) {
            if (isTemporary(deserialized)) {
                return initial;
            }
            return deserialized;
        },
    };
}
