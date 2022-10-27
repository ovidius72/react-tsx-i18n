import { ReactNode } from 'react';

export type SectionType = {
  key: string;
  scrollDescriptionText?: string;
  children?: ReactNode;
  backgroundColor?: string;
  backgroundImage?: string;
};

export type MenuSectionWrapperType = {
  MenuSection: MenuSectionType[];
};

export type MenuSectionType = {
  sections: SectionType[];
  key: string;
  name: string;
};
