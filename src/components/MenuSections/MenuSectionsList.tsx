import { FC } from 'react';
import { MenuSection } from './MenuSection';
import { SectionType } from './types';

export type MenuSectionsListProp = {
  sections: SectionType[];
};

export const MenuSectionsList: FC<MenuSectionsListProp> = ({ sections }) => {
  return (
    <>
      {sections.map(s => (
        <MenuSection section={s} key={s.key} />
      ))}
    </>
  );
};
