import { StateExecutor, StateUpdater } from '@/internal__plugin-state';
import { ActionCreatorAction, ActionCreatorWithPayload, DocumentState } from '../types';
/** @public */
export declare const insert: ActionCreatorWithPayload<"Insert", {
    id: string;
    plugin: string;
    state?: unknown;
}>;
/** @public */
export type InsertAction = ActionCreatorAction<typeof insert>;
/** @internal */
export declare const pureInsert: ActionCreatorWithPayload<"PureInsert", {
    id: string;
} & DocumentState>;
/** @internal */
export type PureInsertAction = ActionCreatorAction<typeof pureInsert>;
/** @public */
export declare const remove: ActionCreatorWithPayload<"Remove", string>;
/** @public */
export type RemoveAction = ActionCreatorAction<typeof remove>;
/** @internal */
export declare const pureRemove: ActionCreatorWithPayload<"PureRemove", string>;
/** @internal */
export type PureRemoveAction = ActionCreatorAction<typeof pureRemove>;
/** @public */
export declare const change: ActionCreatorWithPayload<'Change', {
    id: string;
    state: {
        initial: StateUpdater<unknown>;
        executor?: StateExecutor<StateUpdater<unknown>>;
    };
    reverse?: (previousState: unknown) => unknown;
}>;
/** @public */
export type ChangeAction = ActionCreatorAction<typeof change>;
/** @internal */
export declare const pureChange: ActionCreatorWithPayload<'PureChange', {
    id: string;
    state: unknown;
}>;
/** @internal */
export type PureChangeAction = ActionCreatorAction<typeof pureChange>;
/** @public */
export declare const wrap: ActionCreatorWithPayload<'Wrap', {
    id: string;
    document: (id: string) => DocumentState;
}>;
/** @public */
export type WrapAction = ActionCreatorAction<typeof wrap>;
/** @internal */
export declare const pureWrap: ActionCreatorWithPayload<'PureWrap', {
    id: string;
    newId: string;
    document: DocumentState;
}>;
/** @internal */
export type PureWrapAction = ActionCreatorAction<typeof pureWrap>;
/** @public */
export declare const unwrap: ActionCreatorWithPayload<'Unwrap', {
    id: string;
    oldId: string;
}>;
/** @public */
export type UnwrapAction = ActionCreatorAction<typeof unwrap>;
/** @internal */
export declare const pureUnwrap: ActionCreatorWithPayload<'PureUnwrap', {
    id: string;
    oldId: string;
}>;
/** @internal */
export type PureUnwrapAction = ActionCreatorAction<typeof pureUnwrap>;
/** @public */
export declare const replace: ActionCreatorWithPayload<'Replace', {
    id: string;
    plugin: string;
    state?: unknown;
}>;
/** @public */
export type ReplaceAction = ActionCreatorAction<typeof replace>;
/** @internal */
export declare const pureReplace: ActionCreatorWithPayload<'PureReplace', {
    id: string;
    plugin: string;
    state?: unknown;
}>;
/** @internal */
export type PureReplaceAction = ActionCreatorAction<typeof pureReplace>;
/** @public */
export declare const replaceText: ActionCreatorWithPayload<'ReplaceText', {
    id: string;
    document: (id: string) => DocumentState;
}>;
/** @public */
export type ReplaceTextAction = ActionCreatorAction<typeof replaceText>;
/** @internal */
export declare const pureReplaceText: ActionCreatorWithPayload<'PureReplaceText', {
    id: string;
    newId: string;
    document: DocumentState;
}>;
/** @internal */
export type PureReplaceTextAction = ActionCreatorAction<typeof pureReplaceText>;
/** @public */
export type DocumentsAction = InsertAction | RemoveAction | ChangeAction | WrapAction | UnwrapAction | ReplaceAction | ReplaceTextAction;
/** @internal */
export type InternalDocumentsAction = PureInsertAction | PureRemoveAction | PureChangeAction | PureWrapAction | PureUnwrapAction | PureReplaceAction | PureReplaceTextAction;
