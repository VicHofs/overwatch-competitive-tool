import React, {
  ChangeEvent,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import { IntlProvider, MessageFormatElement } from 'react-intl';
import BrazilianPortuguese from 'languages/pt-BR.json';
import AmericanEnglish from 'languages/en-US.json';
import Japanese from 'languages/ja-JP.json';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/global';
import defaultTheme from 'styles/themes/default';
import darkTheme from 'styles/themes/dark';
import { getCookies } from 'helpers/cookies';
import { Toaster } from 'react-hot-toast';

interface DataWrapperProps {
  children: ReactNode;
}

export const Context = React.createContext({
  locale: 'en-US',
  selectLang: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
    console.error(
      'Error handling selectLang event: no function passed to DataWrapper Context',
    ),
  currTheme: defaultTheme,
  selectTheme: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
    console.error(
      'Error handling selectLang event: no function passed to DataWrapper Context',
    ),
  languages: {
    'en-US': { name: 'English (US)', data: AmericanEnglish },
    'pt-BR': { name: 'Português (BR)', data: BrazilianPortuguese },
    'ja-JP': { name: '日本語', data: Japanese },
  } as Record<
    string,
    {
      name: string;
      data:
        | Record<string, string>
        | Record<string, MessageFormatElement[]>
        | undefined;
    }
  >,
});

const languages: Record<
  string,
  {
    name: string;
    data:
      | Record<string, string>
      | Record<string, MessageFormatElement[]>
      | undefined;
  }
> = {
  'en-US': { name: 'English (US)', data: AmericanEnglish },
  'pt-BR': { name: 'Português (BR)', data: BrazilianPortuguese },
  'ja-JP': { name: '日本語', data: Japanese },
};

const navLang = navigator.language;

const DataWrapper: React.FC<DataWrapperProps> = ({ children }) => {
  const [locale, setLocale] = useState(navLang === 'en' ? 'en-US' : navLang);
  const [lang, setLang] = useState(
    locale ? languages[locale].data : AmericanEnglish,
  );

  const [currTheme, setCurrTheme] = useState(
    window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? darkTheme
      : defaultTheme,
  );

  useLayoutEffect(() => {
    const cookies = getCookies();
    if (cookies['prefers-theme'])
      setCurrTheme(
        cookies['prefers-theme'] === 'dark' ? darkTheme : defaultTheme,
      );
    if (cookies['prefers-language']) {
      setLocale(cookies['prefers-language']);
      setLang(
        Object.keys(languages).includes(cookies['prefers-language'])
          ? languages[cookies['prefers-language']].data
          : AmericanEnglish,
      );
    }
  }, []);

  const selectLang = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const newLocale = e.target.value;
    setLocale(newLocale);
    if (Object.keys(languages).includes(newLocale))
      setLang(languages[newLocale].data);
  };

  const selectTheme = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    if (e.target.value === 'light') setCurrTheme(defaultTheme);
    else setCurrTheme(darkTheme);
  };

  return (
    <Context.Provider
      value={{ locale, selectLang, currTheme, selectTheme, languages }}
    >
      <ThemeProvider theme={currTheme}>
        <IntlProvider locale={locale} defaultLocale="en-US" messages={lang}>
          <Toaster
            toastOptions={{
              position: 'bottom-center',
              style: {
                userSelect: 'none',
                backgroundColor: currTheme.colors.primarySoft,
                color: currTheme.colors.contrastSoft,
              },
            }}
          />
          {children}
        </IntlProvider>
        <GlobalStyles />
      </ThemeProvider>
    </Context.Provider>
  );
};

export default DataWrapper;
