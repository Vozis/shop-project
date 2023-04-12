import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartReducer from "./slices/CartReducer";
import pizzaReducer from "./slices/PizzaReducer";
import { getPizzasApi } from "../api/Pizzas";

const api = {
  getPizzasApi,
};

const rootReducer = combineReducers({
  filter: filterReducer,
  cart: cartReducer,
  pizza: pizzaReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
