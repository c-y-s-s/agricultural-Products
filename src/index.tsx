import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./reducers";
import { ThemeProvider } from "styled-components";
import { ResetStyle, GlobalStyle } from "./style/GlobalStyle";

import theme from "./style/theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ResetStyle />
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </Provider>
);

reportWebVitals();
