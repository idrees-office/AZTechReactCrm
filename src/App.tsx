// Import Dependencies
import { RouterProvider } from "react-router";
// Local Imports
// import { AuthProvider } from "@/app/contexts/auth/Provider";
import { BreakpointProvider } from "@/app/contexts/breakpoint/Provider";
import { LocaleProvider } from "@/app/contexts/locale/Provider";
import { SidebarProvider } from "@/app/contexts/sidebar/Provider";
import { ThemeProvider } from "@/app/contexts/theme/Provider";
import router from "./app/router/router";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    // <AuthProvider>
      <Provider store={store}>
      <ThemeProvider>
        <LocaleProvider>
          <BreakpointProvider>
            <SidebarProvider>
              <RouterProvider router={router} />
            </SidebarProvider>
          </BreakpointProvider>
        </LocaleProvider>
      </ThemeProvider>
      </Provider>
    // </AuthProvider>
  );
}

export default App;
