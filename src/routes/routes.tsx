import React, { lazy } from 'react';
import Loadable from 'react-loadable';
import { Route, RouteProps } from 'react-router-dom';

import { i18nMark } from '@lingui/react';

const AsyncPage = (page: string) =>
  Loadable({
    loader: () => import(/* webpackMode: "lazy", webpackChunkName: "page-[index]" */ `../pages/${page}`),
    loading: props => (props.error ? <div>{JSON.stringify(props.error)}</div> : <div>Loading....</div>)
  });

type RouteType = {
  menu: boolean;
  name: string;
  route: Partial<RouteProps> & { element: any; component: React.Component | Promise<any> | any; path: string };
};
export const routes: RouteType[] = [
  {
    menu: true,
    name: i18nMark('Home'),
    route: {
      component: AsyncPage('Home/Home'),
      element: Route,
      exact: true,
      path: '/'
    }
  },
  {
    menu: true,
    name: i18nMark('Language'),
    route: {
      component: AsyncPage('MultiLanguage/MultiLanguage'),
      element: Route,
      path: '/lang'
    }
  }
];
