import { InternalAction } from './actions';
import { State, ScopedState, InternalState } from './storetypes';
/**
 * The Edtr.io root reducer
 *
 * @param state - The current {@link State | state} or `undefined`
 * @param action - The {@link Action | action} to dispatch
 * @returns The new {@link State | state}
 * @internal
 */
export declare function reducer(state: InternalState | undefined, action: InternalAction): InternalState;
/**
 * Gets the {@link ScopedState | state} of a scope
 *
 * @param state - The current {@link State | state}
 * @param scope - The scope
 * @returns The {@link ScopedState | state} of the specified scope
 * @public
 */
export declare function getScope(state: State, scope: string): ScopedState;
