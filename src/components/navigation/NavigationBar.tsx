import { FC, useCallback, useMemo, useState } from 'react';
import { MenuSectionWrapperType } from '../MenuSections/types';
import './navigation.css';
import Scrollspy from 'react-scrollspy';

export type NavigationBarProps = {
  sectionWrapper: MenuSectionWrapperType;
};

const NavigationBar: FC<NavigationBarProps> = ({ sectionWrapper }) => {
  const [animating, setAnimating] = useState(false);
  const [currItem, setCurrItem] = useState('');
  console.log('*****: animating', animating);
  const sections = sectionWrapper.MenuSection.map(m => ({
    id: m.key,
    title: m.name,
  }));
  const ids = useMemo(() => sections.map(s => s.id), [sections]);
  console.log('*****: ids', ids);
  const handleClick = (id: string) => {
    console.log('started', id);
    setCurrItem(id);
    setAnimating(true);
  };
  const handleUpdate = useCallback(
    (item: HTMLElement) => {
      if (item && item.id && !currItem) {
        console.log('*****: item', item.id);
        setCurrItem(item.id);
      }
      setAnimating(false);
    },
    [currItem],
  );
  return (
    <nav className="__navigation-container nav__container__actions">
      <Scrollspy
        className="__navigation-list"
        onUpdate={handleUpdate}
        scrolledPastClassName="past"
        items={ids}
        rootEl="#landing"
        currentClassName="active"
      >
        {sections.map(s => (
          <li
            className={`__navigation-item ${
              currItem === s.id ? 'current' : ''
            }`}
            key={s.id}
          >
            <a
              href={`#${s.id}`}
              onClick={() => handleClick(s.id)}
              data-menu-item={s.id}
            >
              {s.title}
            </a>
          </li>
        ))}
      </Scrollspy>
    </nav>
  );
};

export { NavigationBar };
