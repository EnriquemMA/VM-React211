import App from "../lab-2/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Lab 2 App", () => {
    it("renders the lab 2 app", () => {
        render(<App />); // render our App component

        // here we're testing the app, telling the system to get our heading-1 element
        expect(screen.getByTestId("heading-1")).toBeInTheDocument();
    });
});
