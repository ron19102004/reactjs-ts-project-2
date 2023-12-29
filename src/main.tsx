import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./_base.scss";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store/store.ts";
import { ChakraProvider } from "@chakra-ui/react";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <ChakraProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </ChakraProvider>
  </React.StrictMode>
);
