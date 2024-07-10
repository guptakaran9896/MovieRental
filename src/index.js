import React from "react"
import ReactDOM from "react-dom/client";
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { UserProvider } from "./store/context/userContext";
import { DialogProvider } from "./store/context/DialogContext";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
      <CookiesProvider>
      <UserProvider>
          <DialogProvider>
            <App />
          </DialogProvider>
      </UserProvider>
      </CookiesProvider>
    </BrowserRouter>
)

