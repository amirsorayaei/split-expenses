import moment from "moment";
import { createSlice } from "@reduxjs/toolkit";

import { Expense, Group } from "@/src/utils/resources/interfaces";
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
    createGroup: (state, param) => {
      const { payload }: { payload: Group } = param;
      /**
       * Create a new object from given group with unique generated ID
       */
      const group: Group = {
        ...payload,
        id: generateUniqueID(state.groups),
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
      const { payload }: { payload: number } = param;
      /**
       * Remove given group from the list
       */
      const filteredGroups = state.groups.filter((el) => el.id !== payload);
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
        let givenGroup = state.groups[givenGroupIndex];
        /**
         * Find the given expense index with expenseId
         */
        let givenExpenseIndex = givenGroup.expenses?.findIndex(
          (el) => el.id === payload.expense.id
        );

        /**
         * Means that item exists
         */
        if (givenExpenseIndex !== undefined && givenExpenseIndex >= 0) {
          /**
           * Update given expense details
           */
          const expenses = givenGroup.expenses || [];
          expenses[givenExpenseIndex] = payload.expense;
        }
      }
    },
    deleteExpense: (state, param) => {
      const { payload }: { payload: { groupId: number; expenseId: number } } =
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
        const filteredExpenses = givenGroup.expenses?.filter(
          (el) => el.id !== payload.expenseId
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
