import { styled, Icon, faSmile, faCheckCircle, useRendererUiTheme, } from '../ui';
import * as React from 'react';
/** @internal */
export var ExerciseState;
(function (ExerciseState) {
    ExerciseState[ExerciseState["Default"] = 1] = "Default";
    ExerciseState[ExerciseState["SolvedRight"] = 2] = "SolvedRight";
    ExerciseState[ExerciseState["SolvedWrong"] = 3] = "SolvedWrong";
})(ExerciseState || (ExerciseState = {}));
function useSubmitButtonTheme() {
    return useRendererUiTheme('submitButton', (theme) => {
        return {
            backgroundColor: '#337ab7',
            hoverBackgroundColor: '#d9edf7',
            color: theme.backgroundColor,
            correctBackgroundColor: theme.success.background,
            wrongBackgroundColor: theme.danger.background,
        };
    });
}
const getBackgroundColor = (theme, exerciseState) => {
    switch (exerciseState) {
        case ExerciseState.Default: {
            return theme.backgroundColor;
        }
        case ExerciseState.SolvedRight: {
            return theme.correctBackgroundColor;
        }
        case ExerciseState.SolvedWrong: {
            return theme.wrongBackgroundColor;
        }
    }
};
const SubmitButtonComponent = styled.button(({ exerciseState }) => {
    const theme = useSubmitButtonTheme();
    return {
        float: 'right',
        margin: '10px 0px',
        border: 'none',
        padding: '3px',
        backgroundColor: getBackgroundColor(theme, exerciseState),
        color: theme.color,
        transition: 'background-color .5s ease',
        outline: 'none',
        '&hover': {
            backgroundColor: theme.hoverBackgroundColor,
        },
    };
});
/** @internal */
export class SubmitButton extends React.Component {
    render() {
        return (<SubmitButtonComponent exerciseState={this.props.exerciseState} onClick={this.props.onClick}>
        {this.props.exerciseState === ExerciseState.SolvedRight ? (<span>
            <Icon icon={faSmile}/>
            Stimmt!
          </span>) : (<span>
            <Icon icon={faCheckCircle}/>
            Stimmt’s?
          </span>)}
      </SubmitButtonComponent>);
    }
}
