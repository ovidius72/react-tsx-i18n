import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router';
import { routes } from 'src/routes/routes';
import styled from 'styled-components';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';

export type LayoutProps = {};

const Wrapper = styled.main`
  margin: 0 auto;
  @media all and (min-width: 1024px) {
    max-width: 1024px;
    padding: 1em;
  }

  @media all and (max-width: 1023px) {
    max-width: 990px;
    padding: 2em;
  }
`;

export function Layout(props: LayoutProps) {
  return (
    <Wrapper id="main">
      <Header />
      <main>
        <Switch>
          {routes.map(({ route: { element: RouteElement = Route, component, ...routeProps } }, index) => (
            <RouteElement key={index} component={component} {...routeProps} />
          ))}
        </Switch>
      </main>
      <Footer />
    </Wrapper>
  );
}
