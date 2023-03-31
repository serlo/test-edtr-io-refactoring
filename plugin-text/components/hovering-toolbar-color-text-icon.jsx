import { edtrColorText, EdtrIcon, styled } from '../../ui';
import React from 'react';
const ColoredText = styled.span({
    position: 'relative',
    verticalAlign: 'middle',
    display: 'inline-block',
});
const FlexContainer = styled.span({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
});
const Line = styled.span(({ index, colorsTheme }) => ({
    border: `2px solid ${index === undefined
        ? colorsTheme.defaultColor
        : colorsTheme.colors[index % colorsTheme.colors.length]}`,
    borderRadius: '4px',
    bottom: '0',
    width: '80%',
    position: 'absolute',
}));
export const HoveringToolbarColorTextIcon = ({ index, colorsTheme, }) => (<ColoredText>
    <FlexContainer>
      <EdtrIcon icon={edtrColorText}/>
      <Line colorsTheme={colorsTheme} index={index}/>
    </FlexContainer>
  </ColoredText>);
