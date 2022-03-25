import { FunctionComponent } from "react";
import { LANGUAGES, THEMES, useAppContext } from "../context";
import Translation from "./Tranlation";

const FrameBorder: FunctionComponent = ({ children }) => {
  const { appState, setAppState } = useAppContext();
  const { language, theme } = appState;

  const toogleLanguage = () => {
    setAppState((pState) => ({
      ...pState,
      language: pState.language === LANGUAGES.EN ? LANGUAGES.ES : LANGUAGES.EN,
    }));
  };
  const toogleTheme = () => {
    setAppState((pState) => ({
      ...pState,
      theme: pState.theme === THEMES.Dark ? THEMES.Light : THEMES.Dark,
    }));
  };

  return (
    <div className="py-2 px-5 flex flex-col w-screen h-screen text-p-gray dark:text-p-white">
      <div className="flex justify-between">
        <a className="font-extralight text-base" href="#HomePage">
          Brageanth David Palencia Avila
        </a>
        <a
          href="mailto:brageanth@gmail.com"
          className="dark:text-p-green text-p-black animate-pulse"
        >
          /
          <Translation text="available_now" hover={true} />/
        </a>
        {/**
        <div className="space-x-4">
          <a className="font-extralight text-base">
            <Translation text="projects" hover={true} />
          </a>
          <a className="font-extralight text-base">
            <Translation text="about" hover={true} />
          </a>
          <a className="font-extralight text-base">
            <Translation text="contact" hover={true} />
          </a>
	</div>*/}
      </div>
      <div className="border dark:border-p-white border-p-gray flex-1 my-1 flex flex-col">
        {children}
      </div>
      <div className="flex space-x-4">
        <button className="font-extralight text-base" onClick={toogleLanguage}>
          <Translation text={language === "en" ? "ES" : "EN"} hover={true} />
        </button>
        <button className="font-extralight text-base" onClick={toogleTheme}>
          <Translation
            text={theme === "dark" ? "light" : "dark"}
            hover={true}
          />
        </button>
      </div>
    </div>
  );
};

export default FrameBorder;
