import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Toaster } from 'sonner';
import App from "./App.tsx";
import "./index.css";

// 确保在所有环境中都能正确挂载应用
const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <StrictMode>
      <HashRouter>
        <App />
        <Toaster />
      </HashRouter>
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}
