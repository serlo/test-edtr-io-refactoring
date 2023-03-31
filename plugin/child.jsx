import { SubDocument } from '../core';
import * as R from 'ramda';
import * as React from 'react';
import { generate } from 'shortid';
/**
 * @param params - The params
 * @public
 */
export function child(params) {
    const { plugin, initialState, config } = params;
    return {
        init(id, onChange) {
            return {
                get() {
                    return id;
                },
                id,
                render: function Child(props = {}) {
                    const pluginProps = {
                        ...props,
                        config: R.mergeDeepRight(config || {}, props.config || {}),
                    };
                    return <SubDocument key={id} pluginProps={pluginProps} id={id}/>;
                },
                replace: (plugin, state) => {
                    onChange((_id, helpers) => {
                        helpers.createDocument({ id, plugin, state });
                        return id;
                    });
                },
            };
        },
        createInitialState({ createDocument }) {
            const id = generate();
            createDocument({ id, plugin, state: initialState });
            return id;
        },
        deserialize(serialized, { createDocument }) {
            const id = generate();
            createDocument({ id, ...serialized });
            return id;
        },
        serialize(id, { getDocument }) {
            const document = getDocument(id);
            if (document === null) {
                throw new Error('There exists no document with the given id');
            }
            return document;
        },
        getFocusableChildren(id) {
            return [{ id }];
        },
    };
}
