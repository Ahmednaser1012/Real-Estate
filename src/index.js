import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";
import { AnimatePresence } from "framer-motion";
import "./i18n/config"; // Import i18n configuration

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <AnimatePresence>
          <Suspense fallback={<div className="loading-placeholder">Loading...</div>}>
            <App />
          </Suspense>
        </AnimatePresence>
      </Provider>
    </Router>
  </React.StrictMode>
);