import * as React from 'react';
import { RowsPluginConfig } from '../..';
export declare const Plugin: ({ config, plugin, pluginName, onClick, }: {
    plugin: {
        name: string;
        title?: string;
        icon?: React.ComponentType;
        description?: string;
    };
    pluginName: string;
    config: RowsPluginConfig;
    onClick: () => void;
}) => JSX.Element;
