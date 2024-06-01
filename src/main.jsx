import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import AuthProvaider from "./Contex/AuthProvaider";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvaider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvaider>
    </HelmetProvider>
  </React.StrictMode>
);
