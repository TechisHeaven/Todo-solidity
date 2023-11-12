import React, { ReactNode, useReducer } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import {
  DispatchContext,
  StateContext,
  initialTodoContractState,
  initialTodoState,
  initialUserState,
  rootReducer,
} from "./state.ts";

interface AppProviderProps {
  children: ReactNode;
}
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, {
    todo: initialTodoState,
    user: initialUserState,
    TodoContract: initialTodoContractState,
  });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme accentColor="iris">
      <AppProvider>
        <App />
      </AppProvider>
    </Theme>
  </React.StrictMode>
);
