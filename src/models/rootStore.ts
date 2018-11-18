import { Instance, SnapshotOut, types } from 'mobx-state-tree';

import LanguageStore from './languageStore';
import UIStore from './uiStore';

export interface IRootStoreType extends SnapshotOut<typeof RootStore> {}
export interface IRootStore extends Instance<typeof RootStore> {}

export const RootStore = types
  .model('MainStores', {
    languageStore: types.optional(types.late(() => LanguageStore), {}),
    uiStore: types.optional(types.late(() => UIStore), {}),
  })
  .actions(self => {
    const that = self as IRootStore;
    return {
      addErrorMessage(message: string) {
        self.uiStore.addErrorMessage(message);
      },
      afterCreate() {
        console.log('Root Store created');
        // self.uiStore.setThemeByName('dark');
      },
      uiStartLoading: () => self.uiStore.startLoading(),
      uiStopLoading: () => self.uiStore.stopLoading(),
    };
  });

const store = RootStore.create(
  {},
  // {
  //   // dependencies injections
  // }
);

export default store;
