import { MenuSectionWrapper } from './MenuSections/MenuSectionContainer';
import { MenuSectionWrapperType } from './MenuSections/types';
import { NavigationBar } from './navigation/NavigationBar';

export const menus: MenuSectionWrapperType = {
  MenuSection: [
    {
      name: 'First',
      key: 'uno',
      sections: [
        {
          key: 'abbbbb',
          backgroundColor: 'magenta',
          children: <div>I&apos;m the very first section</div>,
          scrollDescriptionText: 'Scroll and enjoy',
        },
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
    {
      name: 'Third',
      key: 'tre',
      sections: [
        {
          key: 'bbii',
          backgroundColor: 'red',
          children: <div>I&apos;m the section 3-1</div>,
          scrollDescriptionText: 'Scroll and enjoy',
        },
        {
          key: 'cckk',
          backgroundColor: 'blue',
          children: <div>I&apos;m the section 3-2</div>,
          scrollDescriptionText: 'Scroll and enjoy',
        },
      ],
    },
    {
      name: 'Forth',
      key: 'four',
      sections: [
        {
          key: 'bbiiaa',
          backgroundColor: 'red',
          children: <div>I&apos;m the section 4-1</div>,
          scrollDescriptionText: 'Scroll and enjoy',
        },
        {
          key: 'cckkaa',
          backgroundColor: 'blue',
          children: <div>I&apos;m the section 4-2</div>,
          scrollDescriptionText: 'Scroll and enjoy',
        },
      ],
    },
  ],
};

export const Template = () => {
  return (
    <div id="landing" className="__landing">
      <header className="__app-header">
        <div>Logo</div>
        <NavigationBar sectionWrapper={menus} />
        <div>HambMenu</div>
      </header>
      <MenuSectionWrapper menuSectionWrapper={menus} />
    </div>
  );
};

export default Template;
