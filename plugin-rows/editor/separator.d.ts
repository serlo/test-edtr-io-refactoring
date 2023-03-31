/// <reference types="react" />
import { RowsPluginConfig } from '..';
export declare function Add({ config, focused, onClick, visuallyEmphasized, }: {
    config: RowsPluginConfig;
    focused: boolean;
    onClick: () => void;
    visuallyEmphasized?: boolean;
}): JSX.Element;
export declare function Separator({ config, isFirst, isLast, onClick, focused, }: {
    config: RowsPluginConfig;
    isFirst?: boolean;
    isLast?: boolean;
    onClick: () => void;
    focused?: boolean;
}): JSX.Element;
