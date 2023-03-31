/// <reference types="react" />
import { RowsPluginConfig } from '../..';
interface MenuProps {
    menu: {
        index: number;
        onClose: (pluginState: {
            plugin: string;
            state?: unknown;
        }) => void;
    };
    setMenu: (newMenu?: MenuProps['menu']) => void;
    config: RowsPluginConfig;
}
export declare function Menu({ menu, setMenu, config }: MenuProps): JSX.Element;
export {};
