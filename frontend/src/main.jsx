import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContextProvider.jsx";
import { RoomsProvider } from "./context/RoomsContextProvider.jsx";
import { UsersProvider } from "./context/UsersContextProvider.jsx";
import { BookingsProvider } from "./context/BookingsContextProvider.jsx";
import "./index.css";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (import.meta.env.NODE_ENV === "production") disableReactDevTools;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
      refetchOnWindowFocus: false, // Prevent unnecessary API calls
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <BrowserRouter>
          <RoomsProvider>
            <UsersProvider>
              <BookingsProvider>
                <App />
              </BookingsProvider>
            </UsersProvider>
          </RoomsProvider>
        </BrowserRouter>
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
