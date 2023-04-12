import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { IPizza, IPizzaCart, ISort } from "../../types/types";
import { getCartFromLocalStorage } from "../../utils/getCartFromLocalStorage";
import { calcTotalPrice, calTotalCount } from "../../utils/calcTotalPrice";

interface initialStateProps {
  totalPrice: number;
  items: IPizzaCart[];
  totalCount: number;
}

const { items, totalCount, totalPrice } = getCartFromLocalStorage();

const initialState: initialStateProps = {
  items,
  totalPrice,
  totalCount,
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<any>) => {
      // const findItem = state.items.find(
      //   (item) => item.id === action.payload?.id,
      // );
      // console.log("action payload:", action.payload);

      const findItem = state.items.find((item) => {
        return (
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size
        );
      });
      // console.log("findItem: ", findItem);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push(action.payload);
      }
      state.totalCount = calTotalCount(state.items);
      state.totalPrice = calcTotalPrice(state.items);

      console.log(current(state));
    },
    removeProduct: (state, action: PayloadAction<IPizzaCart>) => {
      const newItems = state.items.filter((item) => {
        return (
          item.id === action.payload.id &&
          (item.type !== action.payload.type ||
            item.size !== action.payload.size)
        );
      });
      state.items = newItems;
      state.totalCount = state.items.reduce((sum, item) => item.count + sum, 0);
      state.totalPrice = state.items.reduce(
        (sum, item) => item.price * item.count + sum,
        0
      );
    },
    clearProduct: (state) => {
      state.items = [];
      state.totalCount = state.items.reduce((sum, item) => item.count + sum, 0);
      state.totalPrice = state.items.reduce(
        (sum, item) => item.price * item.count + sum,
        0
      );
    },

    removeItem: (state, action: PayloadAction<IPizzaCart>) => {
      const findItem = state.items.find((item) => {
        return (
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size
        );
      });

      if (findItem) {
        findItem.count--;
        state.totalCount--;
        state.totalPrice = state.items.reduce(
          (sum, item) => item.price * item.count + sum,
          0
        );
      }
    },
  },
});

export default cartReducer.reducer;
export const { addProduct, removeProduct, clearProduct, removeItem } =
  cartReducer.actions;
