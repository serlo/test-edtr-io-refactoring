import { Action, ScopedState, State } from '@edtr-io/store';
import * as React from 'react';
import { ProviderProps, ReactReduxContextValue } from 'react-redux';
import { Unsubscribe } from 'redux';
/** @public */
export declare const ScopeContext: React.Context<{
    scope: string;
    editable?: boolean | undefined;
}>;
/** @public */
export declare const EditorContext: React.Context<ReactReduxContextValue<State, import("redux").AnyAction>>;
/** @public */
export declare const ErrorContext: React.Context<((error: Error, errorInfo: {
    componentStack: string;
}) => void) | undefined>;
/**
 * Store Provider
 *
 * @param props - The {@link https://react-redux.js.org/api/provider#props | ProviderProps}
 * @public
 */
export declare function Provider(props: ProviderProps<Action> & {
    children: React.ReactNode;
}): JSX.Element;
/**
 * @param enforcedScope - If provided, used as the scope instead of the current scope
 * @public
 */
export declare function useScope(enforcedScope?: string): string;
/** @public */
export declare const useDispatch: () => import("redux").Dispatch<import("redux").AnyAction>;
/**
 * React Hook to dispatch an action in the current scope
 *
 * @param enforcedScope - If provided, used as the scope instead of the current scope
 * @public
 */
export declare function useScopedDispatch(enforcedScope?: string): (scopedAction: (scope: string) => Action) => void;
/** @public */
export declare const useSelector: <Selected extends unknown>(selector: (state: State) => Selected, equalityFn?: ((previous: Selected, next: Selected) => boolean) | undefined) => Selected;
/**
 * React Hook to get the value of an selector in the current scope
 *
 * @param scopedSelector - The selector
 * @param enforcedScope - If provided, used as the scope instead of the current scope
 * @returns The value of the selector in the current scope
 * @public
 */
export declare function useScopedSelector<T>(scopedSelector: (state: ScopedState) => T, enforcedScope?: string): T;
/** @public */
export declare const useStore: () => import("redux").Store<State, import("redux").AnyAction>;
/**
 * React Hook to obtain a reference to the scoped store
 *
 * @param enforcedScope - If provided, used as the scope instead of the current scope
 * @returns The scoped store
 * @public
 */
export declare function useScopedStore(enforcedScope?: string): {
    dispatch: (scopedAction: (scope: string) => Action) => void;
    getState: () => ScopedState;
    subscribe: (listener: () => void) => Unsubscribe;
};
