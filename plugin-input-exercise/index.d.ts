import { BooleanStateType, ChildStateType, ChildStateTypeConfig, EditorPlugin, EditorPluginProps, ListStateType, ObjectStateType, StringStateType } from '../plugin';
import { DeepPartial } from '../ui';
import { InputExerciseType } from './input-exercise-type';
/**
 * @param config - {@link InputExerciseConfig | Plugin configuration}
  @public */
export declare function createInputExercisePlugin(config: InputExerciseConfig): EditorPlugin<InputExercisePluginState, InputExerciseConfig>;
/** @public */
export interface InputExerciseConfig {
    feedback: ChildStateTypeConfig;
    i18n?: DeepPartial<InputExercisePluginConfig['i18n']>;
    theme?: Partial<InputExercisePluginConfig['theme']>;
}
/** @public */
export type InputExercisePluginState = ObjectStateType<{
    type: StringStateType;
    unit: StringStateType;
    answers: ListStateType<ObjectStateType<{
        value: StringStateType;
        isCorrect: BooleanStateType;
        feedback: ChildStateType;
    }>>;
}>;
/** @public */
export interface InputExercisePluginConfig {
    i18n: {
        types: Record<InputExerciseType, string>;
        type: {
            label: string;
        };
        unit: {
            label: string;
        };
        answer: {
            label: string;
            addLabel: string;
            value: {
                placeholder: string;
            };
        };
        feedback: {
            label: string;
        };
        inputPlaceholder: string;
        fallbackFeedback: {
            correct: string;
            wrong: string;
        };
    };
    theme: {
        borderColor: string;
        borderStyle: string;
    };
}
export { InputExerciseType };
/** @public */
export type InputExerciseProps = EditorPluginProps<InputExercisePluginState, InputExerciseConfig>;
