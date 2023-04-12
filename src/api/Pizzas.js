import { request } from "./request";

export const getPizzasApi = (currentPage, category, sortBy, order, search) => {
  return request.get(
    `/pizzas?page=${currentPage}&limit=4&${category}&sort=${sortBy}&order=${order}&${search}`
  );
};
