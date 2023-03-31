import * as R from 'ramda';
import { channel } from 'redux-saga';
import { all, call, delay, put, race, select, take, takeEvery, } from 'redux-saga/effects';
import { applyActions } from '../actions';
import { scopeSelector } from '../helpers';
import { undo, redo, pureUndo, pureRedo, commit, pureCommit, reset, pureReset, temporaryCommit, } from './actions';
import { getPendingChanges, getRedoStack, getUndoStack } from './reducer';
export function* historySaga() {
    yield all([
        call(commitSaga),
        takeEvery(temporaryCommit.type, temporaryCommitSaga),
        takeEvery(undo.type, undoSaga),
        takeEvery(redo.type, redoSaga),
        takeEvery(reset.type, resetSaga),
    ]);
}
function* temporaryCommitSaga(action) {
    const actions = action.payload.initial;
    yield all(actions.map((action) => put(action.action)));
    yield put(pureCommit({
        combine: false,
        actions,
    })(action.scope));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const chan = yield call(channel);
    function createPutToChannel(type) {
        return function (finalActions) {
            chan.put({
                [type]: finalActions,
                scope: action.scope,
                tempActions: actions,
            });
        };
    }
    if (action.payload.executor) {
        action.payload.executor(createPutToChannel('resolve'), createPutToChannel('reject'), createPutToChannel('next'));
        yield call(resolveSaga, chan);
    }
}
function* resolveSaga(chan) {
    while (true) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const payload = yield take(chan);
        const finalActions = payload.resolve || payload.next || payload.reject || [];
        const tempActions = payload.tempActions;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const stack = yield select(scopeSelector(getUndoStack, payload.scope));
        const replays = R.takeWhile((replay) => replay !== tempActions, stack);
        // revert all actions until the temporary actions
        yield all(replays.map((replay) => {
            return all(replay.map((a) => put(a.reverse)));
        }));
        // then revert the temporary action
        yield all(tempActions.map((a) => put(a.reverse)));
        // apply final actions and all reverted actions
        yield all(finalActions.map((a) => put(a.action)));
        yield all(replays.map((replay) => {
            return all(replay.map((a) => put(a.action)));
        }));
        // replace in history
        replaceInArray(tempActions, finalActions);
        if (payload.resolve || payload.reject) {
            break;
        }
    }
    chan.close();
}
function replaceInArray(arr, arr2) {
    arr.splice(0, arr.length, ...arr2);
}
function* commitSaga() {
    while (true) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const action = yield take(commit.type);
        yield call(executeCommit, action.payload, false, action.scope);
        while (true) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const { action, timeout } = yield race({
                action: take(commit.type),
                timeout: delay(1000),
            });
            if (timeout) {
                break;
            }
            if (action) {
                yield call(executeCommit, action.payload, true, action.scope);
            }
        }
    }
}
function* executeCommit(actions, combine, scope) {
    yield all(actions.map((action) => put(action.action)));
    yield put(pureCommit({
        combine,
        actions,
    })(scope));
}
function* undoSaga(action) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const undoStack = yield select(scopeSelector(getUndoStack, action.scope));
    const toUndo = R.head(undoStack);
    if (!toUndo)
        return;
    const actions = R.reverse(toUndo).map((reversibleAction) => reversibleAction.reverse);
    yield put(applyActions(actions)(action.scope));
    yield put(pureUndo()(action.scope));
}
function* redoSaga(action) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const redoStack = yield select(scopeSelector(getRedoStack, action.scope));
    const replay = R.head(redoStack);
    if (!replay)
        return;
    const actions = replay.map((reversibleAction) => reversibleAction.action);
    yield put(applyActions(actions)(action.scope));
    yield put(pureRedo()(action.scope));
}
function* resetSaga(action) {
    while (true) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const pendingChanges = yield select(scopeSelector(getPendingChanges, action.scope));
        if (pendingChanges === 0)
            break;
        else if (pendingChanges < 0) {
            yield call(redoSaga, redo()(action.scope));
        }
        else {
            yield call(undoSaga, undo()(action.scope));
        }
    }
    yield put(pureReset()(action.scope));
}
