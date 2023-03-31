import { string, } from '../plugin';
import { TableEditor } from './editor';
/**
 * @param config - {@link TableConfig | Plugin configuration}
 * @public
 */
export function createTablePlugin(config = {}) {
    return {
        Component: TableEditor,
        config,
        state: string(),
    };
}
