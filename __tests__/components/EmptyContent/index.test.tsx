import EmptyContent from "@/components/EmptyContent";
import { render, screen } from "@testing-library/react";

describe("Several related tests to empty content component", () => {
  it("Should have a message for empty content", () => {
    // Arrange
    const message = "No expenses found!";

    // Act
    render(<EmptyContent message={message} />);

    // Assertion
    const element = screen.getByTestId("empty-message");
    expect(element).toBeInTheDocument();
  });
});
