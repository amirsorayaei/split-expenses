import moment from "moment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Balance, Expense, Group } from "@/src/utils/resources/interfaces";
import { generateUniqueID } from "@/src/utils/resources/Functions";
import { GroupState } from "../types/Types";

const initialState: GroupState = {
  groups: [],
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    createGroup: (state, param: PayloadAction<Group>) => {
      /**
       * Create a new object from given group with unique generated ID
       */
      const currentTime = moment().format("YYYY/MM/DD HH:mm");
      const group: Group = {
        ...param.payload,
        id: generateUniqueID(state.groups),
        expenses: [],
        createdAt: currentTime,
        updatedAt: currentTime,
      };
      state.groups.push(group);
    },
    updateGroup: (state, param: PayloadAction<Group>) => {
      /**
       * Find the given group index with groupId
       */
      const givenGroupIndex = state.groups.findIndex(
        (el) => el.id === param.payload.id
      );

      /**
       * Means that item exists
       */
      if (givenGroupIndex !== -1) {
        /**
         * Update given group details while preserving existing expenses
         */
        const currentTime = moment().format("YYYY/MM/DD HH:mm");
        state.groups[givenGroupIndex] = {
          ...param.payload,
          expenses: state.groups[givenGroupIndex].expenses || [],
          updatedAt: currentTime,
        };
      }
    },
    deleteGroup: (state, param: PayloadAction<number>) => {
      /**
       * Remove given group from the list
       */
      const filteredGroups = state.groups.filter(
        (el) => el.id !== param.payload
      );
      state.groups = filteredGroups;
    },
    createExpense: (
      state,
      param: PayloadAction<{ groupId: number; expense: Expense }>
    ) => {
      /**
       * Find the given group index with groupId
       */
      const givenGroupIndex = state.groups.findIndex(
        (el) => el.id === param.payload.groupId
      );
      /**
       * Means that item exists
       */
      if (givenGroupIndex !== -1) {
        /**
         * Create a new object from given group with unique generated ID
         */
        const currentTime = moment().format("YYYY/MM/DD HH:mm");
        const expenses = state.groups[givenGroupIndex].expenses || [];
        const expense: Expense = {
          ...param.payload.expense,
          id: generateUniqueID(expenses),
          createdAt: currentTime,
          updatedAt: currentTime,
        };
        expenses.push(expense);
      }
    },
    updateExpense: (
      state,
      param: PayloadAction<{ groupId: number; expense: Expense }>
    ) => {
      /**
       * Find the given group index with groupId
       */
      const givenGroupIndex = state.groups.findIndex(
        (el) => el.id === param.payload.groupId
      );
      /**
       * Means that item exists
       */
      if (givenGroupIndex !== -1) {
        let givenGroup = state.groups[givenGroupIndex];
        /**
         * Find the given expense index with expenseId
         */
        let givenExpenseIndex = givenGroup.expenses?.findIndex(
          (el) => el.id === param.payload.expense.id
        );

        /**
         * Means that item exists
         */
        if (givenExpenseIndex !== undefined && givenExpenseIndex >= 0) {
          /**
           * Update given expense details
           */
          const currentTime = moment().format("YYYY/MM/DD HH:mm");
          const expenses = givenGroup.expenses || [];
          expenses[givenExpenseIndex] = {
            ...param.payload.expense,
            updatedAt: currentTime,
          };
        }
      }
    },
    deleteExpense: (
      state,
      param: PayloadAction<{ groupId: number; expenseId: number }>
    ) => {
      /**
       * Find the given group index with groupId
       */
      const givenGroupIndex = state.groups.findIndex(
        (el) => el.id === param.payload.groupId
      );
      /**
       * Means that item exists
       */
      if (givenGroupIndex !== -1) {
        const givenGroup = state.groups[givenGroupIndex];
        /**
         * Remove given expense from the list
         */
        const filteredExpenses = givenGroup.expenses?.filter(
          (el) => el.id !== param.payload.expenseId
        );
        givenGroup.expenses = filteredExpenses;
      }
    },
    createBalances: (
      state,
      param: PayloadAction<{ groupId: number; balances: Balance[] }>
    ) => {
      /**
       * Find the given group index with groupId
       */
      const givenGroupIndex = state.groups.findIndex(
        (el) => el.id === param.payload.groupId
      );
      /**
       * Means that item exists
       */
      if (givenGroupIndex !== -1) {
        /**
         * Create a new object from given group with unique generated ID
         */
        state.groups[givenGroupIndex].balances = [...param.payload.balances];
      }
    },
    updateBalance: (
      state,
      param: PayloadAction<{ groupId: number; balance: Balance }>
    ) => {
      /**
       * Find the given group index with groupId
       */
      const givenGroupIndex = state.groups.findIndex(
        (el) => el.id === param.payload.groupId
      );
      /**
       * Means that item exists
       */
      if (givenGroupIndex !== -1) {
        let givenGroup = state.groups[givenGroupIndex];
        /**
         * Find the given balance index with balanceId
         */
        let givenBalanceIndex = givenGroup.balances?.findIndex(
          (el) => el.id === param.payload.balance.id
        );

        /**
         * Means that item exists
         */
        if (givenBalanceIndex !== undefined && givenBalanceIndex >= 0) {
          /**
           * Update given expense details
           */
          const balances = givenGroup.balances || [];
          balances[givenBalanceIndex] = { ...param.payload.balance };
        }
      }
    },
    deleteBalance: (
      state,
      param: PayloadAction<{ groupId: number; balanceId: number }>
    ) => {
      /**
       * Find the given group index with groupId
       */
      const givenGroupIndex = state.groups.findIndex(
        (el) => el.id === param.payload.groupId
      );
      /**
       * Means that item exists
       */
      if (givenGroupIndex !== -1) {
        const givenGroup = state.groups[givenGroupIndex];
        /**
         * Remove given balance from the list
         */
        const filteredBalances = givenGroup.balances?.filter(
          (el) => el.id !== param.payload.balanceId
        );
        givenGroup.balances = filteredBalances;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createGroup,
  updateGroup,
  deleteGroup,
  createExpense,
  updateExpense,
  deleteExpense,
  createBalances,
  updateBalance,
  deleteBalance,
} = groupSlice.actions;

export default groupSlice.reducer;
