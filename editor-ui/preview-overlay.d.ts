import * as React from 'react';
/**
 * @param props - Props
 * @internal
 */
export declare function PreviewOverlay(props: PreviewOverlayProps): JSX.Element;
/** @internal */
export interface PreviewOverlayProps {
    children: React.ReactNode;
    focused: boolean;
    editable?: boolean;
    onChange?: (active: boolean) => void;
}
