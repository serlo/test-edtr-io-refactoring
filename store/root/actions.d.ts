import { EditorPlugin } from '@/internal__plugin';
import { ActionCreatorAction, ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '../types';
/** @public */
export declare const initRoot: ActionCreatorWithPayload<'InitRoot', {
    initialState: {
        plugin: string;
        state?: unknown;
    };
    plugins: Record<string, EditorPlugin>;
}>;
/** @public */
export type InitRootAction = ActionCreatorAction<typeof initRoot>;
/** @internal */
export declare const pureInitRoot: ActionCreatorWithoutPayload<'PureInitRoot'>;
/** @internal */
export type PureInitRootAction = ActionCreatorAction<typeof pureInitRoot>;
/** @public */
export type RootAction = InitRootAction;
/** @internal */
export type InternalRootAction = PureInitRootAction;
