import { boolean, child, list, object, } from '../plugin';
import { ScMcExerciseEditor } from './editor';
/**
 * @param config - {@link ScMcExerciseConfig | Plugin configuration}
 * @public
 */
export function createScMcExercisePlugin(config) {
    const { content, feedback } = config;
    return {
        Component: ScMcExerciseEditor,
        config,
        state: createState(),
    };
    function createState() {
        const answerState = object({
            content: child(content),
            isCorrect: boolean(false),
            feedback: child(feedback),
        });
        return object({
            isSingleChoice: boolean(false),
            answers: list(answerState),
        });
    }
}
