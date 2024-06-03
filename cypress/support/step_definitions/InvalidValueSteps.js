import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import selectors from "../selectors";

Then(
  "Defult loan amount value {int} is displayed to the user",
  async (defaultLoanAmount) => {
    cy.get(selectors.summaSlider)
      .invoke("attr", "aria-valuetext")
      .then((loanAmount) => {
        const newLoanPeriodInt = parseInt(loanAmount, 10);
        expect(newLoanPeriodInt).to.be.eq(defaultLoanAmount);
      });
  }
);
Then(
  "Defult loan period value {string} is displayed to the user",
  async (defaultLoanPeriod) => {
    cy.get(selectors.kuudSlider).should("be.visible");
    cy.get(selectors.kuudSlider)
      .invoke("attr", "aria-valuetext")
      .then((text) => {
        expect(text).to.be.eqls(defaultLoanPeriod);
      });
  }
);
