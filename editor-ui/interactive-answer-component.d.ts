import * as React from 'react';
/**
 * @param props - Props
 * @internal
 */
export declare function AddButton(props: AddButtonProps): JSX.Element;
/** @internal */
export interface AddButtonProps {
    onClick: () => void;
    children: string;
    title?: string;
}
/** @internal */
export declare class CheckElement extends React.Component<CheckElementProps> {
    render(): JSX.Element;
}
/**
 * @param props - Props
 * @internal
 */
export declare function InteractiveAnswer(props: InteractiveAnswerProps): JSX.Element;
/** @internal */
export interface InteractiveAnswerProps {
    isRadio?: boolean;
    isActive?: boolean;
    handleChange: () => void;
    answerID?: string;
    feedbackID: string;
    answer: HTMLInputElement | React.ReactNode;
    feedback: React.ReactNode;
    focusedElement?: string;
    remove: () => void;
    i18n: {
        answer: {
            label: string;
        };
        feedback: {
            label: string;
        };
    };
}
/** @internal */
export interface CheckElementProps {
    isRadio: boolean;
    isActive: boolean;
    handleChange: (event: React.MouseEvent) => void;
}
