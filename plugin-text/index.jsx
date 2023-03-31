import { serializedScalar } from '../plugin';
import { Node } from 'slate';
import { TextEditor } from './components/text-editor';
import { emptyDocumentFactory } from './utils/document';
/**
 * @param config - {@link TextEditorConfig | Plugin configuration}
 * @returns The text plugin
 * @public
 */
const createTextPlugin = (config) => ({
    Component: TextEditor,
    config,
    state: serializedScalar(emptyDocumentFactory(), {
        serialize({ value }) {
            return value;
        },
        deserialize(value) {
            return { value, selection: null };
        },
    }),
    onKeyDown() {
        return false;
    },
    isEmpty: (state) => {
        return state.value.value.map(Node.string).join('') === '';
    },
});
export { createTextPlugin };
