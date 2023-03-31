import { DocumentEditorProps } from '@edtr-io/document-editor';
import { DeepPartial } from '@edtr-io/ui';
import * as React from 'react';
/**
 * Creates the default {@link @edtr-io/document-editor#DocumentEditorProps | document editor}
 *
 * @param config - Configuration
 * @returns The default {@link @edtr-io/document-editor#DocumentEditorProps | document editor}
 * @beta
 */
export declare function createDefaultDocumentEditor(config?: DefaultDocumentEditorConfig): React.ComponentType<DocumentEditorProps>;
/** @beta */
export interface DefaultDocumentEditorConfig {
    i18n?: DeepPartial<DefaultDocumentEditorI18n>;
}
/** @beta */
export interface DefaultDocumentEditorI18n {
    settings: {
        buttonLabel: string;
        modalTitle: string;
        modalCloseLabel: string;
    };
}
