// import stores from './store';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { lazy, StrictMode, Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { defaultLocale, dynamicActivate } from './i18n';
import { reduxStore } from './redux/redux-store';
import reportWebVitals from './reportWebVitals';
import './index.css';
// import { store } from './store';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

// const basePath = process.env.BASE_PATH || '/';
// const App = lazy(() => import('./App'));
// const TransitionComponent = lazy(() => import('./components/Transition'));
// const TestComponent = lazy(() => import('./components/TestComponent'));
// const FormComponent = lazy(() => import('./components/FormComponent'));
// const FetchComponent = lazy(() => import('./components/FetchComponent'));
const Template = lazy(() => import('./components/Template'));
// const CounterPage = lazy(() => import('./features/counter/CounterPage'));

const renderInStrictMode = true;

const I18nApp = () => {
  useEffect(() => {
    console.log('loading dynamic catalogs');
    // load catalogs dynamically.
    dynamicActivate(defaultLocale);
  }, []);

  // const Root = () => {
  //   return (
  //     <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr' }}>
  //       <nav style={{ backgroundColor: 'limegreen' }}>
  //         <ul>
  //           <li>
  //             <Link to="/app">Home</Link>
  //           </li>
  //           <li>
  //             <Link to="/app/add">Add</Link>
  //           </li>
  //         </ul>
  //       </nav>
  //       <main className="content">
  //         <Outlet />
  //       </main>
  //     </div>
  //   );
  // };

  // const Home = () => {
  //   return <div>Home</div>;
  // };

  // const Add = () => {
  //   return <div>Add</div>;
  // };
  // const ViewTodo = () => {
  //   return <div>Home</div>;
  // };
  // const EditTodo = () => {
  //   return <div>Home</div>;
  // };
  // const router = createBrowserRouter([
  //   {
  //     element: <Root />,
  //     path: '/',
  //     children: [
  //       { index: true, element: <Home /> },
  //       { path: '/', element: <Add /> },
  //       { path: '/todo/:id', element: <ViewTodo /> },
  //       { path: '/todo/:id/edit', element: <EditTodo /> },
  //     ],
  //   },
  // ]);
  return (
    <I18nProvider i18n={i18n}>
      <Template />
    </I18nProvider>
  );
};

const SuspendedApp = () => (
  <Provider store={reduxStore}>
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
