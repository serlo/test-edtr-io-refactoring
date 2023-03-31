import * as React from 'react';
import { ScMcExercisePluginConfig, ScMcExerciseProps } from '.';
export declare class ScMcExerciseChoiceRenderer extends React.Component<Omit<ScMcExerciseProps, 'config'> & ChoiceRendererProps> {
    render(): JSX.Element;
    private Container;
}
export interface ChoiceRendererProps {
    config: ScMcExercisePluginConfig;
    children: React.ReactNode;
    index: number;
    onClick?: (event: React.MouseEvent<Element>) => void;
    showFeedback?: boolean;
    centered?: boolean;
    selected?: boolean;
}
