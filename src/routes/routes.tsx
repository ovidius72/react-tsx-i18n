import { i18nMark } from '@lingui/react';
import React, { lazy } from 'react';
import Loadable from 'react-loadable';
import { Route } from 'react-router-dom';

const AsyncPage = (page: string) =>
  Loadable({
    loader: () => import(/* webpackMode: "lazy", webpackChunkName: "page-[index]" */ `../pages/${page}`),
    loading: props => (props.error ? <div>{JSON.stringify(props.error)}</div> : <div>Loading....</div>),
  });

export const routes = [
  {
    menu: true,
    name: i18nMark('Home'),
    route: {
      component: AsyncPage('Home/Home'),
      element: Route,
      exact: true,
      path: '/',
    },
  },
  {
    menu: true,
    name: i18nMark('Language'),
    route: {
      component: AsyncPage('MultiLanguage/MultiLanguage'),
      element: Route,
      path: '/lang',
    },
  },
];
