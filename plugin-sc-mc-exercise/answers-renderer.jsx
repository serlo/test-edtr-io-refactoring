import { styled } from '../renderer-ui';
import * as R from 'ramda';
import * as React from 'react';
import { FetchDimensions } from './fetch-dimensions';
import { calculateLayoutOptions } from './helpers';
var Phase;
(function (Phase) {
    Phase[Phase["noJS"] = 0] = "noJS";
    Phase[Phase["optionTesting"] = 1] = "optionTesting";
    Phase[Phase["finished"] = 2] = "finished";
})(Phase || (Phase = {}));
export class ScMcAnswersRenderer extends React.Component {
    state = {
        phase: Phase.noJS,
        remainingOptions: calculateLayoutOptions(this.props.state.answers.length),
        lastOption: [this.props.state.answers.length, 1],
    };
    render() {
        if (this.state.remainingOptions.length === 0)
            return null;
        const currentOption = this.state.remainingOptions[0];
        return (<React.Fragment>
        {this.state.phase < Phase.finished
                ? this.renderOption(this.state.lastOption)
                : this.renderOption(currentOption)}
        {this.state.phase === Phase.optionTesting
                ? this.tryOption(currentOption)
                : null}
      </React.Fragment>);
    }
    tryOption(option) {
        return (<FetchDimensions key={option.toString()} length={this.props.state.answers.length + 1} onDone={({ widths, scrollWidths, heights }) => {
                const adequateRatio = heights.every((height, index) => {
                    return 1.5 * height <= widths[index];
                });
                const [containerWidth, ...boxWidths] = widths;
                const equalWidths = boxWidths.every((width) => {
                    return width === boxWidths[0];
                });
                if (containerWidth + 1 >= scrollWidths[0] &&
                    equalWidths &&
                    adequateRatio) {
                    this.setState({ phase: Phase.finished, lastOption: option });
                }
                else {
                    this.setState((state) => {
                        const newOptions = state.remainingOptions.slice(1);
                        if (newOptions.length > 0) {
                            return { phase: state.phase, remainingOptions: newOptions };
                        }
                        else {
                            return {
                                remainingOptions: state.remainingOptions,
                                phase: Phase.finished,
                            };
                        }
                    });
                }
            }} render={(createRef) => {
                return (<div style={{ visibility: 'hidden' }} ref={createRef(0)}>
              {this.renderOption(option, createRef)}
            </div>);
            }}/>);
    }
    renderOption([_rows, columns], createRef = () => () => { }) {
        const rows = R.splitEvery(columns, this.props.state.answers);
        return rows.map((answers, rowIndex) => {
            return (<this.Row key={rowIndex}>
          {answers.map((answer, columnIndex) => {
                    return (<this.Column key={columnIndex} ref={createRef(rowIndex * answers.length + columnIndex + 1)}>
                {this.props.showAnswer(answer, rowIndex * answers.length + columnIndex, answers.length > 1)}
              </this.Column>);
                })}
        </this.Row>);
        });
    }
    calculateLayout() {
        this.setState({
            phase: Phase.optionTesting,
            remainingOptions: calculateLayoutOptions(this.props.state.answers.length),
        });
    }
    onResize = () => {
        this.calculateLayout();
    };
    componentDidMount() {
        this.calculateLayout();
        window.addEventListener('resize', this.onResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }
    Row = styled.div({ display: 'flex' });
    // TODO: internal renderer sets margin to 15px -> see Row Class
    Column = styled.div({
        flexGrow: 1,
        flexBasis: 0,
        flexShrink: 1,
        margin: '0 15px',
    });
}
