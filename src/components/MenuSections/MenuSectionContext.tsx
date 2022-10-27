import { createContext } from 'react';
import { MenuSectionWrapperType } from './types';

type MenuSectionContextType = {
  menuSectionWrapper: MenuSectionWrapperType;
};
const menuSectionContect = createContext<MenuSectionContextType>({
  menuSectionWrapper: { MenuSection: [] },
});

const MenuSectionContext = () => {
  // Cache selectors
  // var topMenu = $('#top-menu'),
  //   topMenuHeight = topMenu.outerHeight() + 15,
  //   // All list items
  //   menuItems = topMenu.find('a'),
  //   // Anchors corresponding to menu items
  //   scrollItems = menuItems.map(function () {
  //     var item = $($(this).attr('href'));
  //     if (item.length) {
  //       return item;
  //     }
  //   });
  // const onScroll = (e: Event) => {
  //   const el = e.target as Element;
  //   if (el) {
  //     const fromTop = el.scrollTop;
  //     // const cur = items.find(i => i.
  //   }
  // };
  // useEffect(() => {
  //   document.addEventListener('scroll', onScroll);
  //   return () => {
  //     document.removeEventListener('scrol', onScroll);
  //   };
  // }, []);
  // // Bind to scroll
  // $(window).scroll(function () {
  //   // Get container scroll position
  //   var fromTop = $(this).scrollTop() + topMenuHeight;
  //   // Get id of current scroll item
  //   var cur = scrollItems.map(function () {
  //     if ($(this).offset().top < fromTop) return this;
  //   });
  //   // Get the id of the current element
  //   cur = cur[cur.length - 1];
  //   var id = cur && cur.length ? cur[0].id : '';
  //   // Set/remove active class
  //   menuItems
  //     .parent()
  //     .removeClass('active')
  //     .end()
  //     .filter("[href='#" + id + "']")
  //     .parent()
  //     .addClass('active');
  // });
};
