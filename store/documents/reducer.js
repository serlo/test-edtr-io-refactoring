import * as R from 'ramda';
import { createDeepEqualSelector, createSelector, createSubReducer, } from '../helpers';
import { getPlugin } from '../plugins/reducer';
import { pureInsert, pureChange, pureRemove, pureWrap, pureUnwrap, pureReplace, pureReplaceText, } from './actions';
/** @internal */
export const documentsReducer = createSubReducer('documents', {}, {
    [pureInsert.type](documentState, action, state) {
        const { id, plugin: type, state: pluginState } = action.payload;
        const plugin = getPlugin(type)(state);
        if (!plugin)
            return documentState;
        return {
            ...documentState,
            [id]: {
                plugin: type,
                state: pluginState,
            },
        };
    },
    [pureRemove.type](documentState, action) {
        return R.omit([action.payload], documentState);
    },
    [pureChange.type](documentState, action) {
        const { id, state: pluginState } = action.payload;
        if (!documentState[id])
            return documentState;
        return {
            ...documentState,
            [id]: {
                ...documentState[id],
                state: pluginState,
            },
        };
    },
    [pureWrap.type](documentState, action, state) {
        const { id, newId, document } = action.payload;
        if (!documentState[id])
            return documentState;
        const plugin = getPlugin(document.plugin)(state);
        if (!plugin)
            return documentState;
        return {
            ...documentState,
            [newId]: documentState[id],
            [id]: document,
        };
    },
    [pureUnwrap.type](documentState, action) {
        const { id, oldId } = action.payload;
        if (!documentState[oldId])
            return documentState;
        return R.dissoc(oldId, {
            ...documentState,
            [id]: documentState[oldId],
        });
    },
    [pureReplace.type](documentState, action, state) {
        const { id, plugin: type, state: pluginState } = action.payload;
        const plugin = getPlugin(type)(state);
        if (!plugin)
            return documentState;
        return {
            ...documentState,
            [id]: {
                plugin: type,
                state: pluginState,
            },
        };
    },
    [pureReplaceText.type](documentState, action) {
        const { id, newId, document } = action.payload;
        if (!documentState[id])
            return documentState;
        return {
            ...documentState,
            [newId]: documentState[id],
            [id]: document,
        };
    },
});
/** @public */
export const getDocuments = createSelector((state) => state.documents);
/** @public */
export const getDocument = createSelector((state, id) => {
    if (!id)
        return null;
    return getDocuments()(state)[id] || null;
});
/**
 * Serializes the document with the given `id`
 *
 * @param id - The id of the document
 * @returns The serialization
 * @public
 */
export const serializeDocument = createDeepEqualSelector((state, id) => {
    const doc = getDocument(id)(state);
    if (!doc)
        return null;
    const plugin = getPlugin(doc.plugin)(state);
    if (!plugin)
        return null;
    const serializeHelpers = {
        getDocument: (id) => serializeDocument(id)(state),
    };
    return {
        plugin: doc.plugin,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        state: plugin.state.serialize(doc.state, serializeHelpers),
    };
});
/** @public */
export const isEmpty = createSelector((state, id) => {
    const doc = getDocument(id)(state);
    if (!doc)
        return false;
    const plugin = getPlugin(doc.plugin)(state);
    return isDocumentEmpty(doc, plugin);
});
/**
 * Checks whether the given document is empty
 *
 * @param doc - The document
 * @param plugin - The plugin
 * @returns `True` if the specified document is empty
 * @public
 */
export function isDocumentEmpty(doc, plugin) {
    if (!doc || !plugin)
        return false;
    if (typeof plugin.isEmpty === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const state = plugin.state.init(doc.state, () => { });
        return plugin.isEmpty(state);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const initialState = plugin.state.createInitialState({
        createDocument: () => { },
    });
    return R.equals(doc.state, initialState);
}
