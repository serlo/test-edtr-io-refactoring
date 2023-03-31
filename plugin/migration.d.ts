import { StateType } from './internal-plugin-state';
/**
 * @param type - The initial {@link @edtr-io/internal__plugin-state#StateType | state type} to start the migration from
 * @public
 */
export declare function migratable<S, T, R>(type: StateType<S, T, R>): MigratableStateType<S, S, S, T, R>;
/** @public */
export interface Versionized<S> {
    __version__: number;
    value: S;
}
/** @public */
export interface MigratableStateType<InitialS, AllS, S, T, R> extends StateType<InitialS | Versionized<AllS>, T, R> {
    migrate<S1, T1, R1>(nextType: StateType<S1, T1, R1>, migrate: (previousState: S) => S1): MigratableStateType<InitialS, AllS | S1, S1, T1, R1>;
}
