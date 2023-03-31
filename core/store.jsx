import { getScope } from '../store';
import * as React from 'react';
import { Provider as ReduxProvider, createDispatchHook, createSelectorHook, createStoreHook, } from 'react-redux';
/** @public */
export const ScopeContext = React.createContext({ scope: '' });
/** @public */
export const EditorContext = React.createContext(undefined);
/** @public */
export const ErrorContext = React.createContext(undefined);
/**
 * Store Provider
 *
 * @param props - The {@link https://react-redux.js.org/api/provider#props | ProviderProps}
 * @public
 */
export function Provider(props) {
    return <ReduxProvider {...props} context={EditorContext}/>;
}
/**
 * @param enforcedScope - If provided, used as the scope instead of the current scope
 * @public
 */
export function useScope(enforcedScope) {
    const { scope } = React.useContext(ScopeContext);
    return enforcedScope === undefined ? scope : enforcedScope;
}
/** @public */
export const useDispatch = createDispatchHook(EditorContext);
/**
 * React Hook to dispatch an action in the current scope
 *
 * @param enforcedScope - If provided, used as the scope instead of the current scope
 * @public
 */
export function useScopedDispatch(enforcedScope) {
    const scope = useScope(enforcedScope);
    const dispatch = useDispatch();
    return React.useCallback((scopedAction) => {
        dispatch(scopedAction(scope));
    }, [dispatch, scope]);
}
function scopeDispatch(dispatch, scope) {
    return (scopedAction) => {
        dispatch(scopedAction(scope));
    };
}
/** @public */
export const useSelector = createSelectorHook(EditorContext);
/**
 * React Hook to get the value of an selector in the current scope
 *
 * @param scopedSelector - The selector
 * @param enforcedScope - If provided, used as the scope instead of the current scope
 * @returns The value of the selector in the current scope
 * @public
 */
export function useScopedSelector(scopedSelector, enforcedScope) {
    const scope = useScope(enforcedScope);
    return useSelector((state) => scopedSelector(getScope(state, scope)));
}
/** @public */
export const useStore = createStoreHook(EditorContext);
/**
 * React Hook to obtain a reference to the scoped store
 *
 * @param enforcedScope - If provided, used as the scope instead of the current scope
 * @returns The scoped store
 * @public
 */
export function useScopedStore(enforcedScope) {
    const scope = useScope(enforcedScope);
    const store = useStore();
    return React.useMemo(() => {
        return {
            dispatch: scopeDispatch(store.dispatch, scope),
            getState: () => {
                return getScope(store.getState(), scope);
            },
            subscribe: (listener) => {
                return store.subscribe(listener);
            },
        };
    }, [scope, store]);
}
