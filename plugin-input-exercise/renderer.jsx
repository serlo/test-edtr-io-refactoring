import { useScopedStore } from '../core';
import { styled } from '../editor-ui';
import { Feedback, SubmitButton } from '../renderer-ui';
import { isEmpty } from '../store';
import A from 'algebra.js';
import * as React from 'react';
import { InputExerciseType, } from '.';
import { useInputExerciseConfig } from './config';
var ExerciseState;
(function (ExerciseState) {
    ExerciseState[ExerciseState["Default"] = 1] = "Default";
    ExerciseState[ExerciseState["SolvedRight"] = 2] = "SolvedRight";
    ExerciseState[ExerciseState["SolvedWrong"] = 3] = "SolvedWrong";
})(ExerciseState || (ExerciseState = {}));
const InputContainer = styled.div({
    float: 'right',
    display: 'flex',
    flexDirection: 'row',
});
const InputExerciseField = styled.input(({ config }) => {
    const { theme } = config;
    return {
        border: 'none',
        borderBottom: `${theme.borderStyle} ${theme.borderColor}`,
        textAlign: 'center',
        outline: 'none',
        marginBottom: '10px',
    };
});
export function InputExerciseRenderer(props) {
    const { state } = props;
    const config = useInputExerciseConfig(props.config);
    const { i18n } = config;
    const store = useScopedStore();
    const [feedbackIndex, setFeedbackIndex] = React.useState(-1);
    const [feedbackVisible, setFeedbackVisible] = React.useState();
    const [exerciseState, setExerciseState] = React.useState(ExerciseState.Default);
    const input = React.createRef();
    const handleWrongAnswer = () => {
        setTimeout(() => {
            setExerciseState(ExerciseState.Default);
        }, 2000);
        setExerciseState(ExerciseState.SolvedWrong);
    };
    function checkAnswer(event) {
        if (!input.current) {
            return;
        }
        event.preventDefault();
        setFeedbackIndex(-1);
        setFeedbackVisible(true);
        setExerciseState(ExerciseState.Default);
        if (input.current.value === '') {
            setFeedbackVisible(false);
            return;
        }
        const { state } = props;
        let containedAnswer = false;
        state.answers.forEach((answer, index) => {
            if (input.current &&
                matchesInput({
                    type: state.type.value,
                    value: answer.value.value,
                }, input.current.value)) {
                setFeedbackIndex(index);
                if (answer.isCorrect.value) {
                    setExerciseState(ExerciseState.SolvedRight);
                }
                else {
                    handleWrongAnswer();
                }
                containedAnswer = true;
            }
        });
        if (!containedAnswer) {
            handleWrongAnswer();
        }
    }
    return (<div>
      <form onSubmit={checkAnswer}>
        <InputContainer>
          <InputExerciseField config={config} onKeyDown={(k) => {
            const { key } = k;
            if ((key === 'Enter' || key === 'Backspace') && props.editable) {
                k.stopPropagation();
            }
        }} data-type={state.type.value} type="text" placeholder={i18n.inputPlaceholder} ref={input}/>
          {state.unit.value}
        </InputContainer>
        <div style={{
            clear: 'both',
        }}/>

        {feedbackVisible ? (feedbackIndex > -1 ? (<Feedback boxFree isTrueAnswer={state.answers[feedbackIndex].isCorrect.value}>
              {isEmpty(state.answers[feedbackIndex].feedback.id)(store.getState())
                ? state.answers[feedbackIndex].isCorrect.value
                    ? i18n.fallbackFeedback.correct
                    : i18n.fallbackFeedback.wrong
                : state.answers[feedbackIndex].feedback.render()}
            </Feedback>) : (<Feedback boxFree>{i18n.fallbackFeedback.wrong}</Feedback>)) : null}
        <div>
          <SubmitButton exerciseState={exerciseState}/>
          <div style={{ clear: 'both' }}/>
        </div>
      </form>
    </div>);
}
function normalize(type, text) {
    const temp = collapseWhitespace(text);
    switch (type) {
        case InputExerciseType.InputNumberExactMatchChallenge:
            return normalizeNumber(temp).replace(/\s/g, '');
        case InputExerciseType.InputExpressionEqualMatchChallenge:
            return A.parse(normalizeNumber(temp));
        case InputExerciseType.InputStringNormalizedMatchChallenge:
            return temp.toUpperCase();
    }
}
function matchesInput(field, input) {
    try {
        const solution = normalize(field.type, field.value);
        const submission = normalize(field.type, input);
        switch (field.type) {
            case InputExerciseType.InputExpressionEqualMatchChallenge:
                return (solution
                    .subtract(submission)
                    .toString() === '0');
            case InputExerciseType.InputNumberExactMatchChallenge:
            case InputExerciseType.InputStringNormalizedMatchChallenge:
                return solution === submission;
        }
    }
    catch (err) {
        // e.g. if user input could not be parsed
        return false;
    }
}
function normalizeNumber(numberText) {
    return numberText.replace(/,/g, '.').replace(/^[+]/, '');
}
function collapseWhitespace(text) {
    return text.replace(/[\s\xa0]+/g, ' ').trim();
}
