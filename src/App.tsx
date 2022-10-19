/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18n } from '@lingui/core';
import { Plural, t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { log } from 'console';
import { usePostSlice } from 'features/posts/usePostSlice';
import Logo from 'images/Logo.png';
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components/macro';
import {
  border,
  BorderProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from 'styled-system';
import { languageActions } from './features/language/language.slice';
import { dynamicActivate, getStoredLanguage, locales } from './i18n';
import { useAppDispatch } from './store';

const GlobalStyle = createGlobalStyle`
  body {
    font-size: 1em;
    margin: 0;
    background-color: white;
    padding: 0.5em;
    color: #404040;
    font-family: Roboto, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
  }
  * {
  box-sizing: border-box;
  }
`;

const FakeComponent = () => {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(true);

  const handleClick = () => {
    // skip automatic batch.
    flushSync(() => {
      setCount(c => c + 1);
    });
    flushSync(() => {
      setFlag(f => !f);
    });
  };

  return (
    <div>
      This is a fake component: {count}
      <div>Flag value: {String(flag)}</div>
      <button onClick={handleClick}>Incrementa</button>
    </div>
  );
};

const Box = styled.div<LayoutProps & SpaceProps & ColorProps & BorderProps>`
  box-sizing: border-box;
  border-radius: 4px;
  border-color: palevioletred;
  border-style: dashed;
  border-width: 2;
  padding: 1em;
  ${border};
  ${layout};
  ${color};
  ${space};
`;

i18n.activate(getStoredLanguage());

export const App = () => {
  const [count, setCount] = useState(9);
  const { i18n } = useLingui();
  const dispatch = useAppDispatch();
  const { fetchAll /*, data, loading */ } = usePostSlice();
  const [isVisible, setIsVisible] = useState(false);

  const handleLanguageChange = async (lang: string) => {
    dispatch(languageActions.setCatalog(lang));
    await dynamicActivate(lang);
  };

  useEffect(() => {
    console.log('in useEffect: APP');
    fetchAll();
  }, [fetchAll]);

  return (
    <div>
      <h2 style={{ backgroundColor: 'violet' }}>Multilanguage React App</h2>
      <Box bg="paleturquoise">
        <img width={260} src={Logo} style={{ display: 'block' }} />
      </Box>
      <div>
        <Link style={{ margin: '12px 0', display: 'inline-block' }} to="test">
          Go to Test
        </Link>
      </div>
      <div>
        <Link style={{ margin: '12px 0', display: 'inline-block' }} to="form">
          Goto Form
        </Link>
      </div>
      <div>
        <Link style={{ margin: '12px 0', display: 'inline-block' }} to="fetch">
          Goto FetchComponent
        </Link>
      </div>
      <div className="language-container">
        <div>Current Language: {i18n.locale}</div>
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
      <Box my={3} px={10} width={[1, 1 / 8, 1 / 2, 1 / 1]} borderStyle="ridge">
        Inside a BOX
      </Box>
      <button onClick={() => setCount(c => c + 1)}>
        <Trans>Increment</Trans>
      </button>
      <button onClick={() => setCount(c => c - 1)}>
        <Trans>Decrement</Trans>
      </button>
      <button onClick={() => setIsVisible(c => !c)}>
        <Trans>Toggle FakeComponent</Trans>
      </button>
      <div>Test</div>
      <div>
        <Trans>Here is the App counting: </Trans> {count}
      </div>
      <div>
        <Trans>Today is Monday</Trans>
      </div>
      {isVisible && <FakeComponent />}
      <p>{t`Template literal string`}</p>
      <p>{t`lit string`}</p>
      <h2>Plural</h2>
      <div>
        <Trans>Today is Monday</Trans>
      </div>
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
