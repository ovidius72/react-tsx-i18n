import { withI18n, withI18nProps } from '@lingui/react';
import { inject, observer } from 'mobx-react';
import React from 'react';
import ConnectedAppMessages from 'src/components/AppMessages/ConnectedAppMessages';
import styled from 'styled-components/macro';

import { ILanguageStore } from '../../models/languageStore';
import { IUIStore } from '../../models/uiStore';

export type ContentLayoutProps = {
  title?: string;
  uiStore?: IUIStore;
  languageStore?: ILanguageStore;
  render: (props: Partial<ContentLayoutProps>) => React.ReactNode;
} & withI18nProps;

const Title = styled.h1`
  font-size: 1.5em;
  color: palevioletred;
`;
const Wrapper = styled.section`
  padding: 1em;
  background: papayawhip;
`;

const MainContent = styled.footer`background-color: #fafafa;`;

@inject('uiStore', 'languageStore')
@observer
class ContentLayout extends React.Component<ContentLayoutProps, any> {
  public render() {
    const { title, i18n, uiStore, languageStore } = this.props;
    if (!uiStore || !languageStore) {
      return null;
    }
    const { render: renderFn, children, ...rest } = this.props;
    return (
      <MainContent className="main-content">
        <Wrapper>
          <ConnectedAppMessages />
          {title && <Title className="page-title">{i18n._(title)}</Title>}
          {renderFn(rest)}
        </Wrapper>
      </MainContent>
    );
  }
}

export default withI18n()(ContentLayout);
