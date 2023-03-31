import { ActionCreatorAction, ActionCreatorWithPayload, DocumentState } from '../types';
/** @beta */
export declare const copy: ActionCreatorWithPayload<'Copy', string | null>;
/** @public */
export interface CopyAction {
    type: 'Copy';
    payload: string | null;
    scope: string;
}
/** @internal */
export declare const pureCopy: ActionCreatorWithPayload<'PureCopy', DocumentState>;
/** @internal */
export type PureCopyAction = ActionCreatorAction<typeof pureCopy>;
/** @public */
export type ClipboardAction = CopyAction;
/** @internal */
export type InternalClipboardAction = PureCopyAction;
