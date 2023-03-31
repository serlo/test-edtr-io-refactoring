import * as R from 'ramda';
import { generate } from 'shortid';
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @param type - The {@link @edtr-io/internal__plugin-state#StateType | state type} of the list items
 * @param initialCount - The initial number of list items
 * @public
 */
export function list(type, initialCount = 0) {
    return {
        init(rawItems, onChange) {
            const items = rawItems.map((item) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return type.init(item.value, createOnChange(item.id));
            });
            return Object.assign(items, {
                set(updater) {
                    onChange((wrappedItems, helpers) => {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                        const unwrapped = R.map((wrapped) => wrapped.value, wrappedItems);
                        return R.map(wrap, updater(unwrapped, (options) => 
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                        type.deserialize(options, helpers)));
                    });
                },
                insert(index, options) {
                    onChange((items, helpers) => {
                        const wrappedSubState = wrap(options
                            ? type.deserialize(options, helpers)
                            : type.createInitialState(helpers));
                        return R.insert(index === undefined ? items.length : index, wrappedSubState, items);
                    });
                },
                remove(index) {
                    onChange((items) => R.remove(index, 1, items));
                },
                move(from, to) {
                    onChange((items) => R.move(from, to, items));
                },
            });
            function createOnChange(id) {
                return (initial, { executor, reverse, } = {}) => {
                    function wrapReverse(reverse) {
                        return (oldItems) => {
                            const index = R.findIndex(R.propEq('id', id), oldItems);
                            return R.update(index, { value: reverse(oldItems[index].value), id: id }, oldItems);
                        };
                    }
                    function wrapUpdater(initial) {
                        return (oldItems, helpers) => {
                            const index = R.findIndex(R.propEq('id', id), oldItems);
                            return R.update(index, { value: initial(oldItems[index].value, helpers), id: id }, oldItems);
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
                };
            }
        },
        createInitialState(helpers) {
            return R.times(() => {
                return wrap(type.createInitialState(helpers));
            }, initialCount);
        },
        deserialize(serialized, helpers) {
            return R.map((s) => {
                return wrap(type.deserialize(s, helpers));
            }, serialized);
        },
        serialize(deserialized, helpers) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return R.map(({ value }) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return type.serialize(value, helpers);
            }, deserialized);
        },
        getFocusableChildren(items) {
            return R.flatten(R.map((item) => {
                return type.getFocusableChildren(item.value);
            }, items));
        },
    };
    function wrap(value) {
        return {
            id: generate(),
            value,
        };
    }
}
