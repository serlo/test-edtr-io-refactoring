import { StateTypeReturnType } from '../plugin';
import * as React from 'react';
import { ScMcExercisePluginConfig, ScMcExercisePluginState } from '.';
import { ScMcRendererProps } from './renderer';
declare enum ExerciseState {
    Default = 1,
    SolvedRight = 2,
    SolvedWrong = 3
}
export declare class ScMcRendererInteractive extends React.Component<ScMcRendererInteractiveProps, ScMcRendererState> {
    static defaultProps: {
        getFeedback: () => undefined;
    };
    constructor(props: ScMcRendererInteractiveProps);
    static getDerivedStateFromProps(nextProps: ScMcRendererInteractiveProps, prevState: ScMcRendererState): {};
    static initialStateFromProps(props: ScMcRendererInteractiveProps): {
        buttons: {
            selected: boolean;
            showFeedback: boolean;
        }[];
        globalFeedback: string;
        showGlobalFeedback: boolean;
        solved: boolean;
        exerciseState: ExerciseState;
    };
    render(): JSX.Element;
    private showAnswer;
    private showFeedback;
    private showGlobalFeedback;
    private handleWrongAnswer;
    private submitAnswer;
    private selectButton;
    private getGlobalFeedback;
    private SubmitButton;
}
export type ScMcRendererInteractiveProps = Omit<ScMcRendererProps, 'config'> & {
    config: ScMcExercisePluginConfig;
    getFeedback?: (params: {
        mistakes: number;
        missingSolutions: number;
    }) => string | undefined;
    nextButtonStateAfterSubmit: (params: {
        button: Button;
        answer: StateTypeReturnType<ScMcExercisePluginState>['answers'][0];
        mistakes: number;
        missingSolutions: number;
    }) => Button;
    showFeedback?: boolean;
};
export interface ScMcRendererState {
    buttons: Button[];
    globalFeedback: string;
    showGlobalFeedback: boolean;
    solved: boolean;
    exerciseState: ExerciseState;
}
export interface Button {
    selected: boolean;
    showFeedback: boolean;
}
export {};
