import {
  PayloadAction,
  Selector,
  createAction,
  createReducer,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "..";

interface CreditCardsState {
  data: Array<any>;
}

const initialState = { data: [] } as CreditCardsState;

const slice = createSlice({
  name: "creditCardReducer",
  initialState,
  reducers: {
    addCreditCard: (state, action: PayloadAction<{ data: any }>) => {
      console.log(state.data, "ahi");
      console.log(action.payload.data, "ohno");
      state.data.push(action.payload.data);
    },
  },
});

export const { addCreditCard } = slice.actions;

const selectCreditCardsState: Selector<RootState, CreditCardsState> = state =>
  state.creditCards;

export const selectCreditCards = createSelector(
  selectCreditCardsState,
  state => state.data,
);

export default slice.reducer;
