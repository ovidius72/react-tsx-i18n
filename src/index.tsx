// import { AppContainer } from 'react-hot-loader'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, lazy, Suspense } from 'react';

// import { App } from './App';
// import stores from './store';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { defaultLocale, dynamicActivate } from './i18n';
import ReactDOM from 'react-dom';
// import { TestComponent } from './components/TestComponent';
import { store } from './store';
import { Provider } from 'react-redux';

const root = document.getElementById('root');
const basePath = '/';
//@ts-ignore
const App = lazy(() => import('./App'));
//@ts-ignore
const TestComponent = lazy(() => import('./components/TestComponent'));

const I18nApp = () => {
  useEffect(() => {
    console.log('loading dynamic catalogs');
    // load catalogs dynamically.
    dynamicActivate(defaultLocale);
  }, []);

  return (
    <I18nProvider i18n={i18n}>
      <BrowserRouter basename={basePath}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="test" element={<TestComponent />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
};

//@ts-ignore
ReactDOM.unstable_createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <I18nApp />
      </Suspense>
    </Provider>
  </React.StrictMode>,
);

// COMMENTED OUT: Testin react refresh webpack plugin.
// TODO: Remove once testing in completed.
//
// // This is needed for Hot Module Replacement
// if (module.hot != null) {
//   console.log('module', module);
//   module.hot.accept(() => {
//     console.log('module accepted', module);
//     // load()
//   });
// }

// load()
