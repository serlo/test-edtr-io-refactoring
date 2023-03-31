import * as R from 'ramda';
import { applyMiddleware, createStore as createReduxStore, } from 'redux';
import _createSagaMiddleware from 'redux-saga';
import { reducer } from './reducer';
import { saga } from './saga';
const createSagaMiddleware = _createSagaMiddleware;
/**
 * Creates the Edtr.io store
 *
 * @param options - The options
 * @returns The Edtr.io store
 * @public
 */
export function createStore(options) {
    const { scopes, createEnhancer } = options;
    const sagaMiddleware = createSagaMiddleware();
    const defaultEnhancer = applyMiddleware(sagaMiddleware);
    const enhancer = createEnhancer(defaultEnhancer);
    const initialStates = R.mapObjIndexed((scope) => {
        return {
            plugins: scope,
            documents: {},
            focus: null,
            root: null,
            clipboard: [],
            history: {
                undoStack: [],
                redoStack: [],
                pendingChanges: 0,
            },
        };
    }, scopes);
    // eslint-disable-next-line @typescript-eslint/ban-types
    const store = createReduxStore(reducer, 
    // Redux does something weird with `unknown` values.
    initialStates, enhancer);
    sagaMiddleware.run(saga);
    return { store };
}
