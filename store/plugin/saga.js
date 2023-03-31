import * as R from 'ramda';
import { channel } from 'redux-saga';
import { all, call, put, select, take, takeEvery } from 'redux-saga/effects';
import { change, getDocument } from '../documents';
import { getFocusTree } from '../focus';
import { scopeSelector } from '../helpers';
import { getPlugin } from '../plugins';
import { insertChildAfter, insertChildBefore, removeChild, } from './actions';
export function* pluginSaga() {
    yield all([
        takeEvery(insertChildBefore.type, insertChildBeforeSaga),
        takeEvery(insertChildAfter.type, insertChildAfterSaga),
        takeEvery(removeChild.type, removeChildSaga),
    ]);
}
function* insertChildBeforeSaga({ payload, scope }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parent = yield select(scopeSelector(getFocusTree, scope), payload.parent);
    if (!parent || !parent.children)
        return;
    const index = R.findIndex((child) => child.id === payload.sibling, parent.children);
    if (index === -1)
        return;
    yield call(insertChild, {
        parent: payload.parent,
        previousSibling: index === 0 ? undefined : parent.children[index - 1].id,
        document: payload.document,
        scope,
    });
}
function* insertChildAfterSaga({ payload, scope }) {
    yield call(insertChild, {
        parent: payload.parent,
        previousSibling: payload.sibling,
        document: payload.document,
        scope,
    });
}
function* removeChildSaga({ payload, scope }) {
    yield call(createPlugin, payload.parent, scope, (plugin, state) => {
        if (typeof plugin.removeChild !== 'function')
            return;
        plugin.removeChild(state, payload.child);
    });
}
function* insertChild(payload) {
    yield call(createPlugin, payload.parent, payload.scope, (plugin, state) => {
        if (typeof plugin.insertChild !== 'function')
            return;
        plugin.insertChild(state, {
            previousSibling: payload.previousSibling,
            document: payload.document,
        });
    });
}
function* createPlugin(id, scope, f) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const document = yield select(scopeSelector(getDocument, scope), id);
    if (!document)
        return;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const plugin = yield select(scopeSelector(getPlugin, scope), document.plugin);
    if (!plugin)
        return;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const chan = yield call(channel);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const state = plugin.state.init(document.state, (initial, additional) => {
        const action = change({
            id,
            state: {
                initial,
                executor: additional?.executor,
            },
            reverse: additional?.reverse,
        })(scope);
        chan.put(action);
    });
    f(plugin, state);
    chan.close();
    yield call(channelSaga, chan);
    function* channelSaga(chan) {
        while (true) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const action = yield take(chan);
            yield put(action);
        }
    }
}
