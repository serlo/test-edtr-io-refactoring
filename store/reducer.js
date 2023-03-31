import * as R from 'ramda';
import { applyActions, setPartialState, } from './actions';
import { clipboardReducer } from './clipboard/reducer';
import { documentsReducer } from './documents/reducer';
import { focusReducer } from './focus/reducer';
import { createActionWithoutPayload } from './helpers';
import { historyReducer } from './history/reducer';
import { pluginsReducer } from './plugins/reducer';
import { rootReducer } from './root/reducer';
/**
 * The Edtr.io root reducer
 *
 * @param state - The current {@link State | state} or `undefined`
 * @param action - The {@link Action | action} to dispatch
 * @returns The new {@link State | state}
 * @internal
 */
export function reducer(state = {}, action) {
    if (action.scope === undefined) {
        return R.map((state) => scopedReducer(state, action), state);
    }
    if (action.type === applyActions.type) {
        return R.reduce(reducer, state, action.payload);
    }
    if (action.type === setPartialState.type) {
        return {
            ...state,
            [action.scope]: {
                ...state[action.scope],
                ...action.payload,
            },
        };
    }
    return {
        ...state,
        [action.scope]: scopedReducer(state[action.scope], action),
    };
}
function scopedReducer(scopeState, action) {
    return {
        clipboard: clipboardReducer(action, scopeState),
        documents: documentsReducer(action, scopeState),
        focus: focusReducer(action, scopeState),
        history: historyReducer(action, scopeState),
        plugins: pluginsReducer(action, scopeState),
        root: rootReducer(action, scopeState),
    };
}
/**
 * Gets the {@link ScopedState | state} of a scope
 *
 * @param state - The current {@link State | state}
 * @param scope - The scope
 * @returns The {@link ScopedState | state} of the specified scope
 * @public
 */
export function getScope(state, scope) {
    const scopedState = state[scope];
    if (!scopedState) {
        const fakeInitAction = createActionWithoutPayload('InitSubScope')()(scope);
        return reducer(state, fakeInitAction)[scope];
    }
    return scopedState;
}
