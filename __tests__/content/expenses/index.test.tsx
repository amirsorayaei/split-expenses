import { screen } from "@testing-library/react";

import Expenses from "@/content/Expenses";
import { Group } from "@/utils/resources/interfaces";
import { renderWithUtils } from "@/utils/resources/utils-for-tests";

jest.mock("next/router", () => require("next-router-mock"));

describe("Several related tests on Expenses component", () => {
  it("Should render usernames with correct format", () => {
    // Arrange
    const input = [
      { id: 1, name: "Amir" },
      { id: 2, name: "Hesam" },
      { id: 3, name: "Ali" },
    ];
    const fakeGroup: Group = {
      name: "",
      currency: "",
      users: input,
    };
    const expectedOutput = "Amir - Hesam - Ali";

    renderWithUtils(<Expenses group={fakeGroup} />);

    const usersname = screen.getByTestId("group-usersname");

    // Assertion
    expect(usersname.textContent).toBe(expectedOutput);
  });
});
