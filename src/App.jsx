import { Provider } from "react-redux";
import "./App.css";
import Router from "./Router/Router";
import store from "./Store/store"
import { ThemeProvider } from "./contexts/theme";
import { useState } from "react";
import { LangProvider } from "./contexts/language";

function App() {
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("en");
  return (
    <>
      <Provider store={store}>
        <ThemeProvider value={{ theme, setTheme }}>

          <LangProvider value={{ lang, setLang }}> <Router /></LangProvider>

        </ThemeProvider>

      </Provider>

    </>
  );
}

export default App;
