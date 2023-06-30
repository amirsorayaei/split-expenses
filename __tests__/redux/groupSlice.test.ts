import moment from "moment";

import { Expense, Group } from "@/utils/resources/interfaces";
import {
  createExpense,
  createGroup,
  deleteExpense,
  deleteGroup,
  updateExpense,
  updateGroup,
} from "@/redux/slices/groupSlice";
import { store } from "@/redux/store";

describe("Group redux state tests...", () => {
  /**
   * Initial testing flow with creating a new group
   */
  const initialGroup: Group = {
    name: "Test",
    users: [{ id: 1, name: "User" }],
    currency: "IRR",
  };
  store.dispatch(createGroup(initialGroup));

  /**
   * Create a group
   */
  it("Should create a group with given object", () => {
    // Arrange
    const output: Group = {
      id: 1,
      name: "Test",
      currency: "IRR",
      users: [{ id: 1, name: "User" }],
      expenses: [],
    };

    // Assertion
    const state = store.getState().group;
    expect(state.groups).toEqual([output]);
  });

  /**
   * Create a expense for specified group
   */
  it("Should create a expense for specified group with given object", () => {
    // Arrange
    const input: { groupId: number; expense: Expense } = {
      groupId: 1,
      expense: {
        amount: 250000,
        name: "Expense Name",
        payor: { id: 1, name: "User Name" },
        users: [{ id: 1, name: "User Name" }],
      },
    };
    const output: Expense = {
      id: 1,
      createdAt: moment().format("YYYY/MM/DD"),
      amount: 250000,
      name: "Expense Name",
      payor: { id: 1, name: "User Name" },
      users: [{ id: 1, name: "User Name" }],
    };

    // Act
    store.dispatch(createExpense(input));

    // Assertion
    const state = store.getState().group;
    expect(state.groups[0].expenses).toEqual([output]);
  });

  /**
   * Update a specified group
   */
  it("Should update the specified group with given object", () => {
    // Arrange
    const updatedInput: Group = {
      ...store.getState().group.groups[0],
      id: 1,
      name: "Updated test",
      users: [{ id: 1, name: "Updated user" }],
      currency: "USD",
    };
    const output: Group = {
      ...store.getState().group.groups[0],
      id: 1,
      name: "Updated test",
      currency: "USD",
      users: [{ id: 1, name: "Updated user" }],
    };

    // Act
    store.dispatch(updateGroup(updatedInput));

    // Assertion
    const state = store.getState().group;
    expect(state.groups).toEqual([output]);
  });

  /**
   * Update a specified expense
   */
  it("Should update a specified expense with given object", () => {
    // Arrange
    const updatedInput: { groupId: number; expense: Expense } = {
      groupId: 1,
      expense: {
        id: 1,
        amount: 498000,
        name: "Updated Expense Name",
        payor: { id: 2, name: "Updated User Name" },
        users: [
          { id: 1, name: "Updated User Name" },
          { id: 2, name: "New User Name" },
        ],
      },
    };
    const output: Expense = {
      id: 1,
      amount: 498000,
      name: "Updated Expense Name",
      payor: { id: 2, name: "Updated User Name" },
      users: [
        { id: 1, name: "Updated User Name" },
        { id: 2, name: "New User Name" },
      ],
    };

    // Act
    store.dispatch(updateExpense(updatedInput));

    // Assertion
    const state = store.getState().group;
    expect(state.groups[0].expenses).toEqual([output]);
  });

  it("Should delete specified expense from a group", () => {
    // Arrange
    const input = {
      groupId: 1,
      expenseId: 1,
    };

    // Act
    store.dispatch(deleteExpense(input));

    // Assertion
    const state = store.getState().group;
    expect(state.groups[0].expenses).toEqual([]);
  });

  it("Should delete specified group", () => {
    // Arrange
    const input: number = 1;

    // Act
    store.dispatch(deleteGroup(input));

    // Assertion
    const state = store.getState().group;
    expect(state.groups).toEqual([]);
  });
});
