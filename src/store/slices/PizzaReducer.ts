import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPizza } from "../../types/types";

interface initialStateProps {
  pizzas: IPizza[];
  pending: boolean;
  error: boolean;
}

interface MyKnownError {
  errorMessage: string;
}

const initialState: initialStateProps = {
  pizzas: [],
  pending: false,
  error: false,
};

export interface ParamsAttributes {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  currentPage: number;
}

export const fetchPizzas = createAsyncThunk<
  IPizza[],
  ParamsAttributes,
  {
    extra: {
      getPizzasApi: any;
    };
  }
>("pizza/fetchPizzas", async (params, thunkAPI) => {
  const { order, sortBy, category, search, currentPage } = params;

  try {
    const { data } = await thunkAPI.extra.getPizzasApi(
      currentPage,
      search,
      category,
      sortBy,
      order
    );
    console.log(data);
    return data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue("error");
  }
});

const pizzaReducer = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizzas: (state, action: PayloadAction<IPizza[]>) => {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.pending = true;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pending = false;
      state.pizzas = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
    });
  },
  /*extraReducers: {
    [fetchPizzas.pending.type]: (state, action) => {
      state.pending = true;
      // console.log("Идет запрос");
    },
    [fetchPizzas.fulfilled.type]: (state, action) => {
      state.pending = false;
      state.pizzas = action.payload;
      // console.log("Идет успешно выполнен");
    },
    [fetchPizzas.rejected.type]: (state, action) => {
      state.pending = false;
      state.error = true;
    },
  },*/
});

export default pizzaReducer.reducer;
export const { setPizzas } = pizzaReducer.actions;
