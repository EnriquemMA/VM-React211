import App from "../lab-5/page";
import "@testing-library/jest-dom";
import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";

describe("Lab 5 App", () => {

    it("renders the lab 5 app", () => {
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

    it("has disabled button when no items selected", async () => {
        render(<App />);

        const movieNameToTest = /Spider-man/;

        // wait for the JSON elements to populate the list
        await waitFor(() => {
            expect(screen.getByText(movieNameToTest));
        });

        const submitButton = screen.getByTestId("submit-form");

        // uncheck all of the checkboxes
        await act(async () => {
            for (let i = 0; i < 5; i++) {
                let checkbox = screen.getByTestId(`favitem-${i}`);

                // if the checkbox is checked already, click to uncheck it
                if (checkbox.checked) {
                    fireEvent.click(checkbox);
                }
                expect(checkbox).not.toBeChecked();
            }
        });

        await waitFor(() => {
            expect(screen.getByTestId("submit-form")).toBeDisabled();
        });
    });

    it("clicks a favitem and then submits and saves", async () => {
        render(<App />);

        // this must be element with an id of 1    
        const movieNameToTest = /The Avengers/;

        // wait for the JSON elements to populate the list
        await waitFor(() => {
            expect(screen.getByText(movieNameToTest));
        });

        const checkbox = screen.getByTestId("favitem-1");
        const submitButton = screen.getByTestId("submit-form");

        // ensure at least the element with attribute data-testid="favitem-1" is checked
        await act(async () => {
            // if the checkbox is not checked, then make it checked
            if (!checkbox.checked) {
                fireEvent.click(checkbox);
            }
        });

        // click the submit button
        await act(async () => {
            fireEvent.click(submitButton);
        })

        // ensure that the unordered list is rendered (and not the form)
        await waitFor(() => {
            expect(screen.getByTestId("lab-5-ul")).toBeInTheDocument();
        });

        // test to ensure that the favorite item text is visible (meaning, it ws previously checked in the form)
        await waitFor(() => {
            expect(screen.getByText(movieNameToTest)).toBeInTheDocument();
        });
    });

});