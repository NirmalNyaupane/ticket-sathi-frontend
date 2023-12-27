"use client";

import { Toaster } from "@/components/ui/toaster";
import { API_BASE_URL } from "@/constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const Provider = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient();
  axios.defaults.baseURL=API_BASE_URL;
  return (
    <QueryClientProvider client={queryClient}>
      <main>{children}</main>
      <Toaster/>
    </QueryClientProvider>
  );
};

export default Provider;
