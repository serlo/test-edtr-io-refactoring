import { createActionCreator, createActionWithoutPayload } from '../helpers';
/** @public */
export const blur = createActionWithoutPayload('Blur');
/** @public */
export const focus = createActionCreator('Focus');
/** @public */
export const focusNext = createActionWithoutPayload('FocusNext');
/** @public */
export const focusPrevious = createActionWithoutPayload('FocusPrevious');
