import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { IUIStore } from '../../models/uiStore';
import AppMessages from './AppMessages/AppMessages';

export type ConnectedAppMessagesProps = {
  uiStore?: IUIStore;
};

@inject('uiStore')
@observer
class ConnectedAppMessages extends React.Component<ConnectedAppMessagesProps, any> {
  public render() {
    const { uiStore } = this.props;
    if (!uiStore) {
      return null;
    }
    const { unreadMessages, setMessageRead } = uiStore;
    return <AppMessages messages={unreadMessages} onMessageClose={setMessageRead} />;
  }
}

export default ConnectedAppMessages;
