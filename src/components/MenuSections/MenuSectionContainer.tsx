import { FC } from 'react';
import { MenuSectionsList } from './MenuSectionsList';
import { MenuSectionWrapperType } from './types';

export type MenuSectionContainerProp = {
  menuSectionWrapper: MenuSectionWrapperType;
};

export const MenuSectionWrapper: FC<MenuSectionContainerProp> = ({
  menuSectionWrapper,
}) => {
  const menuSections = menuSectionWrapper.MenuSection;
  return (
    <div id="__scroll_container_id" className="__menu-sections-container">
      {menuSections.map(s => (
        <div
          id={s.key}
          data-name={s.key}
          key={s.key}
          className="__menu-section-component"
        >
          <MenuSectionsList sections={s.sections} key={s.key} />
        </div>
      ))}
    </div>
  );
};
