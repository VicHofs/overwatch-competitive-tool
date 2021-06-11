import React, { ChangeEvent, ReactNode, useState } from 'react'

import { IntlProvider } from 'react-intl'
import BrazilianPortuguese from 'languages/pt-BR.json'
import AmericanEnglish from 'languages/en-US.json'

import { ThemeProvider } from 'styled-components'
import GlobalStyles from 'styles/global'
import defaultTheme from 'styles/themes/default'
import darkTheme from 'styles/themes/dark'

interface DataWrapperProps {
  children?: ReactNode
}

export const Context = React.createContext({
  locale: 'en-US',
  selectLang: (e: ChangeEvent<HTMLInputElement>) =>
    console.error(
      'Error handling event: no function passed to DataWrapper Context',
    ),
})

const navLang = navigator.language

const DataWrapper: React.FC<DataWrapperProps> = ({ children }) => {
  const [locale, setLocale] = useState(navLang)
  const [lang, setLang] = useState(
    navLang === 'en-US' ? AmericanEnglish : BrazilianPortuguese,
  )

  const selectLang = (e: ChangeEvent<HTMLInputElement>) => {
    const newLocale = e.target.value
    setLocale(newLocale)
    if (newLocale === 'en-US') setLang(AmericanEnglish)
    else setLang(BrazilianPortuguese)
  }

  return (
    <Context.Provider value={{ locale, selectLang }}>
      <ThemeProvider theme={defaultTheme}>
        <IntlProvider locale={locale} defaultLocale="en-US" messages={lang}>
          {children}
        </IntlProvider>
        <GlobalStyles />
      </ThemeProvider>
    </Context.Provider>
  )
}

export default DataWrapper
