import 'typeface-ibm-plex-sans';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore, { history } from './configStore';
import Main from './main';

// import { ConnectedRouter } from 'connected-react-router';
const root = document.getElementById('root');
const basePath = process.env.BASE_PATH;

const initialState = window.initialReduxState;
const store = configureStore(initialState);

const load = () =>
  render(
    <Provider store={store}>
      <Main history={history} />
    </Provider>,
    //   <BrowserRouter basename={basePath}>
    //     <App />
    //   </BrowserRouter>
    // </AppContainer>,
    root
  );

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept(() => {
    load();
  });
}

load();

// store.subscribe(load);
