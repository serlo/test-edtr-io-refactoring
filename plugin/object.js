import * as R from 'ramda';
/**
 * @param types - The {@link @edtr-io/internal__plugin-state#StateType | state types} of the properties of the object
 * @param getFocusableChildren - Allows to override the default order of focusable children
 * @public
 */
export function object(types, getFocusableChildren = (children) => {
    return R.flatten(R.values(children));
}) {
    return {
        init(state, onChange) {
            return R.mapObjIndexed((type, key) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return type.init(state[key], innerOnChange);
                function innerOnChange(initial, { executor, reverse, } = {}) {
                    function wrapReverse(reverse) {
                        return (oldObj) => {
                            return R.set(R.lensProp(key), reverse(oldObj[key]), oldObj);
                        };
                    }
                    function wrapUpdater(initial) {
                        return (oldObj, helpers) => {
                            return R.set(R.lensProp(key), initial(oldObj[key], helpers), oldObj);
                        };
                    }
                    onChange(wrapUpdater(initial), {
                        executor: executor
                            ? (resolve, reject, next) => {
                                executor((innerUpdater) => resolve(wrapUpdater(innerUpdater)), (innerUpdater) => reject(wrapUpdater(innerUpdater)), (innerUpdater) => next(wrapUpdater(innerUpdater)));
                            }
                            : undefined,
                        reverse: reverse ? wrapReverse(reverse) : undefined,
                    });
                }
            }, types);
        },
        createInitialState(helpers) {
            return R.map((type) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return type.createInitialState(helpers);
            }, types);
        },
        deserialize(serialized, helpers) {
            return R.mapObjIndexed((type, key) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return type.deserialize(serialized[key], helpers);
            }, types);
        },
        serialize(deserialized, helpers) {
            return R.mapObjIndexed((type, key) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return type.serialize(deserialized[key], helpers);
            }, types);
        },
        getFocusableChildren(state) {
            const children = R.mapObjIndexed((type, key) => {
                return type.getFocusableChildren(state[key]);
            }, types);
            return getFocusableChildren(children);
        },
    };
}
