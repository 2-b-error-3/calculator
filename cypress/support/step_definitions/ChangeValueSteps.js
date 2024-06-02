import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import selectors from "../selectors";

When(
  "User increases the loan amount slider value with argument {int}",
  async (increaseArg) => {
    cy.get(selectors.summaSlider).then(($slider) => {
      const width = $slider.width();
      const targetPosition = width * increaseArg;
      cy.wrap($slider)
        .trigger("mousedown", {
          which: 1,
          pageX: $slider.offset().left,
          pageY: $slider.offset().top,
        })
        .trigger("mousemove", {
          which: 1,
          pageX: $slider.offset().left + targetPosition,
          pageY: $slider.offset().top,
        })
        .trigger("mouseup");
    });
    cy.get(selectors.kuudInput).click();
  }
);

Then(
  "New loan amount is larger than the previous {int}",
  async (loanAmount) => {
    cy.get(selectors.summaSlider)
      .invoke("attr", "aria-valuetext")
      .then((newLoanPeriod) => {
        const newLoanPeriodInt = parseInt(newLoanPeriod, 10); // Convert the aria-valuetext to an integer
        expect(newLoanPeriodInt).to.be.greaterThan(loanAmount); // Compare it with loanAmount
      });
  }
);
When(
  "User decreases the loan period slider value with argument {int}",
  async (decreaseArg) => {
    cy.get(selectors.kuudSlider).then(($slider) => {
      const width = $slider.width();
      const targetPosition = width * decreaseArg;
      cy.wrap($slider)
        .trigger("mousedown", {
          which: 1,
          pageX: $slider.offset().left,
          pageY: $slider.offset().top,
        })
        .trigger("mousemove", {
          which: 1,
          pageX: $slider.offset().left - targetPosition,
          pageY: $slider.offset().top,
        })
        .trigger("mouseup");
    });
    cy.get(selectors.summaInput).click();
  }
);

Then(
  "New loan period is shorter than the previous {int}",
  async (loanPeriod) => {
    cy.get(selectors.kuudSlider)
      .invoke("attr", "aria-valuetext")
      .then((newLoanPeriod) => {
        const newLoanPeriodInt = parseInt(newLoanPeriod, 10); // Convert the aria-valuetext to an integer
        expect(newLoanPeriodInt).to.be.lessThan(loanPeriod); // Compare it with loanAmount
      });
  }
);
