// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// --- Amplify setup ---
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

// --- Auth UI Provider (needed for useAuthenticator) ---
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Authenticator.Provider>
      <App />
    </Authenticator.Provider>
  </StrictMode>
);
