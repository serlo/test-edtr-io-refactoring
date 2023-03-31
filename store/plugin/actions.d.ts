import { ActionCreatorAction, ActionCreatorWithPayload } from '../storetypes';
/** @public */
export declare const insertChildBefore: ActionCreatorWithPayload<"InsertChildBefore", {
    parent: string;
    sibling: string;
    document?: {
        plugin: string;
        state?: unknown;
    } | undefined;
}>;
/** @public */
export type InsertChildBeforeAction = ActionCreatorAction<typeof insertChildBefore>;
/** @public */
export declare const insertChildAfter: ActionCreatorWithPayload<'InsertChildAfter', {
    parent: string;
    sibling?: string;
    document?: {
        plugin: string;
        state?: unknown;
    };
}>;
/** @public */
export type InsertChildAfterAction = ActionCreatorAction<typeof insertChildAfter>;
/** @public */
export declare const removeChild: ActionCreatorWithPayload<'RemoveChild', {
    parent: string;
    child: string;
}>;
/** @public */
export type RemoveChildAction = ActionCreatorAction<typeof removeChild>;
/** @public */
export type PluginAction = InsertChildBeforeAction | InsertChildAfterAction | RemoveChildAction;
