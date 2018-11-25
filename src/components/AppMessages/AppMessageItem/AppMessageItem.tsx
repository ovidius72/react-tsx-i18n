import { withI18n, withI18nProps } from '@lingui/react';
import classNames from 'classnames';
import { IMessageStore } from 'models/uiStore';
import { darken, parseToRgb, rgb } from 'polished';
import React from 'react';
import styled from 'styled-components/macro';
import { Info, X } from 'styled-icons/feather';

type AppMessageItemProps = {
  message: IMessageStore;
  closable?: boolean;
  onClose: (id: string) => void;
} & withI18nProps;

const Wrapper = styled.article`
  background-color: peachpuff;
  border-radius: .2em;
  padding: .5em;
  position: relative;
  margin: .5em 0;
`;
const Header = styled.h3`
  font-size: 1.2em;
  padding: 0 0 0 10px;
  margin: .5em 0;
  color: ${darken(0.2, rgb(parseToRgb('palevioletred')))};
`;

const Content = styled.div`
  display: flex;
  border-radius: 4px;
  align-items: center;
  padding: 10px;

  [class*=icon] {
    margin-right: .5em;
  }
  [class*=text] {
    font-weight: 700;
  }
`;

const Close = styled(X)`
  color: #101010;
  transition: all .2s;
  opacity: .3;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 5px;
  padding: 10px;
  width: 32px;
  &:hover {
    transition: all .2s;
    opacity: .9;
    color: violet;
  }
`;

const AppMessageItem: React.SFC<AppMessageItemProps> = ({ message, closable, i18n, onClose }) => {
  const classes = classNames({
    'app-message': true,
    [`app-message-${message.id}`]: true,
  });

  return (
    <Wrapper className={classes}>
      <Header className="app-message-header">{i18n._(message.header)}</Header>
      <Content className="app-message-content">
        <div className="app-message-content-icon">
          <Info size={48} />
        </div>
        <div className="app-message-content-text">{i18n._(message.content)}</div>
        {closable && <Close onClick={() => onClose(message.id)} className="app-message-close" />}
      </Content>
    </Wrapper>
  );
};

AppMessageItem.defaultProps = {
  closable: false,
};

export default withI18n()(AppMessageItem);
