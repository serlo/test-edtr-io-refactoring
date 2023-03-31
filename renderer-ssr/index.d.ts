import { RendererProps } from '../renderer';
/**
 * @param props - The {@link @edtr-io/renderer#RendererProps | renderer props}
 * @public
 */
export declare function render<K extends string = string>(props: RendererProps<K>): {
    styles: string;
    html: string;
};
export { RendererProps };
