import { PluginProps } from '@edtr-io/internal__plugin-state';
import * as React from 'react';
/**
 * Renders a document inside another document
 *
 * @param props - The {@link SubDocumentProps}
 * @public
 */
export declare const SubDocument: (props: SubDocumentProps) => JSX.Element;
export declare class ErrorBoundary extends React.Component<{
    undo: () => void;
    children: React.ReactNode;
}> {
    static contextType: React.Context<((error: Error, errorInfo: {
        componentStack: string;
    }) => void) | undefined>;
    state: {
        hasError: boolean;
    };
    static getDerivedStateFromError(): {
        hasError: boolean;
    };
    componentDidCatch(error: Error, errorInfo: {
        componentStack: string;
    }): void;
    render(): string | number | boolean | React.ReactFragment | JSX.Element | null | undefined;
}
/** @public */
export interface SubDocumentProps {
    id: string;
    pluginProps?: PluginProps;
}
