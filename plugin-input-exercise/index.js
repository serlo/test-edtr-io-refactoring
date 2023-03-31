import { boolean, child, list, object, string, } from '../plugin';
import { InputExerciseEditor } from './editor';
import { InputExerciseType } from './input-exercise-type';
/**
 * @param config - {@link InputExerciseConfig | Plugin configuration}
  @public */
export function createInputExercisePlugin(config) {
    const { feedback } = config;
    return {
        Component: InputExerciseEditor,
        config,
        state: createState(),
    };
    function createState() {
        const answerObject = object({
            value: string(''),
            isCorrect: boolean(),
            feedback: child(feedback),
        });
        return object({
            type: string('input-string-normalized-match-challenge'),
            unit: string(''),
            answers: list(answerObject),
        });
    }
}
export { InputExerciseType };
