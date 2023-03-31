import * as React from 'react';
import { StateType, PluginProps } from './internal-plugin-state';
/**
 * @param params - The params
 * @public
 */
export declare function child<K extends string, S = unknown>(params: ChildStateTypeConfig): ChildStateType<K, S>;
/** @public */
export type ChildStateType<K extends string = string, S = unknown> = StateType<{
    plugin: K;
    state?: S;
}, string, {
    get(): string;
    id: string;
    render: (props?: PluginProps) => React.ReactElement;
    replace: (plugin: K, state?: S) => void;
}>;
/** @public */
export interface ChildStateTypeConfig<K extends string = string, S = unknown> {
    plugin: K;
    initialState?: S;
    config?: {};
}
