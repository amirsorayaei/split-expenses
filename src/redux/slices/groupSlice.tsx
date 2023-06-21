import { createSlice } from "@reduxjs/toolkit";

import { Expense, Group } from "@/core/resources/interfaces";
import { GroupState } from "../types/Types";
import { generateUniqueID } from "@/core/resources/Functions";
import moment from "moment";

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
    createGroup: (state, param) => {
      const { payload }: { payload: Group } = param;
      /**
       * Create a new object from given group with unique generated ID
       */
      const group: Group = {
        ...payload,
        id: generateUniqueID(state.groups),
        totalExpense: 0,
        expenses: [],
      };
      state.groups.push(group);
    },
    updateGroup: (state, param) => {
      const { payload }: { payload: Group } = param;
      /**
       * Find the given group index with groupId
       */
      const givenGroupIndex = state.groups.findIndex(
        (el) => el.id === payload.id
      );
      /**
       * Means that item exists
       */
      if (givenGroupIndex !== -1) {
        /**
         * Update given group details
         */
        state.groups[givenGroupIndex] = payload;
      }
    },
    deleteGroup: (state, param) => {
      const { payload }: { payload: Group } = param;
      /**
       * Remove given group from the list
       */
      const filteredGroups = state.groups.filter((el) => el.id !== payload.id);
      state.groups = filteredGroups;
    },
    createExpense: (state, param) => {
      const { payload }: { payload: { groupId: number; expense: Expense } } =
        param;
      /**
       * Find the given group index with groupId
       */
      const givenGroupIndex = state.groups.findIndex(
        (el) => el.id === payload.groupId
      );
      /**
       * Means that item exists
       */
      if (givenGroupIndex !== -1) {
        /**
         * Create a new object from given group with unique generated ID
         */
        const expenses = state.groups[givenGroupIndex].expenses || [];
        const expense: Expense = {
          ...payload.expense,
          id: generateUniqueID(expenses),
          createdAt: moment().format("YYYY/MM/DD"),
        };
        expenses.push(expense);
      }
    },
    updateExpense: (state, param) => {
      const { payload }: { payload: { groupId: number; expense: Expense } } =
        param;
      /**
       * Find the given group index with groupId
       */
      const givenGroupIndex = state.groups.findIndex(
        (el) => el.id === payload.groupId
      );
      /**
       * Means that item exists
       */
      if (givenGroupIndex !== -1) {
        const givenGroup = state.groups[givenGroupIndex];
        /**
         * Find the given expense index with expenseId
         */
        const givenExpenseIndex = givenGroup.expenses.findIndex(
          (el) => el.id === payload.expense.id
        );

        /**
         * Means that item exists
         */
        if (givenExpenseIndex !== -1) {
          /**
           * Update given expense details
           */
          givenGroup.expenses[givenExpenseIndex] = payload.expense;
        }
      }
    },
    deleteExpense: (state, param) => {
      const { payload }: { payload: { groupId: number; expense: Expense } } =
        param;
      /**
       * Find the given group index with groupId
       */
      const givenGroupIndex = state.groups.findIndex(
        (el) => el.id === payload.groupId
      );
      /**
       * Means that item exists
       */
      if (givenGroupIndex !== -1) {
        const givenGroup = state.groups[givenGroupIndex];
        /**
         * Remove given expense from the list
         */
        const filteredExpenses = givenGroup.expenses.filter(
          (el) => el.id !== payload.expense.id
        );
        givenGroup.expenses = filteredExpenses;
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
} = groupSlice.actions;

export default groupSlice.reducer;
