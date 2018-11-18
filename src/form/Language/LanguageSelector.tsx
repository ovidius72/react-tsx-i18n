import { Trans } from '@lingui/react';
import React from 'react';
import styled from 'styled-components/macro';

export type LanguageSelectorProps = {
  languages: string[];
  onLanguageChange: (language: string) => void;
};

const LanguageSelect = styled.select`margin: 0;`;
const Label = styled.label`
  color: '#808080';
  margin-right: 10px;
`;

export function LanguageSelector(props: LanguageSelectorProps) {
  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault();
    props.onLanguageChange(e.currentTarget.value);
  };
  return (
    <div className="language-selector-wrapper">
      <Label htmlFor="language-selector">
        <Trans>Language</Trans>
      </Label>
      <LanguageSelect id="language-selector" onChange={handleChange}>
        {props.languages.map(l => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </LanguageSelect>
    </div>
  );
}
