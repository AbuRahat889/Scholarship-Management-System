import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import AuthProvaider from "./Contex/AuthProvaider";
import { HelmetProvider } from "react-helmet-async";
//tenStack Qurey
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvaider>
          <RouterProvider router={router}></RouterProvider>
        </AuthProvaider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
