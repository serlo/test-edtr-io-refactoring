import { StateType, StateTypesSerializedType, StateTypesValueType, StateTypesReturnType } from './internal-plugin-state';
/**
 * @param types - The {@link @edtr-io/internal__plugin-state#StateType | state types} of the properties of the object
 * @param getFocusableChildren - Allows to override the default order of focusable children
 * @public
 */
export declare function object<Ds extends Record<string, StateType>>(types: Ds, getFocusableChildren?: (children: {
    [K in keyof Ds]: {
        id: string;
    }[];
}) => {
    id: string;
}[]): ObjectStateType<Ds>;
/** @public */
export type ObjectStateType<Ds extends Record<string, StateType>> = StateType<StateTypesSerializedType<Ds>, StateTypesValueType<Ds>, StateTypesReturnType<Ds>>;
