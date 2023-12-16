import App from "../lab-4/page";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

describe("Lab 4 App", () => {

    it("renders the lab 4 app", () => {
        render(<App />); // render our App component

        // here we're testing the app, telling the system to get our heading-1 element
        expect(screen.getByTestId("heading-1")).toBeInTheDocument();
    });

    it("has rendered favorite items", async () => {
        render(<App />);
        const movieNameToTest = /Spider-man/;

        // wait for the JSON elements to populate the list
        await waitFor(() => {
            expect(screen.getByText(movieNameToTest));
        });
    });

});