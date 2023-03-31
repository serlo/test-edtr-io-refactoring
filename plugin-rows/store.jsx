import { createSelector, getDocument, isEmpty } from '../store';
/** @public */
export const isEmptyRows = createSelector((state, id) => {
    const rowsDocument = getDocument(id)(state);
    return (rowsDocument &&
        Array.isArray(rowsDocument.state) &&
        rowsDocument.state.every((entry) => {
            const value = entry?.value;
            return typeof value === 'string' && isEmpty(value)(state);
        }));
});
