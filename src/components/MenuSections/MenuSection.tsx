import { CSSProperties, FC } from 'react';
import { SectionType } from './types';

export type MenuSectionProp = {
  section: SectionType;
};

export const MenuSection: FC<MenuSectionProp> = ({ section }) => {
  const {
    key,
    backgroundColor,
    backgroundImage,
    children,
    scrollDescriptionText,
  } = section;
  const style: CSSProperties = {
    backgroundImage,
    background: backgroundColor,
  };

  return (
    <div key={key} className="__menu-section" style={style}>
      {children}
      {scrollDescriptionText ? (
        <div className="__menu-section-scroll-description-text">
          {scrollDescriptionText}
        </div>
      ) : null}
    </div>
  );
};
