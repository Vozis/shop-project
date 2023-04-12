import { calcTotalPrice, calTotalCount } from "./calcTotalPrice";
import { IPizzaCart } from "../types/types";

export const getCartFromLocalStorage = () => {
  const data = localStorage.getItem("cart");
  const items = data ? (JSON.parse(data) as IPizzaCart[]) : [];
  const totalPrice = calcTotalPrice(items);
  const totalCount = calTotalCount(items);

  return {
    items,
    totalCount,
    totalPrice,
  };
};
