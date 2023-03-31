import * as R from 'ramda';
import { createSelector, createSubReducer } from '../helpers';
import { pureCopy } from './actions';
/** @internal */
export const clipboardReducer = createSubReducer('clipboard', [], {
    [pureCopy.type](clipboardState, action) {
        const maxLength = 3;
        const appended = R.prepend(action.payload, clipboardState);
        const nextClipboard = appended.length > maxLength
            ? R.remove(maxLength, appended.length - maxLength, appended)
            : appended;
        return nextClipboard;
    },
});
/** @beta */
export const getClipboard = createSelector((state) => state.clipboard);
