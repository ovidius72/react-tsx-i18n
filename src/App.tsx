import { I18nProvider } from '@lingui/react';
import { inject, observer } from 'mobx-react';
import { ILanguageStore } from 'models/languageStore';
import { IUIStore } from 'models/uiStore';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { createGlobalStyle, ThemeProvider } from 'styled-components/macro';

import { Layout } from './layout/Layout/Layout';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat|Roboto');
  body {
    font-size: 17px;
    margin: 0;
    background-color: white;
    padding: 0;
    line-height: 1em;
    color: #404040;
    font-family: Roboto, sans-serif;
  }
`;

interface IAppProps {
  uiStore: IUIStore;
  languageStore: ILanguageStore;
}

type Props = IAppProps & RouteComponentProps;

@inject('uiStore', 'languageStore')
@observer
class App extends React.Component<any, {}> {
  componentDidMount() {
    this.injectedProps.uiStore!.setMessagesRead();
  }

  get injectedProps():Props {
    return this.props as Props;
  }

  componentWillReceiveProps(nextProps: Props) {
    const { uiStore, location: { pathname } } = this.injectedProps;

    const { pathname: oldPathname } = nextProps.location;
    // when location changes app messages are set to visited so that they will not be showed on the next page.
    uiStore.setVisitedMessagesRead();
  }

  render() {
    const { uiStore, languageStore } = this.injectedProps;
    const { catalog, loading: loadingCatalog, activeLanguage } = languageStore;
    return (
      <I18nProvider language={activeLanguage.lang} catalogs={{ [activeLanguage.lang]: catalog }}>
        {loadingCatalog ? (
          <div>Loading...</div>
        ) : (
          <ThemeProvider theme={{ color: '#808080' }}>
            <React.Fragment>
              <Layout />
              <GlobalStyle />
            </React.Fragment>
          </ThemeProvider>
        )}
      </I18nProvider>
    );
  }
}

export default withRouter(App);
