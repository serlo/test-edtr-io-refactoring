import { child, list, } from '../plugin';
import * as R from 'ramda';
import { RowsEditor } from './editor';
/**
 * @param config - {@link RowsConfig | Plugin configuration}
 * @public
 */
export function createRowsPlugin(config) {
    const { content } = config;
    return {
        Component: RowsEditor,
        config,
        state: list(child(content), 1),
        insertChild(state, { previousSibling, document }) {
            const index = getIndexToInsert();
            if (index === null)
                return;
            state.insert(index, document);
            function getIndexToInsert() {
                if (!previousSibling)
                    return 0;
                const index = R.findIndex((sibling) => sibling.id === previousSibling, state);
                if (index === -1)
                    return null;
                return index + 1;
            }
        },
        removeChild(state, id) {
            const index = R.findIndex((child) => child.id === id, state);
            if (index === -1)
                return;
            state.remove(index);
        },
    };
}
export * from './registry-context';
export * from './store';
