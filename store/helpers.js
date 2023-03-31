import * as R from 'ramda';
import { createSelectorCreator, defaultMemoize } from 'reselect';
export function createActionCreator(type) {
    const actionCreator = (payload) => (scope) => {
        return {
            type,
            payload,
            scope,
        };
    };
    actionCreator.type = type;
    return actionCreator;
}
export function createActionWithoutPayload(type) {
    const actionCreator = () => (scope) => {
        return { type, scope };
    };
    actionCreator.type = type;
    return actionCreator;
}
export function createSubReducer(key, initialState, actionsMap) {
    return (action, state) => {
        const subState = (state && state[key]) || initialState;
        if (!state)
            return subState;
        const caseReducer = actionsMap[action.type];
        return typeof caseReducer === 'function'
            ? caseReducer(subState, action, state)
            : subState;
    };
}
/**
 * @param f - The selector
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createSelector(f) {
    return (...args) => (state) => f(state, ...args);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createInternalSelector(f) {
    return (...args) => (state) => f(state, ...args);
}
const createDeepEqualSelectorCreator = createSelectorCreator(defaultMemoize, R.equals);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createDeepEqualSelector(f) {
    return (...args) => {
        return createDeepEqualSelectorCreator((state) => {
            return f(state, ...args);
        }, (s) => s);
    };
}
const createJsonStringifySelectorCreator = createSelectorCreator(defaultMemoize, (a, b) => JSON.stringify(a) === JSON.stringify(b));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createJsonStringifySelector(f) {
    return (...args) => {
        return createJsonStringifySelectorCreator((state) => {
            return f(state, ...args);
        }, (s) => s);
    };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function scopeSelector(selector, scope) {
    return (storeState, ...args) => {
        return selector(...args)(storeState[scope]);
    };
}
