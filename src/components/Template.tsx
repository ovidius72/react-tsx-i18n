import { FC, ReactNode } from 'react';
import { CSSProperties } from 'styled-components';

type SectionType = {
  key: string;
  scrollDescriptionText?: string;
  children?: ReactNode;
  backgroundColor?: string;
  backgroundImage?: string;
};

type MenuSectionType = {
  sections: SectionType[];
  key: string;
  name: string;
};

type MenuSectionWrapperType = {
  MenuSection: MenuSectionType[];
};

export const menus: MenuSectionWrapperType = {
  MenuSection: [
    {
      name: 'First',
      key: 'uno',
      sections: [
        {
          key: 'aa',
          backgroundColor: 'green',
          children: <div>I&apos;m the section 1-1</div>,
          scrollDescriptionText: 'Scroll and enjoy',
        },
        {
          key: 'aaa',
          backgroundColor: 'violet',
          children: <div>I&apos;m the section 1-2</div>,
          scrollDescriptionText: 'Scroll and enjoy',
        },
      ],
    },
    {
      name: 'Second',
      key: 'due',
      sections: [
        {
          key: 'bb',
          backgroundColor: 'red',
          children: <div>I&apos;m the section 2-1</div>,
          scrollDescriptionText: 'Scroll and enjoy',
        },
        {
          key: 'cc',
          backgroundColor: 'blue',
          children: <div>I&apos;m the section 2-2</div>,
          scrollDescriptionText: 'Scroll and enjoy',
        },
      ],
    },
  ],
};

export const getNavigationFromMenuSection = (
  menuSections: MenuSectionWrapperType,
) => {
  return menuSections.MenuSection.reduce((acc, curr) => {
    return [...acc, curr.name];
  }, []);
};

type MenuSectionContainerProp = {
  menuSectionWrapper: MenuSectionWrapperType;
};

type MenuSectionComponentProp = {
  sections: SectionType[];
};

type MenuSectionProp = {
  section: SectionType;
};

const MenuSection: FC<MenuSectionProp> = ({ section }) => {
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

const MenuSectionsComponent: FC<MenuSectionComponentProp> = ({ sections }) => {
  return (
    <>
      {sections.map(s => (
        <div key={s.key} className="__menu-section-wrapper">
          <MenuSection section={s} key={s.key} />
        </div>
      ))}
    </>
  );
};

const MenuSectionWrapper: FC<MenuSectionContainerProp> = ({
  menuSectionWrapper,
}) => {
  const menuSections = menuSectionWrapper.MenuSection;
  return (
    <div className="__menu-sections-container">
      {menuSections.map(s => (
        <div key={s.key} className="__menu-section-component">
          <MenuSectionsComponent sections={s.sections} key={s.key} />
        </div>
      ))}
    </div>
  );
};

export const Template = () => {
  return <MenuSectionWrapper menuSectionWrapper={menus} />;
  // return (
  //   <section className="scrollable-wrapper">
  //     <div className="section-item">Section 1</div>
  //     <div className="section-item">Section 2</div>
  //     <div className="section-item">Section 3</div>
  //     <div className="section-item">Section 4</div>
  //     <div className="section-item">Section 5</div>
  //     <div className="section-item">Section 6</div>
  //   </section>
  // );
};

export default Template;
