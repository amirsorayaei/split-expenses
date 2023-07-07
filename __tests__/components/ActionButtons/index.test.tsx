import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ActionButtons from "@/components/ActionButtons";
import { DialogProps } from "@/components/DialogAlert";
import { renderWithUtils } from "@/utils/resources/utils-for-tests";

describe("Several related tests to action buttons", () => {
  // Arrange
  const modifiedProps: DialogProps = {
    title: "title",
    message: "message",
    confirmBtn: "YES",
    cancelBtn: "NO",
  };

  it("Should have two Tooltips which are named Edit and Delete", () => {
    // Act
    renderWithUtils(
      <ActionButtons
        dialogSettings={modifiedProps}
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

  it("Should check the visibility of the dialog", async () => {
    // Act
    renderWithUtils(
      <ActionButtons
        dialogSettings={modifiedProps}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    // Assertion
    const deleteBtnElement = screen.getByTestId("Delete");
    await userEvent.click(deleteBtnElement);

    const dialogElement = screen.getByTestId("dialog-alert");

    expect(dialogElement).toBeInTheDocument();
  });

  it("Should have expected title and message on dialog alert when pressing delete button", async () => {
    // Act
    renderWithUtils(
      <ActionButtons
        dialogSettings={modifiedProps}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    // Assertion
    const deleteBtnElement = screen.getByTestId("Delete");
    await userEvent.click(deleteBtnElement);

    const titleElement = screen.getByTestId("dialog-title");
    const messageElement = screen.getByTestId("dialog-message");

    expect(titleElement).toHaveTextContent(modifiedProps.title);
    expect(messageElement).toHaveTextContent(modifiedProps.message);
  });

  it("Should check visibility of cancel button", async () => {
    // Arrange
    const props: DialogProps = {
      title: "title",
      message: "message",
      confirmBtn: "YES",
    };

    // Act
    renderWithUtils(
      <ActionButtons
        dialogSettings={props}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    // Assertion
    const deleteBtnElement = screen.getByTestId("Delete");
    await userEvent.click(deleteBtnElement);

    const dialogCancelButton = screen.queryByTestId("dialog-cancel-btn");
    expect(dialogCancelButton).not.toBeInTheDocument();
  });

  it("Should check the visibility of action buttons", async () => {
    // Act
    renderWithUtils(
      <ActionButtons
        dialogSettings={modifiedProps}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    // Assertion
    const deleteBtnElement = screen.getByTestId("Delete");
    await userEvent.click(deleteBtnElement);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);
  });
});
