import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { ILanguageStore } from '../../models/languageStore';
import { LanguageSelector } from './LanguageSelector';

export type ConnectedLanguageSelectorProps = {
  languageStore?: ILanguageStore;
};

@inject('languageStore')
@observer
class ConnectedLanguageSelector extends React.Component<ConnectedLanguageSelectorProps, any> {
  public render() {
    const { activeLanguage, enabledLanguages, setLanguageByCode } = this.props.languageStore!;
    return (
      <LanguageSelector
        languages={enabledLanguages}
        activeLanguage={activeLanguage}
        onLanguageChange={setLanguageByCode}
      />
    );
  }
}

export default ConnectedLanguageSelector;
