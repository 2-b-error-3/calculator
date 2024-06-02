import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import selectors from "../selectors";
import { clearData, escapeSpecialCharacters } from "../helper";

let monthlyPaymentValue = null;

Given("User is on loan calculator page", async () => {
  cy.visit("/");
  cy.get(selectors.summaInput).should("be.visible");
  //   clearData();
});

When("User inserts loan {string}", async (loanAmount) => {
  cy.log("string before handling" + loanAmount);
  loanAmount = escapeSpecialCharacters(loanAmount);
  cy.log("string after handling" + loanAmount);
  cy.get(selectors.summaInput).clear();
  cy.get(selectors.summaInput).click();
  cy.get(selectors.summaInput).type(loanAmount);
  cy.get(selectors.kuudInput).click();
});

Then(
  "Inserted loan {string} is visible between {int} and {int} euros",
  async (loanAmount) => {
    cy.get(selectors.summaSlider).should("be.visible");
    let loanAmountFloat = parseFloat(loanAmount);
    if (loanAmountFloat < 500 && loanAmountFloat >= 0) {
      cy.get(selectors.summaSlider).should("have.attr", "aria-valuenow", "500");
    } else if (loanAmountFloat > 30000) {
      cy.get(selectors.summaSlider).should(
        "have.attr",
        "aria-valuenow",
        "30000"
      );
    } else if (loanAmountFloat < 0) {
      loanAmount = loanAmount * -1;
      cy.get(selectors.summaSlider).should(
        "have.attr",
        "aria-valuenow",
        loanAmount
      );
    } else {
      cy.get(selectors.summaSlider).should(
        "have.attr",
        "aria-valuenow",
        loanAmount
      );
    }
  }
);

When("User inserts period {string}", async (loanPeriod) => {
  loanPeriod = escapeSpecialCharacters(loanPeriod);
  cy.get(selectors.kuudInput).clear();
  cy.get(selectors.kuudInput).click();
  cy.get(selectors.kuudInput).type(loanPeriod);
  cy.get(selectors.summaInput).click();
});

Then("Inserted period {string} is visible", async (loanPeriod) => {
  // cy.get('div.vue-slider-dot[aria-valuemin="6"]').should(
  let loanPeriodInt = parseInt(loanPeriod);
  if (loanPeriodInt < 6 && loanPeriodInt >= 0) {
    cy.get(selectors.kuudSlider).should("have.attr", "aria-valuetext", "6");
  } else if (loanPeriodInt > 120) {
    cy.get(selectors.kuudSlider).should("have.attr", "aria-valuenow", "120");
  } else if (loanPeriodInt < 0) {
    loanPeriod = loanPeriod * -1;
    cy.get(selectors.kuudSlider).should(
      "have.attr",
      "aria-valuenow",
      loanPeriod
    );
  } else {
    cy.get(selectors.kuudSlider).should(
      "have.attr",
      "aria-valuetext",
      loanPeriod
    );
  }
});

Then(
  "Monthly payment value is between {int} and {int} euros",
  async (minMontlyPayment, maxMonthlyPayment) => {
    cy.get(selectors.kuumakse).should("be.visible");
    cy.get(selectors.kuumakse)
      .invoke("text")
      .then((text) => {
        cy.log(text);
        // Clean the string by removing whitespace, € symbol, and commas
        let cleanedString = text.replace(/[^\d.-]/g, "");
        cy.log(cleanedString);
        // Convert the cleaned string to a float
        const newMonthlyPaymentFloat = parseFloat(cleanedString, 10);

        // Assert that the value is within the specified range
        expect(newMonthlyPaymentFloat).to.be.within(
          minMontlyPayment,
          maxMonthlyPayment
        );
      });
  }
);

When("User presses button {string}", async (buttonTitle) => {
  // cy.get(selectors.nuppJätka).should("have.text", buttonTitle).click();
  cy.contains("button", buttonTitle).click();
});

Then("User is navigated to loan application screen", async () => {
  cy.get(selectors.keel).should("be.visible");
});

Then(
  "Chosen value {string} is visible on application page",
  async (loanAmount) => {
    let loanAmountFloat = parseFloat(loanAmount);
    if (loanAmountFloat < 500 && loanAmountFloat >= 0) {
      cy.get(selectors.laenusumma)
        .invoke("text")
        .then((text) => {
          expect(text.trim()).to.equal("500" + " €");
        });
    } else if (loanAmountFloat > 30000) {
      cy.get(selectors.laenusumma)
        .invoke("text")
        .then((text) => {
          expect(text.trim()).to.equal("30000" + " €");
        });
    } else if (loanAmountFloat < 0) {
      loanAmount = loanAmount * -1;
      cy.get(selectors.laenusumma)
        .invoke("text")
        .then((text) => {
          expect(text.trim()).to.equal(loanAmount + " €");
        });
    } else {
      cy.get(selectors.laenusumma)
        .invoke("text")
        .then((text) => {
          expect(text.trim()).to.equal(loanAmount + " €");
        });
    }
  }
);

When("User presses on calculator modal", async () => {
  cy.get(selectors.laenusumma).click();
});

Then("Monthly payment value is saved for comparison", async () => {
  cy.get(selectors.kuumakse).should("be.visible");
  cy.get(selectors.kuumakse)
    .invoke("text")
    .then((text) => {
      cy.log(text);
      // Clean the string by removing whitespace, € symbol, and commas
      let cleanedString = text.replace(/[^\d.-]/g, "");
      cy.log(cleanedString);
      // Convert the cleaned string to a float
      monthlyPaymentValue = parseFloat(cleanedString);
    });
});

Then(
  "New calculated monthly payment amount is larger than previous",
  async () => {
    cy.get(selectors.kuumakse).should("be.visible");
    cy.get(selectors.summaInput).click();
    cy.get(selectors.kuumakse).should("be.visible");
    cy.get(selectors.kuumakse)
      .invoke("text")
      .then((newMonthlyPayment) => {
        cy.log("monthly payment" + newMonthlyPayment);
        let cleanedString = newMonthlyPayment.replace(/[\s€,]/g, "");
        const newMonthlyPaymentFloat = parseFloat(cleanedString, 10); // Convert the aria-valuetext to an integer
        expect(newMonthlyPaymentFloat).to.be.greaterThan(monthlyPaymentValue); // Compare it with loanAmount
      });
  }
);
