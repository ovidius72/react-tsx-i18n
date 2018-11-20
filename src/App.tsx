import { I18nProvider, Trans } from '@lingui/react';
import AppMessages from 'components/AppMessages/AppMessages/AppMessages';
import Logo from 'images/Logo.png';
import { inject, observer } from 'mobx-react';
import { ILanguageStore } from 'models/languageStore';
import { IUIStore } from 'models/uiStore';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import ConnectedLanguageSelector from 'src/form/Language/ConnectedLanguageSelector';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat|Roboto');
  body {
    font-size: 17px;
    margin: 0;
    padding: 0;
    line-height: 1em;
    color: #404040;
    font-family: Roboto, sans-serif;
  }
`;

interface IAppProps {
  uiStore?: IUIStore;
  languageStore?: ILanguageStore;
}

type Props = IAppProps & RouteComponentProps;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 1em;
  background: papayawhip;
`;

const LogoImage = styled.img`
  width: 150px;
  display: block;
  margin: auto;
`;

@inject('uiStore', 'languageStore')
@observer
class App extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.uiStore!.setMessagesRead();
    this.props.uiStore!.addSuccessMessage('Welcome to React TSX');
  }

  componentWillReceiveProps(nextProps: Props) {
    const { uiStore, location: { pathname } } = this.props;
    const { pathname: oldPathname } = nextProps.location;
    // when location changes app messages are set to visited so that they will not be showed on the next page.
    if (uiStore && pathname !== oldPathname) {
      uiStore.setVisitedMessagesRead();
    }
  }

  render() {
    const { uiStore, languageStore } = this.props;
    if (!uiStore || !languageStore) {
      throw Error('Error injecting stores');
    }

    const { catalog, loading: loadingCatalog, activeLanguage } = languageStore;
    return (
      <I18nProvider language={activeLanguage.lang} catalogs={{ [activeLanguage.lang]: catalog }}>
        {loadingCatalog ? (
          <div>Loading...</div>
        ) : (
          <ThemeProvider theme={{ color: '#808080' }}>
            <React.Fragment>
              <Wrapper>
                <div id="app">
                  <div className="logo-container">
                    <LogoImage src={Logo} />
                  </div>
                  <ConnectedLanguageSelector />
                  <Title>React + Typescript + MST + i18n</Title>
                  <AppMessages
                    onMessageClose={this.props.uiStore!.setMessageRead}
                    messages={this.props.uiStore!.unreadMessages}
                  />
                  <p>
                    <Trans>Main Page</Trans>
                  </p>
                </div>
              </Wrapper>
              <GlobalStyle />
            </React.Fragment>
          </ThemeProvider>
        )}
      </I18nProvider>
    );
  }
}

export default withRouter(App);
