import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PageTitle from "@/components/PageTitle";

describe("Some related tests to Page title component", () => {
  it("Should have heading and subheading", () => {
    // Arrange
    const heading = "Page Heading";
    const subHeading = "Page SubHeading";

    // Act
    render(<PageTitle heading={heading} subHeading={subHeading} />);

    // Assertion
    const headingElement = screen.getByTestId("page-title-heading");
    const subHeadingElement = screen.getByTestId("page-title-subheading");
    const buttonElement = screen.queryByTestId("page-title-button");

    expect(headingElement).toHaveTextContent(heading);
    expect(subHeadingElement).toHaveTextContent(subHeading);
    expect(buttonElement).not.toBeInTheDocument();
  });

  it("Should test the button", async () => {
    // Arrange
    const modifiedProps = {
      heading: "Page Heading",
      subHeading: "Page Subheading",
      buttonTitle: "Page Button",
      onClickButton: jest.fn(),
    };

    // Act
    render(<PageTitle {...modifiedProps} />);

    // Assertion
    const buttonElement = screen.getByTestId("page-title-button");
    expect(buttonElement).toBeInTheDocument();

    await userEvent.click(buttonElement);
    expect(modifiedProps.onClickButton).toHaveBeenCalled();
  });
});
