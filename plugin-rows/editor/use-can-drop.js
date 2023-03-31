import { useScopedStore } from '../../core';
import { findParent, getDocument, getFocusPath, getFocusTree, } from '../../store';
import * as R from 'ramda';
export function useCanDrop(id, draggingAbove, allowedPlugins) {
    const store = useScopedStore();
    return function (dragId) {
        return (dragId &&
            isAllowedPlugin(dragId) &&
            !wouldDropInOwnChildren(dragId) &&
            !wouldDropAtInitialPosition(dragId));
    };
    function isAllowedPlugin(dragId) {
        const doc = getDocument(dragId)(store.getState());
        return doc && allowedPlugins.includes(doc.plugin);
    }
    function wouldDropInOwnChildren(dragId) {
        const focusPath = getFocusPath(id)(store.getState()) || [];
        return focusPath.includes(dragId);
    }
    function wouldDropAtInitialPosition(dragId) {
        const focusTree = getFocusTree()(store.getState());
        if (!focusTree)
            return true;
        const parent = findParent(focusTree, dragId);
        const dropIndex = getChildPosition(parent, id);
        // Different parents, so definitely not dropped at initial position
        if (dropIndex === null)
            return false;
        const dragIndex = getChildPosition(parent, dragId);
        return draggingAbove
            ? dragIndex === dropIndex - 1
            : dragIndex === dropIndex + 1;
    }
    function getChildPosition(parent, childId) {
        if (!parent)
            return null;
        const position = R.findIndex((node) => node.id === childId, parent.children || []);
        return position > -1 ? position : null;
    }
}
