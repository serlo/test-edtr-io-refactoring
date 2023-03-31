import * as React from 'react';
/**
 * @param props - The props
 * @internal
 */
export declare function Feedback(props: FeedbackProps): JSX.Element;
/** @internal */
export interface FeedbackProps {
    children?: React.ReactNode;
    boxFree?: boolean;
    isTrueAnswer?: boolean;
    showOnLeft?: boolean;
}
