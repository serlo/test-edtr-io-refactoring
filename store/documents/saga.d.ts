import { StoreDeserializeHelpers } from '@/internal__plugin-state';
import { ReversibleAction } from '../actions';
export declare function documentsSaga(): Generator<import("redux-saga/effects").AllEffect<import("redux-saga/effects").ForkEffect<never>>, void, unknown>;
export declare function handleRecursiveInserts(scope: string, act: (helpers: StoreDeserializeHelpers) => unknown, initialDocuments?: {
    id: string;
    plugin: string;
    state?: unknown;
}[]): Generator<import("redux-saga/effects").SelectEffect, [ReversibleAction<import("../actions").InternalAction, import("../actions").InternalAction>[], unknown], (import("../../internal__plugin").EditorPlugin<import("@/internal__plugin-state").StateType<any, any, any>, {}> & import("../types").DocumentState) | null>;
