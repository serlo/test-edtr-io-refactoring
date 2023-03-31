import { StateExecutor } from '../../internal__plugin-state';
import { ReversibleAction } from '../actions';
import { ActionCreatorAction, ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '../storetypes';
/** @public */
export declare const persist: ActionCreatorWithoutPayload<"Persist">;
/** @public */
export type PersistAction = ActionCreatorAction<typeof persist>;
/** @public */
export declare const reset: ActionCreatorWithoutPayload<"Reset">;
/** @public */
export type ResetAction = ActionCreatorAction<typeof reset>;
/** @internal */
export declare const pureReset: ActionCreatorWithoutPayload<"PureReset">;
/** @internal */
export type PureResetAction = ActionCreatorAction<typeof pureReset>;
/** @internal */
export declare const commit: ActionCreatorWithPayload<'Commit', ReversibleAction[]>;
/** @internal */
export interface CommitAction {
    type: 'Commit';
    payload: ReversibleAction[];
    scope: string;
}
/** @internal */
export declare const pureCommit: ActionCreatorWithPayload<'PureCommit', {
    combine: boolean;
    actions: ReversibleAction[];
}>;
/** @internal */
export interface PureCommitAction {
    type: 'PureCommit';
    payload: {
        combine: boolean;
        actions: ReversibleAction[];
    };
    scope: string;
}
/** @internal */
export declare const temporaryCommit: ActionCreatorWithPayload<'TemporaryCommit', {
    initial: ReversibleAction[];
    executor?: StateExecutor<ReversibleAction[]>;
}>;
/** @internal */
export interface TemporaryCommitAction {
    type: 'TemporaryCommit';
    payload: {
        initial: ReversibleAction[];
        executor?: StateExecutor<ReversibleAction[]>;
    };
    scope: string;
}
/** @public */
export declare const undo: ActionCreatorWithoutPayload<'Undo'>;
/** @public */
export type UndoAction = ActionCreatorAction<typeof undo>;
/** @internal */
export declare const pureUndo: ActionCreatorWithoutPayload<'PureUndo'>;
/** @internal */
export type PureUndoAction = ActionCreatorAction<typeof pureUndo>;
/** @public */
export declare const redo: ActionCreatorWithoutPayload<'Redo'>;
/** @public */
export type RedoAction = ActionCreatorAction<typeof redo>;
/** @internal */
export declare const pureRedo: ActionCreatorWithoutPayload<'PureRedo'>;
/** @internal */
export type PureRedoAction = ActionCreatorAction<typeof pureRedo>;
/** @public */
export type HistoryAction = PersistAction | ResetAction | UndoAction | RedoAction;
/** @internal */
export type InternalHistoryAction = PureResetAction | CommitAction | PureCommitAction | PureUndoAction | PureRedoAction | TemporaryCommitAction;
