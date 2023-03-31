import { EditorPlugin } from '@edtr-io/internal__plugin';
import { Store, StoreEnhancer } from 'redux';
import { Action } from './actions';
import { serializeRootDocument } from './root/reducer';
import { SelectorReturnType, State } from './types';
/**
 * Creates the Edtr.io store
 *
 * @param options - The options
 * @returns The Edtr.io store
 * @public
 */
export declare function createStore<K extends string>(options: StoreOptions<K>): {
    store: Store<State, Action>;
};
/** @public */
export interface StoreOptions<K extends string> {
    scopes: Record<string, Record<K, EditorPlugin>>;
    createEnhancer: StoreEnhancerFactory;
}
/** @public */
export type StoreEnhancerFactory = (defaultEnhancer: StoreEnhancer) => StoreEnhancer;
/** @public */
export type ChangeListener = (payload: {
    changed: boolean;
    getDocument: () => SelectorReturnType<typeof serializeRootDocument>;
}) => void;
