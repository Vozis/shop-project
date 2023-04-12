import React from "react";

import "./scss/app.scss";

import { Outlet, RouterProvider } from "react-router-dom";
import { router } from "./router/router";

/*export type AppContextInterface = {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
};

export const AppContext = createContext<AppContextInterface>({
  searchValue: "",
  setSearchValue: () => {},
});*/

function App() {
  return <RouterProvider router={router} />;
}

export default App;
