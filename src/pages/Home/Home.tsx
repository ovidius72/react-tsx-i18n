import { Trans } from '@lingui/macro';
import { i18nMark } from '@lingui/react';
import React from 'react';
import ContentLayout from 'src/layout/Content/ContentLayout';

export default () => (
  <ContentLayout title={i18nMark('Home Page')} render={() => <Trans>This is the home page</Trans>} />
);
