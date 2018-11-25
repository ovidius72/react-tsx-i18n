import { withI18n, withI18nProps } from '@lingui/react';
import Logo from 'images/Logo.png';
import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'src/routes/routes';
import styled from 'styled-components/macro';

import ConnectedLanguageSelector from '../../form/Language/ConnectedLanguageSelector';

export type HeaderProps = {} & withI18nProps;

const MainHeader = styled.header`
  display: flex;
  flex-direction: column;
  background-color: papayawhip;
  padding: 1em;
  justify-content: space-between;
  align-items: center;
  > * {
    margin: .5em 0;
  }
  @media all and (min-width: 728px) {
    flex-direction: row;
  }
`;
const LogoImage = styled.img`
  width: 150px;
  display: block;
  margin: auto;
`;
const MainMenu = styled.nav`
  padding: .5em;
  a {
    text-decoration: none;
    padding: 6px 12px;
    background-color: #fafafa;
    &:hover {
      background-color: #e7e7e7;
    }
  }
`;

class Header extends React.Component<HeaderProps, any> {
  public render() {
    const { i18n } = this.props;
    return (
      <MainHeader>
        <div className="logo-container">
          <LogoImage src={Logo} />
        </div>
        <p>{i18n.t`What`}</p>
        <MainMenu>
          {routes.filter(i => i.menu === true).map(r => (
            <Link key={r.name} to={r.route.path}>
              {i18n._(r.name)}
            </Link>
          ))}
        </MainMenu>
        <ConnectedLanguageSelector />
      </MainHeader>
    );
  }
}
export default withI18n()(Header);
