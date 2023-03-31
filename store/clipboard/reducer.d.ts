import { SubReducer } from '../helpers';
import { DocumentState, Selector } from '../types';
/** @internal */
export declare const clipboardReducer: SubReducer<DocumentState[]>;
/** @beta */
export declare const getClipboard: Selector<DocumentState[]>;
