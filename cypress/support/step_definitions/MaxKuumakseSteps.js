import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import selectors from '../selectors';

Given('Kasutaja on kalkulaatori lehel {string}', async (maxKuumakseTabText) => {
  cy.get('a[data-toggle="tab"][href="#max-payment"]').contains(maxKuumakseTabText).click();
});

When('Kasutaja sisestab ülalpeetavate arvuks {int}', async (lasteArv) => {
  cy.get(selectors.lasteArv).select(lasteArv).should('have.value', 0);
});

When('Kasutaja sisestab oma {string}', async (netoPalk) => {
  cy.get(selectors.netosissetulek).clear();
  cy.get(selectors.netosissetulek).type(netoPalk);
});
Then('Kasutajale kuvatakse maksimaalse kuumakse {string}', async (tulemus) => {
  // cy.get(selectors.kuumakse).should('have.text', tulemus);
  // cy.get(selectors.kuumakse).should('be.visible');
  cy.contains(tulemus).should('be.visible');
  // cy.get(selectors.kuumakse).contains(tulemus);
});
