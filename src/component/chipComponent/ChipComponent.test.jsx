import { render, screen } from "@testing-library/react";
import ChipComponent from "./ChipComponent";

describe("Chip component", () => {
  test("should render chip component", () => {
    render(<ChipComponent />);
    expect(screen.getAllByRole("heading")[0].textContent).toEqual("Add Users");
    expect(screen.getAllByRole("textbox")[0]).toBeInTheDocument();
  });
});
