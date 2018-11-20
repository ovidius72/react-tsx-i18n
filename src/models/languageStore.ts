import { Instance, SnapshotOut, types } from 'mobx-state-tree';

import { enabledLanguages } from '../languages/enabledLanguages';
import { loadCatalog } from '../languages/i18n';

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
    catalog: types.optional(types.frozen(), {}),
    enabled: types.optional(types.array(types.frozen<ILanguage>()), enabledLanguages),
    language: types.optional(types.frozen<ILanguage>(), enabledLanguages[0]),
    loading: false,
  })
  .actions(self => {
    const that = self as ILanguageStore;
    return {
      setCatalog(catalog: any) {
        that.catalog = catalog;
      },
      setLanguageByCode(code: string) {
        const language = enabledLanguages.find(l => l.code === code);
        if (language) {
          that.loadCatalog(language);
        }
      },
      setLanguage(language: ILanguage) {
        that.language = language;
      },
      loadCatalog(language: ILanguage) {
        that.setLoading(true);
        loadCatalog(language.lang)
          .then((catalog: any) => {
            that.setLanguage(language);
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
    get enabledLanguages() {
      return self.enabled;
    },
    get activeLanguage() {
      return self.language;
    },
  }));

export default LanguageStore;
