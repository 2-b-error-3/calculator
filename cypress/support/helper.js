import selectors from './selectors';

export function deleteData() {
  cy.get(selectors.hind).clear();
  cy.get(selectors.sisseProtsent).clear();
  // cy.get(selectors.sisseEuro).clear();
  cy.get(selectors.intress).clear();
  cy.get(selectors.jaakProtsent).clear();
  // cy.get(selectors.jaakEuro).clear();
}
