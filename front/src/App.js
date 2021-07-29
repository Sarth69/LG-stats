import { QueryClient, QueryClientProvider } from "react-query";

import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import Router from "./routes/Router";
import { ThemeProvider } from "@material-ui/core/styles";
import dotenv from "dotenv";
import theme from "./themes/custom";
import { ErrorProvider } from "./contexts/Error";

dotenv.config();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // 1 minute
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ErrorProvider>
          <CssBaseline />
          <Router />
        </ErrorProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
