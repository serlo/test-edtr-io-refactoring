import { ActionCreatorAction, ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '../types';
/** @public */
export declare const blur: ActionCreatorWithoutPayload<'Blur'>;
/** @public */
export type BlurAction = ActionCreatorAction<typeof blur>;
/** @public */
export declare const focus: ActionCreatorWithPayload<'Focus', string>;
/** @public */
export type FocusDocumentAction = ActionCreatorAction<typeof focus>;
/** @public */
export declare const focusNext: ActionCreatorWithoutPayload<'FocusNext'>;
/** @public */
export type FocusNextDocumentAction = ActionCreatorAction<typeof focusNext>;
/** @public */
export declare const focusPrevious: ActionCreatorWithoutPayload<'FocusPrevious'>;
/** @public */
export type FocusPreviousDocumentAction = ActionCreatorAction<typeof focusPrevious>;
/** @public */
export type FocusAction = BlurAction | FocusDocumentAction | FocusNextDocumentAction | FocusPreviousDocumentAction;
