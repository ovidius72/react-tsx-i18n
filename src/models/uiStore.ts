import { i18nMark } from '@lingui/react';
import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { uuid } from 'src/utils/appUtils';

import { loadTheme } from '../../styles/themes';

// export type __IModelType = IModelType<any, any>;

enum Status {
  error = 'ERROR',
  warning = 'WARNING',
  success = 'SUCCESS',
}

export interface IMessageStoreType extends SnapshotOut<typeof MessageStore> {}
export interface IMessageStoreTypeIn extends SnapshotIn<typeof MessageStore> {}
export interface IMessageStore extends Instance<typeof MessageStore> {}

export const MessageStore = types
  .model('message', {
    content: types.string,
    header: types.string,
    icon: types.string,
    id: types.string,
    read: types.optional(types.boolean, false),
    status: types.enumeration<Status>('Status', Object.values(Status)),
    visited: types.optional(types.boolean, false),
  })
  .actions(self => {
    const that = self as IMessageStore;
    return {
      setStatus(status: Status) {
        self.status = status;
      },
      markAsRead: () => {
        self.read = true;
      },
      markAsVisited: () => {
        self.visited = true;
      },
      setRead: (read: boolean) => {
        self.read = read;
      },
      setVisited: (visited: boolean) => {
        self.visited = visited;
      },
    };
  });

export interface IUIStoreType extends SnapshotOut<typeof UIStore> {}
export interface IUIStoreTypeIn extends SnapshotIn<typeof UIStore> {}
export interface IUIStore extends Instance<typeof UIStore> {}

const UIStore = types
  .model('UIStore', {
    loading: false,
    messages: types.optional(types.array(MessageStore), []),
    theme: types.optional(types.frozen(), {}),
    themeName: types.optional(types.string, 'dark'),
  })
  .actions(self => {
    const that = self as IUIStore;
    return {
      addErrorMessage(content: string) {
        const message: IMessageStoreType = {
          content,
          header: i18nMark('Error'),
          icon: 'times circle',
          id: String(uuid()),
          read: false,
          status: Status.error,
          visited: false,
        };
        self.messages.push(message as IMessageStore);
      },
      addSuccessMessage(content: string) {
        const message: IMessageStoreType = {
          content,
          header: i18nMark('Success'),
          icon: 'info circle',
          id: uuid(),
          read: false,
          status: Status.success,
          visited: false,
        };
        self.messages.push(message as IMessageStore);
      },
      addWarningMessage(content: string) {
        const message: IMessageStoreType = {
          content,
          header: i18nMark('warning'),
          icon: 'warning sign',
          id: uuid(),
          read: false,
          status: Status.warning,
          visited: false,
        };
        self.messages.push(message as IMessageStore);
      },
      setMessageRead(id: string) {
        self.messages.forEach((m: IMessageStore) => {
          if (m.id === id) {
            m.markAsRead();
          }
        });
      },
      setMessageVisited(id: string) {
        self.messages.forEach((m: IMessageStore) => {
          if (m.id === id) {
            m.visited = true;
          }
        });
      },
      setMessagesRead() {
        self.messages.forEach((m: IMessageStore) => {
          m.markAsRead();
        });
      },
      setVisitedMessagesRead() {
        self.messages.forEach((m: IMessageStore) => {
          if (m.visited) {
            m.markAsRead();
          }
        });
      },
      setLoading(loading: boolean) {
        self.loading = loading;
      },
      startLoading() {
        self.loading = true;
      },
      stopLoading() {
        self.loading = false;
      },
      setTheme(theme: any) {
        that.theme = theme;
      },
      setThemeByName(themeName: string) {
        that.loading = true;
        that.themeName = themeName;
        loadTheme(themeName).then(loadedTheme => {
          that.setTheme(loadedTheme.default);
          console.log(loadedTheme.default);
          that.setLoading(false);
        });
      },
    };
  })
  .views(self => {
    const views = {
      get unreadMessages(): IMessageStore[] {
        return self.messages.slice().filter((m: IMessageStore) => m.read === false);
      },
      get activeThemeName() {
        return self.themeName;
      },
      get activeTheme() {
        return self.theme.global ? self.theme : undefined;
      },
    };
    return views;
  });

export default UIStore;
