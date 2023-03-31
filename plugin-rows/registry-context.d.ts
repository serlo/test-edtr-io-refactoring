import * as React from 'react';
export declare const defaultRegistryPlugins: ({
    name: string;
    title: string;
    icon: React.ComponentType<{}>;
} | {
    name: string;
    title: string;
    icon?: undefined;
})[];
/** @internal */
export declare const RegistryContext: React.Context<Registry>;
/** @internal */
export type Registry = {
    name: string;
    title?: string;
    icon?: React.ComponentType;
    description?: string;
}[];
