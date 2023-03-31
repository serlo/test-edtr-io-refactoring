import { StateTypeReturnType } from '../plugin';
import * as React from 'react';
import { ScMcExerciseProps, ScMcExercisePluginState, ScMcExercisePluginConfig } from '.';
declare enum Phase {
    noJS = 0,
    optionTesting = 1,
    finished = 2
}
export declare class ScMcAnswersRenderer extends React.Component<Omit<ScMcExerciseProps, 'config'> & {
    config: ScMcExercisePluginConfig;
    showAnswer: (answer: StateTypeReturnType<ScMcExercisePluginState>['answers'][0], index: number, centered: boolean) => React.ReactNode;
}, ScMcAnswersRendererState> {
    state: {
        phase: Phase;
        remainingOptions: [number, number][];
        lastOption: [number, number];
    };
    render(): JSX.Element | null;
    private tryOption;
    private renderOption;
    private calculateLayout;
    private onResize;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private Row;
    private Column;
}
interface ScMcAnswersRendererState {
    phase: Phase;
    remainingOptions: [number, number][];
    lastOption: [number, number];
}
export {};
