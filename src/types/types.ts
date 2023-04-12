export enum ISortPropertyEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
}

export interface ISort {
  name: string;
  sortProperty: ISortPropertyEnum;
}

export interface IPizza {
  id: string;
  title: string;
  price: number;
  types: number[];
  sizes: number[];
  category: number;
  rating: number;
  imageUrl: string;
}

export interface IPizzaCart {
  count: number;
  id: string;
  title: string;
  price: number;
  type: string;
  size: number;
  imageUrl: string;
}
