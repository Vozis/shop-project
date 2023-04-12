import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISort, ISortPropertyEnum } from "../../types/types";

interface initialStateProps {
  categoryId: number;
  currentSort: ISort;
  currentPage: number;
  searchValue: string;
}

const initialState: initialStateProps = {
  categoryId: 0,
  currentSort: {
    name: "популярности по убыванию",
    sortProperty: ISortPropertyEnum.RATING_ASC,
  },
  currentPage: 1,
  searchValue: "",
};

const filterReducer = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCurrentSort: (state, action: PayloadAction<ISort>) => {
      state.currentSort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    /*setFilters: (state, action: PayloadAction<initialStateProps>) => {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.currentSort = action.payload.currentSort;
        state.categoryId = Number(action.payload.categoryId);
      } else {
        state.currentPage = 1;
        state.currentSort = {
          name: "популярности",
          sort: "rating",
        };
        state.categoryId = 0;
      }
    },*/
    setFilters: (state, action: PayloadAction<any>) => {
      state.currentPage = Number(action.payload.currentPage);
      state.currentSort = action.payload.currentSort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});
export default filterReducer.reducer;
export const {
  setCategoryId,
  setCurrentSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterReducer.actions;
