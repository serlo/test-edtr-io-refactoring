import { EditorBottomToolbar, styled } from '../../editor-ui';
export const TimeoutBottomToolbarWrapper = styled(EditorBottomToolbar)((props) => {
    const touchStyles = props.isTouch
        ? { bottom: 'unset', top: 0, transform: 'translate(-50%, 50%)' }
        : {};
    return {
        opacity: props.visible ? 1 : 0,
        transition: '500ms opacity ease-in-out',
        ...touchStyles,
    };
});
