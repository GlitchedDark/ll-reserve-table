import { render, screen, fireEvent } from "@testing-library/react";
import Home from "@/app/page";
import { describe } from "node:test";


describe("Home", () => {
    it("Renders the BookingForm heading", () => {
        render(<Home />);
        const headingElement = screen.getByText("Reserve Table");
        expect(headingElement).toBeInTheDocument();
    });
    it("Changes name form field", () => {
        render(<Home />);
        const firstNameInput = screen.getByPlaceholderText(/Enter first name/)
        fireEvent.change(firstNameInput, "Jeff")
        expect(firstNameInput).toBeVisible();
    })
});

