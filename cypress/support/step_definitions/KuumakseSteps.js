import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import selectors from '../selectors';
import { deleteData } from '../helper';

Given('Kasutaja on liisingu kalkulaatori lehel', async () => {
  cy.visit('/');
});

When('Kasutaja nõustub küpsiste kasutamisega', async () => {
  cy.get(selectors.popup).click();
});

Then('Kalkulaatori väljadelt kustutatakse andmed', async () => {
  deleteData();
});

When(
  'Kasutaja sisestab sõiduki hinna {string}, sissemakse {string} % või sissemakse {string} eurodes',
  async (hind, sisseProtsent, sisseEuro) => {
    cy.get(selectors.hind).type(hind);
    cy.get(selectors.sisseProtsent).type(sisseProtsent);
  }
);

Then(
  'Finantseeritav summa peab olema vähemalt {int} eurot hinnast {int} arvestades sissemakset {int}',
  async (minKrediit, hind, sisseProtsent) => {
    const sissemakseEurodes = (hind / 100) * sisseProtsent;
    const finSumma = hind - sissemakseEurodes;
    cy.get(selectors.tingimused).scrollIntoView();
    cy.contains(minKrediit)
      .invoke('text')
      .then((text) => {
        const numericValue = parseInt(text.replace(/[^\d]/g, ''), 10);
        expect(numericValue).to.be.lte(finSumma);
      });
  }
);

When('Kasutaja sisestab liisingu perioodi pikkuse aastates {string} ja kuudes {string}', async (aasta, kuud) => {
  cy.get(selectors.aasta).scrollIntoView();
  cy.get(selectors.aasta).select(aasta);
  if (aasta !== '7') {
    cy.get(selectors.kuud).select(kuud);
  }
});

When('Kasutaja sisestab liisingu intressi {string} %', async (intress) => {
  cy.get(selectors.intress).type(intress);
});

When('Kasutaja sisestab jääkväärtuse {string} % või {string} eurodes', async (jääkProtsent, jääkEuro) => {
  if (jääkProtsent === 'NA') {
    cy.get(selectors.jaakEuro).type(jääkEuro);
  } else {
    cy.get(selectors.jaakProtsent).clear();
    cy.get(selectors.jaakProtsent).type(jääkProtsent);
  }
});

Then('Vara maksumus peab olema suurem kui {int} eurot', async (minHind) => {
  cy.get(selectors.hind)
    .invoke('val')
    .then((value) => {
      const numericValue = parseInt(value.replace(/\s/g, ''), 10);
      expect(numericValue).to.be.gte(minHind);
    });
});

Then('Liisingu intress peab olema suurem kui {int}', async (minIntress) => {
  cy.get(selectors.intress)
    .invoke('val')
    .then((value) => {
      const numericValue = parseInt(value, 10);
      expect(numericValue).to.be.a('number');
      expect(numericValue).to.be.gt(minIntress);
    });
});

Then('Kasutajale kuvatakse {string} eurodes', async (kuumakse) => {
  cy.get(selectors.kuumakse).contains(kuumakse).should('be.visible');
});

When('Kasutaja vajutab nupule {string}', async (maksegraafik) => {
  cy.contains(maksegraafik).then((link) => {
    cy.wrap(link).invoke('removeAttr', 'target').click();
  });
});

When('Kasutaja võrdleb tüüptingimuste kogusummat {float} eurot maksegraafiku kogu summaga', async (makseKokku) => {
  cy.scrollTo('bottom');
  cy.get(selectors.makseKokku).contains(makseKokku).should('be.visible');
});
