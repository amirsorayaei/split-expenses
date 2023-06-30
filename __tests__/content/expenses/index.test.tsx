import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";

import Expenses from "@/content/Expenses";
import { Group } from "@/utils/resources/interfaces";
import { store } from "@/redux/store";

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

    render(
      <Provider store={store}>
        <Expenses group={fakeGroup} />
      </Provider>
    );

    const usersname = screen.getByTestId("group-usersname");

    // Assertion
    expect(usersname.textContent).toBe(expectedOutput);
  });
});
