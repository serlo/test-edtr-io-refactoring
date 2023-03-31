import { Feedback, styled, SubmitButton } from '../renderer-ui';
import * as R from 'ramda';
import * as React from 'react';
import { ScMcAnswersRenderer } from './answers-renderer';
import { ScMcExerciseChoiceRenderer } from './choice-renderer';
var ExerciseState;
(function (ExerciseState) {
    ExerciseState[ExerciseState["Default"] = 1] = "Default";
    ExerciseState[ExerciseState["SolvedRight"] = 2] = "SolvedRight";
    ExerciseState[ExerciseState["SolvedWrong"] = 3] = "SolvedWrong";
})(ExerciseState || (ExerciseState = {}));
class ScMcRendererInteractive extends React.Component {
    static defaultProps = {
        getFeedback: () => undefined,
    };
    constructor(props) {
        super(props);
        this.state = ScMcRendererInteractive.initialStateFromProps(props);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.state.answers.length !== prevState.buttons.length) {
            return ScMcRendererInteractive.initialStateFromProps(nextProps);
        }
        return {};
    }
    static initialStateFromProps(props) {
        return {
            buttons: props.state.answers.map(() => {
                return {
                    selected: false,
                    showFeedback: false,
                };
            }),
            globalFeedback: '',
            showGlobalFeedback: false,
            solved: false,
            exerciseState: ExerciseState.Default,
        };
    }
    render() {
        return (<React.Fragment>
        <ScMcAnswersRenderer {...this.props} showAnswer={this.showAnswer}/>
        {this.showGlobalFeedback()}
        <SubmitButton exerciseState={this.state.exerciseState} onClick={this.submitAnswer}/>
        <div style={{ clear: 'both' }}/>
      </React.Fragment>);
    }
    showAnswer = (answer, index, centered) => {
        const button = this.state.buttons[index];
        return (<React.Fragment key={index}>
        <ScMcExerciseChoiceRenderer index={index} onClick={this.selectButton(index)} {...this.props} // showFeedback: true
         {...button} // showFeedback: false
         centered={centered}>
          {answer.content.render()}
        </ScMcExerciseChoiceRenderer>
        {this.props.showFeedback ? this.showFeedback({ button, answer }) : null}
      </React.Fragment>);
    };
    showFeedback({ answer, button, }) {
        if (!button.showFeedback) {
            return null;
        }
        if (!this.props.isEmpty(answer.feedback.id)) {
            return (<Feedback boxFree showOnLeft isTrueAnswer={answer.isCorrect.value}>
          {answer.feedback.render()}
        </Feedback>);
        }
        return (<Feedback boxFree showOnLeft isTrueAnswer={answer.isCorrect.value}>
        {answer.isCorrect.value
                ? ''
                : this.props.config.i18n.answer.fallbackFeedback.wrong}
      </Feedback>);
    }
    showGlobalFeedback() {
        const { showGlobalFeedback, globalFeedback, solved } = this.state;
        if (showGlobalFeedback) {
            return (<Feedback boxFree isTrueAnswer={solved}>
          {globalFeedback}
        </Feedback>);
        }
        return null;
    }
    handleWrongAnswer = () => {
        setTimeout(() => this.setState({ exerciseState: ExerciseState.Default }), 3000);
        return ExerciseState.SolvedWrong;
    };
    submitAnswer = () => {
        const { buttons } = this.state;
        const temp = R.zip(buttons, this.props.state.answers);
        const mistakes = R.reduce((acc, [button, answer]) => {
            return acc + (answer.isCorrect.value !== button.selected ? 1 : 0);
        }, 0, temp);
        const missingSolutions = R.reduce((acc, [button, answer]) => {
            return acc + (answer.isCorrect.value && !button.selected ? 1 : 0);
        }, 0, temp);
        const nextButtonStates = buttons.map((button, i) => {
            return this.props.nextButtonStateAfterSubmit({
                button,
                answer: this.props.state.answers[i],
                mistakes,
                missingSolutions,
            });
        });
        this.setState({
            showGlobalFeedback: true,
            buttons: nextButtonStates,
            solved: mistakes === 0,
            globalFeedback: this.getGlobalFeedback({ mistakes, missingSolutions }),
            exerciseState: mistakes === 0 ? ExerciseState.SolvedRight : this.handleWrongAnswer(),
        });
    };
    selectButton = (selectedIndex) => () => {
        const { buttons } = this.state;
        if (this.props.state.isSingleChoice.value) {
            this.setState({
                buttons: buttons.map((button, index) => {
                    return R.assoc('selected', index === selectedIndex, button);
                }),
            });
        }
        else {
            this.setState({
                buttons: R.adjust(selectedIndex, (button) => R.assoc('selected', !button.selected, button), buttons),
                globalFeedback: '',
            });
        }
    };
    getGlobalFeedback({ mistakes, missingSolutions, }) {
        const { getFeedback } = this.props;
        const feedback = typeof getFeedback === 'function' &&
            getFeedback({
                mistakes,
                missingSolutions,
            });
        if (feedback) {
            return feedback;
        }
        if (mistakes === 0) {
            return this.props.config.i18n.globalFeedback.correct;
        }
        else {
            return this.props.config.i18n.globalFeedback.wrong;
        }
    }
    SubmitButton = styled.button({ float: 'right', margin: '10px 0px' });
}
export { ScMcRendererInteractive };
