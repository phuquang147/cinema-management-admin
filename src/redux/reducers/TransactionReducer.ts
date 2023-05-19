import { createSlice } from "@reduxjs/toolkit";
import ITransaction from "~/interfaces/transaction.interface";

interface TransactionState {
  transactions: ITransaction[];
}

const initialState: TransactionState = {
  transactions: [],
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    getTransactions: (state, action) => {
      state.transactions = action.payload.transactions;
    },
  },
});

export const { getTransactions } = transactionSlice.actions;

export default transactionSlice.reducer;
