/// <reference types="react" />
/**
 * @param props - Props
 * @public
 */
export declare function EditorCheckbox(props: EditorCheckboxProps): JSX.Element;
/** @public */
export interface EditorCheckboxProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
}
