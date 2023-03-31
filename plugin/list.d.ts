import { StateType, StateTypeReturnType, StateTypeSerializedType, StateTypeValueType } from './internal-plugin-state';
/**
 * @param type - The {@link @edtr-io/internal__plugin-state#StateType | state type} of the list items
 * @param initialCount - The initial number of list items
 * @public
 */
export declare function list<D extends StateType>(type: D, initialCount?: number): ListStateType<D>;
/** @public */
export type ListStateType<D extends StateType> = StateType<StateTypeSerializedType<D>[], {
    id: string;
    value: StateTypeValueType<D>;
}[], StateTypeReturnType<D>[] & {
    set(updater: (currentList: StateTypeValueType<D>[], deserialize: (serialized: StateTypeSerializedType<D>) => StateTypeValueType<D>) => StateTypeValueType<D>[]): void;
    insert(index?: number, options?: StateTypeSerializedType<D>): void;
    remove(index: number): void;
    move(from: number, to: number): void;
}>;
