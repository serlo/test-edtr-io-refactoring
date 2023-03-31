import { StateTypeReturnType } from '../../plugin';
import { getPlugins, SelectorReturnType } from '../../store';
import * as React from 'react';
import { RowsPluginConfig, RowsPluginState } from '..';
export declare function RowRenderer({ config, row, rows, index, plugins, dropContainer, }: {
    config: RowsPluginConfig;
    row: StateTypeReturnType<RowsPluginState>[0];
    rows: StateTypeReturnType<RowsPluginState>;
    index: number;
    plugins: SelectorReturnType<typeof getPlugins>;
    dropContainer: React.RefObject<HTMLDivElement>;
}): JSX.Element;
