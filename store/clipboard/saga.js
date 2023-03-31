import { put, select, takeEvery } from 'redux-saga/effects';
import { serializeDocument } from '../documents/reducer';
import { scopeSelector } from '../helpers';
import { copy, pureCopy } from './actions';
export function* clipboardSaga() {
    yield takeEvery(copy.type, copySaga);
}
function* copySaga(action) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // @ts-ignore SEE LINE ABOVE
    const document = yield select(scopeSelector(serializeDocument, action.scope), action.payload);
    if (!document)
        return;
    yield put(pureCopy(document)(action.scope));
}
