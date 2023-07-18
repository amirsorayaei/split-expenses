import { screen } from "@testing-library/react";

import Groups from "@/content/Groups";
import { renderWithUtils } from "@/utils/resources/utils-for-tests";

jest.mock("next/router", () => require("next-router-mock"));

describe("Some related tests to groups page", () => {
  it("Should checks that groups table must be in document", () => {
    // Act
    renderWithUtils(<Groups />);

    // Assertion
    const groupsTableTitle = screen.getByText(/Groups Table List/i);
    expect(groupsTableTitle).toBeInTheDocument();
  });
});
