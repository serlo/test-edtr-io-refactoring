import { serializeDocument } from '../documents/reducer';
import { createSelector, createSubReducer } from '../helpers';
import { pureInitRoot } from './actions';
/** @internal */
export const rootReducer = createSubReducer('root', null, {
    [pureInitRoot.type](_rootState, _action) {
        return 'root';
    },
});
/** @public */
export const getRoot = createSelector((state) => state.root);
/** @public */
export const serializeRootDocument = createSelector((state) => {
    const root = getRoot()(state);
    if (!root)
        return null;
    return serializeDocument(root)(state);
});
