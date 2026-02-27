import { render, screen } from "@testing-library/react";
import Home from "../Home";

test("renders garden creation section", () => {
  render(<Home />); //Renders SPA 
  expect(screen.getByText("Garden Creation")).toBeInTheDocument(); //Text should be rendered within the SPA loaded
});