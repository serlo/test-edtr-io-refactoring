import { Action, InternalAction } from './actions';
import { ScopedState, Selector, ActionCreatorWithPayload, ActionCreatorWithoutPayload, InternalScopedState, InternalSelector, InternalState } from './types';
export declare function createActionCreator<T, P>(type: T): ActionCreatorWithPayload<T, P>;
export declare function createActionWithoutPayload<T>(type: T): ActionCreatorWithoutPayload<T>;
export declare function createSubReducer<K extends keyof InternalScopedState>(key: K, initialState: InternalScopedState[K], actionsMap: CaseReducersMapObject<InternalScopedState[K]>): SubReducer<InternalScopedState[K]>;
/**
 * @param f - The selector
 * @public
 */
export declare function createSelector<T, P extends any[]>(f: (state: ScopedState, ...args: P) => T): Selector<T, P>;
export declare function createInternalSelector<T, P extends any[]>(f: (state: InternalScopedState, ...args: P) => T): InternalSelector<T, P>;
export declare function createDeepEqualSelector<T, P extends any[]>(f: (state: ScopedState, ...args: P) => T): Selector<T, P>;
export declare function createJsonStringifySelector<T, P extends any[]>(f: (state: ScopedState, ...args: P) => T): Selector<T, P>;
export declare function scopeSelector<T, P extends any[]>(selector: Selector<T, P> | InternalSelector<T, P>, scope: string): (storeState: InternalState, ...args: P) => T;
/** @internal */
export type SubReducer<S = unknown> = (action: InternalAction, state: InternalScopedState | undefined) => S;
export interface CaseReducersMapObject<S = unknown> {
    [actionType: string]: CaseReducer<S, any>;
}
export type CaseReducer<S = unknown, A extends Action = Action> = (subState: S, action: A, state: ScopedState) => S;
