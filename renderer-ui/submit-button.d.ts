import * as React from 'react';
/** @internal */
export declare enum ExerciseState {
    Default = 1,
    SolvedRight = 2,
    SolvedWrong = 3
}
/** @internal */
export declare class SubmitButton extends React.Component<{
    exerciseState: ExerciseState;
    onClick?: () => void;
}> {
    render(): JSX.Element;
}
