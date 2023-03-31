import { BooleanStateType, ChildStateType, ChildStateTypeConfig, EditorPlugin, EditorPluginProps, NumberStateType, ObjectStateType } from '../plugin';
import { DeepPartial } from '../ui';
/**
 * @param config - {@link MultimediaExplanationConfig | Plugin configuration}
 * @public
 */
export declare function createMultimediaExplanationPlugin(config: MultimediaExplanationConfig): EditorPlugin<MultimediaExplanationPluginState, MultimediaExplanationConfig>;
/** @public */
export interface MultimediaExplanationConfig extends Omit<MultimediaExplanationPluginConfig, 'features' | 'i18n'> {
    explanation: ChildStateTypeConfig;
    i18n?: DeepPartial<MultimediaExplanationPluginConfig['i18n']>;
    features?: {
        importance?: boolean;
    };
}
/** @public */
export type MultimediaExplanationPluginState = ObjectStateType<{
    explanation: ChildStateType;
    multimedia: ChildStateType;
    illustrating: BooleanStateType;
    width: NumberStateType;
}>;
/** @public */
export interface MultimediaExplanationPluginConfig {
    plugins: {
        name: string;
        title: string;
    }[];
    i18n: {
        changeMultimediaType: string;
        reset: string;
        illustrating: {
            label: string;
            values: {
                illustrating: string;
                explaining: string;
            };
        };
    };
    features: {
        importance: boolean;
    };
}
/** @public */
export type MultimediaExplanationProps = EditorPluginProps<MultimediaExplanationPluginState, MultimediaExplanationConfig>;
