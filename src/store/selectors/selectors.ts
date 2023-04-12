import { RootState } from "../store";

export const cartSelector = (state: RootState) => state.cart;
export const filterSelector = (state: RootState) => state.filter;
export const pizzaSelector = (state: RootState) => state.pizza;
