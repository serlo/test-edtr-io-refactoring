import { createActionCreator } from '../helpers';
/** @public */
export const insertChildBefore = createActionCreator('InsertChildBefore');
/** @public */
export const insertChildAfter = createActionCreator('InsertChildAfter');
/** @public */
export const removeChild = createActionCreator('RemoveChild');
