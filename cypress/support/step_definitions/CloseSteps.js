import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import selectors from "../selectors";

When("User closes the modal pressing to close button", async () => {
  cy.get(selectors.sulge).click();
});
