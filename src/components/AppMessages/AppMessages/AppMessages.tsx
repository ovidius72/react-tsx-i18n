import { IMessageStore } from 'models/uiStore';
import React from 'react';

import AppMessageItem from '../AppMessageItem/AppMessageItem';

type AppMessagesProps = {
  messages: IMessageStore[];
  grouped?: boolean;
  closable?: boolean;
  onMessageClose: (id: string) => void;
};

const AppMessages: React.SFC<AppMessagesProps> = ({ messages, grouped, closable, onMessageClose }) => {
  if (!grouped) {
    return <div className="list-container">{messages.map(m => <AppMessageItem key={m.id} onClose={onMessageClose} closable={closable} message={m} />)}</div>
  }
  return <>Grouped</>
};

AppMessages.defaultProps = {
  closable: true,
  grouped: false,
};

export default AppMessages;
