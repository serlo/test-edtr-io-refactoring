import { BooleanStateType, ChildStateType, EditorPlugin, EditorPluginProps, NumberStateType, ObjectStateType, OptionalStateType, StringStateType, UploadHandler, UploadStateType, UploadValidator } from '../plugin';
import { DeepPartial } from '../ui';
/**
 * @param config - {@link ImageConfig | Plugin configuration}
 * @public
 */
export declare function createImagePlugin(config: ImageConfig): EditorPlugin<ImagePluginState, ImageConfig>;
/** @public */
export interface ImageConfig extends Omit<ImagePluginConfig, 'i18n'> {
    i18n?: DeepPartial<ImagePluginConfig['i18n']>;
}
/** @public */
export type ImagePluginState = ObjectStateType<{
    src: UploadStateType<string>;
    link: OptionalStateType<ObjectStateType<{
        href: StringStateType;
        openInNewTab: BooleanStateType;
    }>>;
    alt: OptionalStateType<StringStateType>;
    maxWidth: OptionalStateType<NumberStateType>;
    caption: OptionalStateType<ChildStateType>;
}>;
/** @public */
export interface ImagePluginConfig {
    upload: UploadHandler<string>;
    validate: UploadValidator;
    secondInput?: 'description' | 'link';
    i18n: {
        label: string;
        failedUploadMessage: string;
        src: {
            label: string;
            placeholder: {
                empty: string;
                uploading: string;
                failed: string;
            };
            retryLabel: string;
        };
        link: {
            href: {
                label: string;
                placeholder: string;
            };
            openInNewTab: {
                label: string;
            };
        };
        alt: {
            label: string;
            placeholder: string;
        };
        maxWidth: {
            label: string;
            placeholder: string;
        };
        caption: {
            placeholder: string;
        };
    };
}
/** @public */
export type ImageProps = EditorPluginProps<ImagePluginState, ImageConfig>;
