import { ChildStateType, ChildStateTypeConfig, EditorPlugin, EditorPluginProps } from '../plugin';
/**
 * @param config - {@link BlockquoteConfig | Plugin configuration}
 * @public
 */
export declare function createBlockquotePlugin(config: BlockquoteConfig): EditorPlugin<BlockquotePluginState>;
/** @public */
export interface BlockquoteConfig {
    content: ChildStateTypeConfig;
}
/** @public */
export type BlockquotePluginState = ChildStateType;
/** @public */
export type BlockquoteProps = EditorPluginProps<BlockquotePluginState>;
