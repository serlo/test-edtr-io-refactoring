/// <reference types="react" />
import { ScMcExerciseProps } from '.';
export declare function ScMcExerciseRenderer(props: ScMcRendererProps): JSX.Element;
export type ScMcRendererProps = ScMcExerciseProps & {
    isEmpty: (id: string) => boolean;
};
