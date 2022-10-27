import { MenuSectionWrapperType } from './types';

export const getNavigationFromMenuSection = (
  menuSectionWrapper: MenuSectionWrapperType,
) => {
  return menuSectionWrapper.MenuSection.reduce((acc, curr) => {
    return [...acc, curr.name];
  }, []);
};
