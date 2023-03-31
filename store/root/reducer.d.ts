import { SubReducer } from '../helpers';
import { Selector } from '../storetypes';
/** @internal */
export declare const rootReducer: SubReducer<string | null>;
/** @public */
export declare const getRoot: Selector<string | null>;
/** @public */
export declare const serializeRootDocument: Selector<{
    plugin: string;
    state: any;
} | null>;
