import { Provider, ScopeContext, SubDocument } from '../core';
import { invariant } from '../internal__dev-expression';
import { RootThemeProvider } from '../ui';
import * as React from 'react';
import { createStore } from 'redux';
/**
 * @param props - The props
 * @public
 */
export function Renderer(props) {
    const { theme = {}, ...rest } = props;
    const store = React.useMemo(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return createStore((state) => {
            if (!state) {
                return {
                    main: {
                        plugins: rest.plugins,
                        documents: getDocuments(),
                        focus: null,
                        root: 'root',
                        clipboard: [],
                        history: {
                            undoStack: [],
                            redoStack: [],
                            pendingChanges: 0,
                        },
                    },
                };
            }
            return state;
        });
        function getDocuments() {
            const documents = {};
            const pendingDocs = [
                {
                    id: 'root',
                    ...(rest.state || {}),
                },
            ];
            const helpers = {
                createDocument(doc) {
                    pendingDocs.push(doc);
                },
            };
            for (let doc; (doc = pendingDocs.pop());) {
                const plugin = rest.plugins[doc.plugin];
                if (!plugin) {
                    invariant(false, `Invalid plugin '${doc.plugin}'`);
                    continue;
                }
                let state;
                if (doc.state === undefined) {
                    state = plugin.state.createInitialState(helpers);
                }
                else {
                    state = plugin.state.deserialize(doc.state, helpers);
                }
                documents[doc.id] = {
                    plugin: doc.plugin,
                    state,
                };
            }
            return documents;
        }
    }, [rest.state, rest.plugins]);
    return (<Provider store={store}>
      <RootThemeProvider theme={theme}>
        <ScopeContext.Provider value={{ scope: 'main' }}>
          <SubDocument id="root"/>
        </ScopeContext.Provider>
      </RootThemeProvider>
    </Provider>);
}
