import { IPizzaCart } from "../types/types";

export const calcTotalPrice = (items: IPizzaCart[]) => {
  return items.reduce((sum, item) => item.price * item.count + sum, 0);
};

export const calTotalCount = (items: IPizzaCart[]) => {
  return items.reduce((sum, item) => item.count + sum, 0);
};
