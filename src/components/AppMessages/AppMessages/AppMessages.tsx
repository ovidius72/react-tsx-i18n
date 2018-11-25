import { IMessageStore } from 'models/uiStore';
import React from 'react';
import styled from 'styled-components/macro';

import AppMessageItem from '../AppMessageItem/AppMessageItem';

type AppMessagesProps = {
  messages: IMessageStore[];
  grouped?: boolean;
  closable?: boolean;
  onMessageClose: (id: string) => void;
};

const Wrapper = styled.div`
  margin: .5em 0;
`;

const AppMessages: React.SFC<AppMessagesProps> = ({ messages, grouped, closable, onMessageClose }) => {
  if (!grouped) {
    return <Wrapper className="list-container">{messages.map(m => <AppMessageItem key={m.id} onClose={onMessageClose} closable={closable} message={m} />)}</Wrapper>
  }
  return <>Grouped</>
};

AppMessages.defaultProps = {
  closable: true,
  grouped: false,
};

export default AppMessages;
