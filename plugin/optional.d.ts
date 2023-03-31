import { StateType, StateTypeReturnType, StateTypeSerializedType, StateTypeValueType } from './internal-plugin-state';
/**
 * @param type - The {@link @edtr-io/internal__plugin-state#StateType | state type} for defined values
 * @param initiallyDefined - Whether the value should be defined initially
 * @public
 */
export declare function optional<D extends StateType>(type: D, initiallyDefined?: boolean): OptionalStateType<D>;
/** @public */
export type OptionalStateType<D extends StateType> = StateType<StateTypeSerializedType<D> | undefined, Optional<StateTypeValueType<D>>, {
    defined: false;
    create(value?: StateTypeSerializedType<D>): void;
} | (StateTypeReturnType<D> & {
    defined: true;
    remove(): void;
})>;
/** @public */
export type Optional<T> = {
    defined: true;
    value: T;
} | {
    defined: false;
    value: null;
};
