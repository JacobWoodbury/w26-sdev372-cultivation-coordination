import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../Home";
import { expect } from "vitest";

test("renders garden creation section", () => {
  render(<Home />); //Renders SPA 
  expect(screen.getByText("Garden Creation")).toBeInTheDocument(); //Text should be rendered within the SPA loaded
});

/*
FE unit test:
    Test: User attempts to create plot, does plot have correct dimensions, description and title?
    Expected Result: Plot component creates and shows a table with correct dimensions, description and title.
*/


test("dims des and title test", () => {
    render(<Home/>); //Renders SPA
    fireEvent.change(screen.getByPlaceholderText("Plot Name"), { //grabs input box "Plot Name"
        target: {value: "Test Plot"} //plot named "Test Plot" successfully (if passes)
    });

    fireEvent.change(screen.getByPlaceholderText("Plot Description"), { 
        target: {value: "Test Description"}
    });

    fireEvent.change(screen.getByPlaceholderText("Length (ft)"), { 
        target: {value: "3"}
    });

    fireEvent.change(screen.getByPlaceholderText("Width (ft)"), { 
        target: {value: "3"}
    });

    fireEvent.click(screen.getByText("Add Plot"));

    expect(screen.getByText("Test Plot")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getAllByText("Dirt").length).toBe(9);
})