import { CheckElement } from '../editor-ui';
import { styled } from '../ui';
import * as React from 'react';
const CheckboxContainer = styled.div({
    //width: '5%',
    textAlign: 'center',
    marginRight: '10px',
    marginBottom: '5px',
    fontWeight: 'bold',
});
export class ScMcExerciseChoiceRenderer extends React.Component {
    render() {
        const { state, children, index, onClick, showFeedback, selected } = this.props;
        return (<div style={{ display: 'flex' }}>
        <CheckboxContainer>
          <CheckElement isRadio={state.isSingleChoice.value} isActive={selected || false} handleChange={onClick ? onClick : () => { }}/>
        </CheckboxContainer>
        <this.Container isCorrect={state.answers[index].isCorrect.value} showFeedback={showFeedback || false}>
          {children}
        </this.Container>
      </div>);
    }
    Container = styled.div((props) => {
        return {
            paddingLeft: '20 px',
            color: props.showFeedback
                ? props.isCorrect
                    ? '#95bc1a'
                    : '#f7b07c'
                : 'black',
        };
    });
}
