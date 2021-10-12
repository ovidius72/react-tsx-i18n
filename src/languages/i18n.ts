export const loadCatalog = async (language: string) => {
  return await import(
    /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
    `@lingui/loader!../../locale/${language}/messages.json`
  );
};
