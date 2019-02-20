import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'emotion-theming';
import { History } from 'history';
import React from 'react';
import { connect } from 'react-redux';

import Routes from './routes';
import { IApplicationState } from './store';
import { ThemeColors } from './store/layout';
import GlobalStyles from './styles';
import * as themes from './styles/theme';
import { ITheme } from './utils/styled';

interface IPropsFromState {
  theme: ThemeColors;
}

const MyThemeProvider = props => ThemeProvider<ITheme>(props);

interface IPropsFromDispatch {
  [key: string]: any;
}

interface IOwnProps {
  history: History;
}

type allProps = IPropsFromState & IOwnProps & IPropsFromDispatch;

class Main extends React.Component<allProps> {
  public render() {
    const { theme, history } = this.props;
    const activeTheme = themes[theme];

    return (
      <ConnectedRouter history={history}>
        <MyThemeProvider theme={activeTheme}>
          <GlobalStyles />
          <Routes />
        </MyThemeProvider>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = ({ layout }: IApplicationState) => ({
  theme: layout.theme
});

export default connect<IPropsFromState, IPropsFromDispatch, IOwnProps, IApplicationState>(mapStateToProps)(Main);
