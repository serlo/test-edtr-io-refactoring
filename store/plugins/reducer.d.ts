import { EditorPlugin } from '../../internal__plugin';
import { StateType } from '../../internal__plugin-state';
import { SubReducer } from '../helpers';
import { Selector } from '../storetypes';
/** @internal */
export declare const pluginsReducer: SubReducer<Record<string, EditorPlugin>>;
/** @public */
export declare const getPlugins: Selector<Record<string, EditorPlugin<StateType>>>;
/** @public */
export declare const getPlugin: Selector<EditorPlugin<StateType<any, any, any>, {}> | null, [type: string]>;
