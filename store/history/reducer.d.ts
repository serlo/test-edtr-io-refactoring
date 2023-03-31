import { ReversibleAction } from '../actions';
import { SubReducer } from '../helpers';
import { HistoryState, InternalSelector, Selector } from '../storetypes';
/** @internal */
export declare const historyReducer: SubReducer<HistoryState>;
/** @internal */
export declare const getHistory: InternalSelector<HistoryState>;
/** @public */
export declare const getPendingChanges: Selector<number>;
/** @public */
export declare const hasPendingChanges: Selector<boolean>;
/** @public */
export declare const hasUndoActions: Selector<boolean>;
/** @public */
export declare const hasRedoActions: Selector<boolean>;
/** @internal */
export declare const getUndoStack: InternalSelector<ReversibleAction[][]>;
/** @internal */
export declare const getRedoStack: InternalSelector<ReversibleAction[][]>;
