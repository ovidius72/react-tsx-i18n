// import { I18nProvider } from '@lingui/react';
// import { ILanguageStore } from 'models/languageStore';
import { i18n } from '@lingui/core';
import { Plural, t, Trans } from '@lingui/macro';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components/macro';
import { layout, LayoutProps, space, SpaceProps } from 'styled-system';
import { useAppDispatch } from './app/hooks';
import { TestComponent } from './components/TestComponent';
import { languageActions } from './features/language/language.slice';
import { dynamicActivate, locales } from './i18n';

const GlobalStyle = createGlobalStyle`
  body {
    font-size: 1em;
    margin: 0;
    background-color: white;
    padding: 0;
    color: #404040;
    font-family: Roboto, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    border: 1px solid #e3e3e3;
  }
  * {
  box-sizing: border-box;
  }
`;

const Box = styled.div<LayoutProps & SpaceProps>`
  ${layout};
  ${space};
  box-sizing: border-box;
  background-color: green;
  padding: 1em;
`;
i18n.activate('en');
export const App = () => {
  console.log('in app');
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();

  const handleLanguageChange = async (lang: string) => {
    dispatch(languageActions.setCatalog(lang));
    await dynamicActivate(lang);
  };

  return (
    <div>
      <h2 style={{ backgroundColor: 'violet' }}>My React App</h2>
      <Link to="test">Test</Link>
      <div className="lang-container">
        {Object.values(locales).map((locale, index) => (
          <button
            type="button"
            onClick={async () =>
              await handleLanguageChange(Object.keys(locales)[index])
            }
            key={locale}
          >
            {locale}
          </button>
        ))}
      </div>
      <Box m={1} px={10} width={[1, 1 / 4, 1 / 2, 1]}>
        I am a box
      </Box>
      <button onClick={() => setCount(c => c + 1)}>
        <Trans>Increment</Trans>
      </button>
      <div>
        <Trans>App count</Trans> {count}
      </div>
      <TestComponent />
      <p>{t`Template literal string`}</p>
      <p>{t`lit string`}</p>
      <h2>Plural</h2>
      <Plural
        value={count}
        zero={'There are no books'}
        one={"There's one book"}
        other={'There are # books'}
      />
      <GlobalStyle />
    </div>
  );
};
