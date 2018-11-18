export const loadTheme = async (themeName: string) => await import(`./${themeName}/index.ts`);
