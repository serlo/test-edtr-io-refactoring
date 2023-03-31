import { createActionCreator, createActionWithoutPayload } from '../helpers';
/** @public */
export const persist = createActionWithoutPayload('Persist');
/** @public */
export const reset = createActionWithoutPayload('Reset');
/** @internal */
export const pureReset = createActionWithoutPayload('PureReset');
/** @internal */
export const commit = createActionCreator('Commit');
/** @internal */
export const pureCommit = createActionCreator('PureCommit');
/** @internal */
export const temporaryCommit = createActionCreator('TemporaryCommit');
/** @public */
export const undo = createActionWithoutPayload('Undo');
/** @internal */
export const pureUndo = createActionWithoutPayload('PureUndo');
/** @public */
export const redo = createActionWithoutPayload('Redo');
/** @internal */
export const pureRedo = createActionWithoutPayload('PureRedo');
