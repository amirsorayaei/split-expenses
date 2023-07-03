import { screen } from "@testing-library/react";

import ActionButtons from "@/components/ActionButtons";
import { DialogProps } from "@/components/DialogAlert/DialogAlert";
import { renderWithProviders } from "@/utils/resources/utils-for-tests";

describe("Several related tests to action buttons", () => {
  it("Should have a Tooltip which has a title named Edit", () => {
    // Arrange
    const dialogSettings: DialogProps = {
      title: "title",
      message: "message",
      confirmBtn: "Yes",
    };

    // Act
    renderWithProviders(
      <ActionButtons
        dialogSettings={dialogSettings}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    const editElement = screen.getByTestId("Edit");
    const deleteElement = screen.getByTestId("Delete");

    // Assertion
    expect(editElement).toBeInTheDocument();
    expect(deleteElement).toBeInTheDocument();
  });
});
