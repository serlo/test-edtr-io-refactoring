/// <reference types="react" />
export declare function InlineCheckbox({ checked, onChange, label }: CheckboxProps): JSX.Element;
export interface CheckboxProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
}
