import { i18nMark } from '@lingui/core';
import { Trans } from '@lingui/macro';
import React from 'react';
import ContentLayout from 'src/layout/Content/ContentLayout';

export default () => (
  <ContentLayout
    title={i18nMark('Internationalization')}
    render={({ uiStore, i18n }) => {
      console.log('i18n', i18n);
      return (
        <div>
          <p>{i18n!.t`Language page.`}</p>
          <button onClick={() => uiStore!.addSuccessMessage(i18nMark('Test message'))}>
            <Trans>Add a message</Trans>
          </button>
        </div>
      );
    }}
  />
);
