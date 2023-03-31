import { createActionCreator } from './helpers';
/** @public */
export const setPartialState = createActionCreator('SetPartialState');
/** @internal */
export const applyActions = createActionCreator('ApplyActions');
