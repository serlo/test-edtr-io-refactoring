/// <reference types="react" />
import { EditorPlugin } from '../plugin';
import { CustomTheme } from '../ui';
/**
 * @param props - The props
 * @public
 */
export declare function Renderer<K extends string = string>(props: RendererProps<K>): JSX.Element;
/** @public */
export interface RendererProps<K extends string = string> {
    plugins: Record<K, EditorPlugin>;
    state: {
        plugin: K;
        state?: unknown;
    };
    theme?: CustomTheme;
}
