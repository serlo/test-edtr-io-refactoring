import * as R from 'ramda';
import { getDocuments } from '../documents/reducer';
import { createInternalSelector, createSelector, createSubReducer, } from '../helpers';
import { persist, pureCommit, pureRedo, pureUndo, } from './actions';
/** @internal */
export const historyReducer = createSubReducer('history', {
    undoStack: [],
    redoStack: [],
    pendingChanges: 0,
}, {
    [persist.type](historyState, _action, state) {
        return {
            ...historyState,
            initialState: historyState.initialState || {
                documents: getDocuments()(state),
            },
            pendingChanges: 0,
        };
    },
    [pureCommit.type](historyState, action) {
        const { combine, actions } = action.payload;
        let actionsToCommit = actions;
        const { undoStack } = historyState;
        return {
            ...historyState,
            undoStack: calculateNewUndoStack(),
            redoStack: [],
            pendingChanges: historyState.pendingChanges + actions.length,
        };
        function calculateNewUndoStack() {
            if (combine && undoStack.length > 0) {
                const previousActions = undoStack[0];
                actionsToCommit = [...previousActions, ...actionsToCommit];
                return [actionsToCommit, ...R.tail(undoStack)];
            }
            return [actionsToCommit, ...undoStack];
        }
    },
    [pureUndo.type](historyState, _action) {
        const [actions, ...remainingUndoStack] = historyState.undoStack;
        if (!actions)
            return historyState;
        return {
            ...historyState,
            undoStack: remainingUndoStack,
            redoStack: [actions, ...historyState.redoStack],
            pendingChanges: historyState.pendingChanges - actions.length,
        };
    },
    [pureRedo.type](historyState, _action) {
        const [actions, ...remainingRedoStack] = historyState.redoStack;
        if (!actions)
            return historyState;
        return {
            ...historyState,
            undoStack: [actions, ...historyState.undoStack],
            redoStack: remainingRedoStack,
            pendingChanges: historyState.pendingChanges + actions.length,
        };
    },
});
/** @internal */
export const getHistory = createInternalSelector((state) => state.history);
/** @public */
export const getPendingChanges = createSelector((state) => state.history.pendingChanges);
/** @public */
export const hasPendingChanges = createSelector((state) => getPendingChanges()(state) !== 0);
/** @public */
export const hasUndoActions = createSelector((state) => state.history.undoStack.length > 0);
/** @public */
export const hasRedoActions = createSelector((state) => state.history.redoStack.length > 0);
/** @internal */
export const getUndoStack = createInternalSelector((state) => getHistory()(state).undoStack);
/** @internal */
export const getRedoStack = createInternalSelector((state) => getHistory()(state).redoStack);
