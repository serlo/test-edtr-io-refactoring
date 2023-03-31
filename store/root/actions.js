import { createActionCreator, createActionWithoutPayload } from '../helpers';
/** @public */
export const initRoot = createActionCreator('InitRoot');
/** @internal */
export const pureInitRoot = createActionWithoutPayload('PureInitRoot');
