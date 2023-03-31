import * as React from 'react';
import { useScMcExerciseConfig } from './config';
import { ScMcRendererInteractive } from './renderer-interactive';
export function ScMcExerciseRenderer(props) {
    const config = useScMcExerciseConfig(props.config);
    return (<ScMcRendererInteractive {...props} config={config} getFeedback={({ mistakes, missingSolutions }) => {
            if (mistakes > 0 && mistakes === missingSolutions) {
                return config.i18n.globalFeedback.missingCorrectAnswers;
            }
            return undefined;
        }} nextButtonStateAfterSubmit={({ button, answer }) => {
            return {
                selected: button.selected && answer.isCorrect.value,
                showFeedback: button.selected,
            };
        }} showFeedback/>);
}
