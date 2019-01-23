import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const root = document.getElementById('root');
const basePath = process.env.BASE_PATH;

const load = () =>
  render(
    <AppContainer>
      <BrowserRouter basename={basePath}>
        <App />
      </BrowserRouter>
    </AppContainer>,
    root,
  );

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept(() => {
    load();
  });
}

load();
