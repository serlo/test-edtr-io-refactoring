/// <reference types="react" />
import { MathEditorProps } from './editor-props';
interface VisualEditorProps extends MathEditorProps {
    onError(): void;
}
export declare function VisualEditor(props: VisualEditorProps): JSX.Element;
export {};
