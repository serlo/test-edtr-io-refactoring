import { SubReducer } from '../helpers';
import { Selector } from '../types';
/** @internal */
export declare const rootReducer: SubReducer<string | null>;
/** @public */
export declare const getRoot: Selector<string | null>;
/** @public */
export declare const serializeRootDocument: Selector<{
    plugin: string;
    state: any;
} | null>;
