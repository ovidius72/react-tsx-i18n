import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { IApplicationState, rootSaga } from './store';
import { rootReducer } from './store';

export const history = createBrowserHistory();

export default function configureStore(initialState: IApplicationState): Store<IApplicationState> {
  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer(history),
    initialState as any,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  return store as any;
}
