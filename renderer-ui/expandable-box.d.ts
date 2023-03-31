import * as React from 'react';
/**
 * @param props - The props
 * @public
 */
export declare function ExpandableBox(props: ExpandableBoxProps): JSX.Element;
/** @public */
export interface ExpandableBoxProps {
    children?: React.ReactNode;
    editable?: boolean;
    alwaysVisible?: boolean;
    renderTitle: (collapsed: boolean) => React.ReactNode;
}
