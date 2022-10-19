// import stores from './store';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { lazy, StrictMode, Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { defaultLocale, dynamicActivate } from './i18n';
import reportWebVitals from './reportWebVitals';
import { store } from './store';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

const basePath = process.env.BASE_PATH || '/';
const App = lazy(() => import('./App'));
const TransitionComponent = lazy(() => import('./components/Transition'));
const TestComponent = lazy(() => import('./components/TestComponent'));
const FormComponent = lazy(() => import('./components/FormComponent'));
const FetchComponent = lazy(() => import('./components/FetchComponent'));

const renderInStrictMode = true;

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
          <Route path="form" element={<FormComponent />} />
          <Route path="fetch" element={<FetchComponent />} />
          <Route path="transition" element={<TransitionComponent />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
};

const SuspendedApp = () => (
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <I18nApp />
    </Suspense>
  </Provider>
);

if (renderInStrictMode) {
  root.render(
    <StrictMode>
      <SuspendedApp />
    </StrictMode>,
  );
} else {
  ReactDOM.render(<SuspendedApp />, container);
}

reportWebVitals();
