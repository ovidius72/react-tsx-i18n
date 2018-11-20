import { Trans } from '@lingui/macro';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components/macro';

import { ILanguage } from '../../models/languageStore';

export type LanguageSelectorProps = {
  languages: ILanguage[];
  activeLanguage: ILanguage;
  onLanguageChange: (languageCode: string) => void;
};

const LanguageSelect = styled.select`margin: 0;`;
const Label = styled.label`
  color: '#808080';
  margin-right: 10px;
`;

export const LanguageSelector: React.SFC<
  LanguageSelectorProps
> = observer(({ activeLanguage, languages, onLanguageChange }: LanguageSelectorProps) => {
  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault();
    onLanguageChange(e.currentTarget.value);
  };
  return (
    <div className="language-selector-wrapper">
      <Label htmlFor="language-selector">
        <Trans>Language</Trans>
      </Label>
      <LanguageSelect id="language-selector" value={activeLanguage.code} onChange={handleChange}>
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.text}
          </option>
        ))}
      </LanguageSelect>
    </div>
  );
});
