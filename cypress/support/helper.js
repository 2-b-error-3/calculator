import selectors from './selectors';

export function deleteData() {
  cy.get(selectors.hind).clear();
  cy.get(selectors.sisseProtsent).clear();
  // cy.get(selectors.sisseEuro).clear();
  cy.get(selectors.intress).clear();
  cy.get(selectors.jaakProtsent).clear();
  // cy.get(selectors.jaakEuro).clear();
}

export function arvutaKuumakse(hind, sissemakseProtsent, kuud, intress, jääkVäärtus) {
  const sissemakseEurodes = hind * (sissemakseProtsent / 100);
  const krediitSumma = hind - sissemakseEurodes;
  const kuuIntress = intress / (100 * 12);
  const lugeja = krediitSumma * kuuIntress * Math.pow(1 + kuuIntress, kuud);
  const nimetaja = Math.pow(1 + kuuIntress, kuud) - 1;
  const kuumakse = lugeja / nimetaja;

  return kuumakse;
}
