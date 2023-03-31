import { StateExecutor, StateType } from './internal-plugin-state';
/**
 * @param initialValue - The initial value
 * @public
 */
export declare function boolean(initialValue?: boolean): BooleanStateType;
/** @public */
export type BooleanStateType = ScalarStateType<boolean>;
/**
 * @param initialValue - The initial value
 * @public
 */
export declare function number(initialValue?: number): NumberStateType;
/** @public */
export type NumberStateType = ScalarStateType<number>;
/**
 * @param initialValue - The initial value
 * @public
 */
export declare function string(initialValue?: string): StringStateType;
/** @public */
export type StringStateType = ScalarStateType<string>;
/**
 * @param initialState - The initial value
 * @public
 */
export declare function scalar<S>(initialState: S): ScalarStateType<S>;
/** @public */
export type ScalarStateType<S> = SerializedScalarStateType<S, S>;
/**
 * @param initialState - The initial state
 * @param serializer - The {@link Serializer | serializer}
 * @public
 */
export declare function serializedScalar<S, T>(initialState: T, serializer: Serializer<S, T>): SerializedScalarStateType<S, T>;
/** @public */
export type SerializedScalarStateType<S, T> = StateType<S, T, {
    value: T;
    get(): T;
    set(value: T | ((currentValue: T) => T), reverse?: (previousValue: T) => T): void;
}>;
/** @public */
export interface Serializer<S, T> {
    deserialize(serialized: S): T;
    serialize(deserialized: T): S;
}
/**
 * @param initial - The initialValue
 * @param isTemporaryValue - Checks whether the given value is temporary
 * @public
 */
export declare function asyncScalar<T, Temp>(initial: T, isTemporaryValue: (field: T | Temp) => boolean): AsyncScalarStateType<T, Temp>;
/** @public */
export type AsyncScalarStateType<T, Temp> = StateType<T, T | Temp, {
    value: T | Temp;
    get(): T | Temp;
    set(initial: T | Temp | ((previousValue: T | Temp) => T | Temp), executor?: StateExecutor<T | Temp | ((previousValue: T | Temp) => T | Temp)>): void;
}>;
