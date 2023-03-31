import { createSelector, createSubReducer } from '../helpers';
/** @internal */
export const pluginsReducer = createSubReducer('plugins', {}, {});
/** @public */
export const getPlugins = createSelector((state) => state.plugins);
/** @public */
export const getPlugin = createSelector((state, type) => {
    const plugins = getPlugins()(state);
    return plugins[type] || null;
});
