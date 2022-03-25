import { NextPage } from "next";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import translationsJSON from "./../data/translations.json";

export enum LANGUAGES {
  EN = "en",
  ES = "es",
}

export enum THEMES {
  Dark = "dark",
  Light = "light",
}

interface Translations {
  en: string;
  es: string;
}

interface IAppContext {
  appState: {
    language: LANGUAGES;
    translations: { [key: string]: Translations };
    theme: THEMES;
  };
  setAppState: Dispatch<
    SetStateAction<{ language: LANGUAGES; translations: {}; theme: THEMES }>
  >;
}

const AppContext = createContext<IAppContext>({
  appState: { language: LANGUAGES.EN, translations: {}, theme: THEMES.Dark },
  setAppState: () => {},
});

export const AppProvider: NextPage = ({ children }) => {
  const [appState, setAppState] = useState({
    language: LANGUAGES.EN,
    translations: {},
    theme: THEMES.Dark,
  });

  useEffect(() => {
    setAppState((pState) => ({
      ...pState,
      translations: Object.keys(translationsJSON).reduce<{
        [key: string]: string;
      }>((prev, curr: string) => {
        const newTranslations = { ...prev };
        newTranslations[curr] =
          translationsJSON[curr as keyof typeof translationsJSON][
            pState.language as keyof Translations
          ];

        return newTranslations;
      }, {}),
    }));
  }, [appState.language]);

  useEffect(() => {
    if (appState.theme === THEMES.Dark)
      document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [appState.theme]);

  const values = useMemo(() => ({ appState, setAppState }), [appState]);

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export function useAppContext() {
  return useContext(AppContext);
}
