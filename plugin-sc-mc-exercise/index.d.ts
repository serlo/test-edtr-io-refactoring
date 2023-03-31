import { BooleanStateType, ChildStateType, ChildStateTypeConfig, EditorPlugin, EditorPluginProps, ListStateType, ObjectStateType } from '../plugin';
import { DeepPartial } from '../ui';
/**
 * @param config - {@link ScMcExerciseConfig | Plugin configuration}
 * @public
 */
export declare function createScMcExercisePlugin(config: ScMcExerciseConfig): EditorPlugin<ScMcExercisePluginState, ScMcExerciseConfig>;
/** @public */
export interface ScMcExerciseConfig extends Omit<ScMcExercisePluginConfig, 'i18n'> {
    content: ChildStateTypeConfig;
    feedback: ChildStateTypeConfig;
    i18n?: DeepPartial<ScMcExercisePluginConfig['i18n']>;
}
/** @public */
export type ScMcExercisePluginState = ObjectStateType<{
    isSingleChoice: BooleanStateType;
    answers: ListStateType<ObjectStateType<{
        content: ChildStateType;
        isCorrect: BooleanStateType;
        feedback: ChildStateType;
    }>>;
}>;
/** @public */
export interface ScMcExercisePluginConfig {
    i18n: {
        types: {
            singleChoice: string;
            multipleChoice: string;
        };
        answer: {
            label: string;
            addLabel: string;
            fallbackFeedback: {
                wrong: string;
            };
        };
        feedback: {
            label: string;
        };
        globalFeedback: {
            correct: string;
            missingCorrectAnswers: string;
            wrong: string;
        };
        isSingleChoice: {
            label: string;
        };
    };
}
/** @public */
export type ScMcExerciseProps = EditorPluginProps<ScMcExercisePluginState, ScMcExerciseConfig>;
