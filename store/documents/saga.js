import { invariant } from '@edtr-io/internal__dev-expression';
import { channel } from 'redux-saga';
import { all, call, put, select, take, takeEvery } from 'redux-saga/effects';
import generate from 'shortid';
import { scopeSelector } from '../helpers';
import { commit, temporaryCommit } from '../history/actions';
import { getPlugin } from '../plugins/reducer';
import { change, insert, pureChange, pureInsert, pureRemove, pureReplace, pureUnwrap, pureWrap, remove, replace, replaceText, pureReplaceText, unwrap, wrap, } from './actions';
import { getDocument } from './reducer';
export function* documentsSaga() {
    yield all([
        takeEvery(insert.type, insertSaga),
        takeEvery(remove.type, removeSaga),
        takeEvery(change.type, changeSaga),
        takeEvery(wrap.type, wrapSaga),
        takeEvery(unwrap.type, unwrapSaga),
        takeEvery(replace.type, replaceSaga),
        takeEvery(replaceText.type, replaceTextSaga),
    ]);
}
function* insertSaga(action) {
    const initialState = action.payload;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const [actions] = yield call(handleRecursiveInserts, action.scope, () => { }, [initialState]);
    yield put(commit(actions)(action.scope));
}
function* removeSaga(action) {
    const id = action.payload;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const doc = yield select(scopeSelector(getDocument, action.scope), id);
    if (!doc)
        return;
    const actions = [
        {
            action: pureRemove(id)(action.scope),
            reverse: pureInsert({
                id,
                plugin: doc.plugin,
                state: doc.state,
            })(action.scope),
        },
    ];
    yield put(commit(actions)(action.scope));
}
function* changeSaga(action) {
    const { id, state: stateHandler, reverse } = action.payload;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const document = yield select(scopeSelector(getDocument, action.scope), id);
    if (!document)
        return;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const [actions, state] = yield call(handleRecursiveInserts, action.scope, (helpers) => {
        return stateHandler.initial(document.state, helpers);
    });
    const createChange = (state) => {
        return {
            action: pureChange({ id, state })(action.scope),
            reverse: pureChange({
                id,
                state: typeof reverse === 'function'
                    ? reverse(document.state)
                    : document.state,
            })(action.scope),
        };
    };
    actions.push(createChange(state));
    if (!stateHandler.executor) {
        yield put(commit(actions)(action.scope));
    }
    else {
        // async change, handle with stateHandler.resolver
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const chan = yield call(channel);
        yield put(temporaryCommit({
            initial: actions,
            executor: (resolve, reject, next) => {
                if (!stateHandler.executor) {
                    resolve(actions);
                    return;
                }
                stateHandler.executor(function stateResolve(updater) {
                    chan.put({
                        resolve: updater,
                        scope: action.scope,
                        callback: (resolveActions, state) => {
                            resolve([...resolveActions, createChange(state)]);
                        },
                    });
                }, function stateReject(updater) {
                    chan.put({
                        reject: updater,
                        scope: action.scope,
                        callback: (resolveActions, state) => {
                            reject([...resolveActions, createChange(state)]);
                        },
                    });
                }, function stateNext(updater) {
                    chan.put({
                        next: updater,
                        scope: action.scope,
                        callback: (resolveActions, state) => {
                            next([...resolveActions, createChange(state)]);
                        },
                    });
                });
            },
        })(action.scope));
        while (true) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const payload = yield take(chan);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const currentDocument = yield select(scopeSelector(getDocument, action.scope), id);
            if (!currentDocument)
                continue;
            const updater = payload.resolve || payload.next || payload.reject || ((s) => s);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const [resolveActions, pureResolveState] = yield call(handleRecursiveInserts, action.scope, (helpers) => {
                return updater(currentDocument.state, helpers);
            });
            payload.callback(resolveActions, pureResolveState);
            if (payload.resolve || payload.reject) {
                break;
            }
        }
    }
}
function* wrapSaga(action) {
    const { id, document: documentHandler } = action.payload;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const currentDocument = yield select(scopeSelector(getDocument, action.scope), id);
    const newId = generate();
    if (!currentDocument)
        return;
    const reversibleAction = {
        action: pureWrap({ id, newId, document: documentHandler(newId) })(action.scope),
        reverse: pureUnwrap({ id, oldId: newId })(action.scope),
    };
    yield put(commit([reversibleAction])(action.scope));
}
function* unwrapSaga(action) {
    const { id, oldId } = action.payload;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const currentDocument = yield select(scopeSelector(getDocument, action.scope), id);
    if (!currentDocument)
        return;
    const reversibleAction = {
        action: pureUnwrap({ id, oldId })(action.scope),
        reverse: pureWrap({
            id,
            newId: oldId,
            document: currentDocument,
        })(action.scope),
    };
    yield put(commit([reversibleAction])(action.scope));
}
function* replaceSaga(action) {
    const { id } = action.payload;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const currentDocument = yield select(scopeSelector(getDocument, action.scope), id);
    if (!currentDocument)
        return;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // @ts-ignore see line above
    const plugin = yield select(scopeSelector(getPlugin, action.scope), action.payload.plugin);
    if (!plugin)
        return;
    const pendingDocs = [];
    const helpers = {
        createDocument(doc) {
            pendingDocs.push(doc);
        },
    };
    let pluginState;
    if (action.payload.state === undefined) {
        pluginState = plugin.state.createInitialState(helpers);
    }
    else {
        pluginState = plugin.state.deserialize(action.payload.state, helpers);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const [actions] = yield call(handleRecursiveInserts, action.scope, () => { }, pendingDocs);
    const reversibleAction = {
        action: pureReplace({
            id,
            plugin: action.payload.plugin,
            state: pluginState,
        })(action.scope),
        reverse: pureReplace({
            id,
            plugin: currentDocument.plugin,
            state: currentDocument.state,
        })(action.scope),
    };
    yield put(commit([...actions, reversibleAction])(action.scope));
}
function* replaceTextSaga(action) {
    const { id, document: documentHandler } = action.payload;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const currentDocument = yield select(scopeSelector(getDocument, action.scope), id);
    const newId = generate();
    // TODO: give previous doc new id
    // TODO: pass new id to document handler
    if (!currentDocument)
        return;
    const reversibleAction = {
        action: pureReplaceText({ id, newId, document: documentHandler(newId) })(action.scope),
        // TODO: here, we should delete the document with newId
        reverse: pureReplaceText({
            id: newId,
            newId: id,
            document: currentDocument,
        })(action.scope),
    };
    yield put(commit([reversibleAction])(action.scope));
}
export function* handleRecursiveInserts(scope, act, initialDocuments = []) {
    const actions = [];
    const pendingDocs = initialDocuments;
    const helpers = {
        createDocument(doc) {
            pendingDocs.push(doc);
        },
    };
    const result = act(helpers);
    for (let doc; (doc = pendingDocs.pop());) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        // @ts-ignore see line above
        const plugin = yield select(scopeSelector(getPlugin, scope), doc.plugin);
        if (!plugin) {
            invariant(false, `Invalid plugin '${doc.plugin}'`);
            continue;
        }
        let state;
        if (doc.state === undefined) {
            state = plugin.state.createInitialState(helpers);
        }
        else {
            state = plugin.state.deserialize(doc.state, helpers);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const currentDocument = yield select(scopeSelector(getDocument, scope), doc.id);
        if (currentDocument) {
            actions.push({
                action: pureReplace({
                    id: doc.id,
                    plugin: doc.plugin,
                    state,
                })(scope),
                reverse: pureReplace({
                    id: doc.id,
                    plugin: currentDocument.plugin,
                    state: currentDocument.state,
                })(scope),
            });
        }
        else {
            actions.push({
                action: pureInsert({
                    id: doc.id,
                    plugin: doc.plugin,
                    state,
                })(scope),
                reverse: pureRemove(doc.id)(scope),
            });
        }
    }
    return [actions, result];
}
