import { Instance, SnapshotOut, types } from 'mobx-state-tree';

import { loadCatalog } from '../i18n';

export interface ILanguageStoreType extends SnapshotOut<typeof LanguageStore> {}
export interface ILanguageStore extends Instance<typeof LanguageStore> {}
export interface ILanguage {
  lang: string;
  flag: string;
  code: string;
  text: string;
  dir: 'LTR' | 'RTL';
}

const LanguageStore = types
  .model('LanguageStore', {
    catalog: types.optional(types.frozen<any>(), {}),
    code: types.maybeNull(types.string),
    dir: types.maybeNull(types.string),
    flag: types.maybeNull(types.string),
    lang: types.optional(types.string, 'en'),
    loading: false,
    text: types.maybeNull(types.string),
  })
  .actions(self => {
    const that = self as ILanguageStore;
    return {
      setCatalog(catalog: any) {
        that.catalog = catalog;
      },
      setLanguage(language: ILanguage) {
        // TODO: Save language changes to the server.
        self.loading = true;
        self.lang = language.lang;
        self.flag = language.flag;
        self.code = language.code;
        self.text = language.text;
        self.dir = language.dir;

        loadCatalog(language.lang)
          .then((catalog: any) => {
            console.log(catalog);
            that.setCatalog(catalog);
            that.setLoading(false);
          })
          .catch(e => {
            console.log(e);
            that.setLoading(false);
          });
      },

      setLoading(value: boolean) {
        self.loading = value;
      },
    };
  })
  .views(self => ({
    //
  }));

export default LanguageStore;
