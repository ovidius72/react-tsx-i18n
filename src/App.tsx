import { i18n } from '@lingui/core';
import { Plural, t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components/macro';
import { layout, LayoutProps, space, SpaceProps } from 'styled-system';
import { languageActions } from './features/language/language.slice';
import { dynamicActivate, getStoredLanguage, locales } from './i18n';
import { useAppDispatch } from './store';
import Logo from 'images/Logo.png';

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

i18n.activate(getStoredLanguage());

export const App = () => {
  const [count, setCount] = useState(0);
  const { i18n } = useLingui();
  const dispatch = useAppDispatch();
  const handleLanguageChange = async (lang: string) => {
    dispatch(languageActions.setCatalog(lang));
    await dynamicActivate(lang);
  };

  return (
    <div>
      <h2 style={{ backgroundColor: 'violet' }}>My React App</h2>
      <Link to="test">Go to Test</Link>
      <img width={260} src={Logo} />
      <div className="lang-container">
        <div>Current Lang: {i18n.locale}</div>
        {Object.values(locales).map((locale, index) => (
          <button
            type="button"
            onClick={async () =>
              await handleLanguageChange(Object.keys(locales)[index] || 'en')
            }
            key={locale}
          >
            {locale}
          </button>
        ))}
      </div>
      <Box m={1} px={10} width={[1, 1 / 4, 1 / 2, 1]}>
        Inside a BOX
      </Box>
      <button onClick={() => setCount(c => c + 1)}>
        <Trans>Increment</Trans>
      </button>
      <div>Test</div>
      <div>
        <Trans>App counting: </Trans> {count}
      </div>
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
export default App;
