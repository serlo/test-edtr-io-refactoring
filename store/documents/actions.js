import { createActionCreator } from '../helpers';
/** @public */
export const insert = createActionCreator('Insert');
/** @internal */
export const pureInsert = createActionCreator('PureInsert');
/** @public */
export const remove = createActionCreator('Remove');
/** @internal */
export const pureRemove = createActionCreator('PureRemove');
/** @public */
export const change = createActionCreator('Change');
/** @internal */
export const pureChange = createActionCreator('PureChange');
/** @public */
export const wrap = createActionCreator('Wrap');
/** @internal */
export const pureWrap = createActionCreator('PureWrap');
/** @public */
export const unwrap = createActionCreator('Unwrap');
/** @internal */
export const pureUnwrap = createActionCreator('PureUnwrap');
/** @public */
export const replace = createActionCreator('Replace');
/** @internal */
export const pureReplace = createActionCreator('PureReplace');
/** @public */
export const replaceText = createActionCreator('ReplaceText');
/** @internal */
export const pureReplaceText = createActionCreator('PureReplaceText');
