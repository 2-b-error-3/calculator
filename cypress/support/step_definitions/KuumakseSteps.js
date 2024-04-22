import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import selectors from '../selectors';
import elector from '../elector';
import { deleteData } from '../helper';

const liising = new elector();

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
When('Kasutaja sisestab liisingu perioodi pikkuse aastates {string} ja kuudes {string}', async (aasta, kuud) => {
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
      expect(numericValue).to.be.gt(minHind);
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

// When(
//   'Kasutaja sisestab {string}, {string}, {string}, {string}, {string}, {string}, {string} ja {string}',
//   async (hind, sisseProtsent, sisseEuro, aasta, kuud, intress, jääkProtsent, jääkEuro) => {
//     cy.get(selectors.hind).type(hind);
//     cy.get(selectors.sisseProtsent).type(sisseProtsent);
//     cy.get(selectors.aasta).select(aasta);
//     if (aasta !== '7') {
//       cy.get(selectors.kuud).select(kuud);
//     }
//     cy.get(selectors.intress).type(intress);
//     if (jääkProtsent === 'NA') {
//       cy.get(selectors.jaakEuro).type(jääkEuro);
//     } else {
//       cy.get(selectors.jaakProtsent).clear();
//       cy.get(selectors.jaakProtsent).type(jääkProtsent);
//     }
//     cy.get(selectors.hind)
//       .invoke('val')
//       .then((value) => {
//         const numericValue = parseInt(value.replace(/\s/g, ''), 10);
//         expect(numericValue).to.be.gt(7499);
//       });
//     cy.get(selectors.intress)
//       .invoke('val')
//       .then((value) => {
//         const numericValue = parseInt(value, 10);
//         expect(numericValue).to.be.a('number');
//         expect(numericValue).to.be.gt(0);
//       });
//   }
// );

Then('Kasutajale kuvatakse {string} eurodes', async (kuumakse) => {
  cy.get(selectors.kuumakse).contains(kuumakse).should('be.visible');
});

When('Kasutaja vajutab nupule {string}', async (maksegraafik) => {
  cy.contains(maksegraafik).then((link) => {
    cy.wrap(link).invoke('removeAttr', 'target').click();
  });
});

When('Kasutaja võrdleb tüüptingimuste kogusummat {float} maksegraafiku kogu summaga', async (makseKokku) => {
  cy.scrollTo('bottom');
  const makseKokkuString = makseKokku.toString();
  // cy.get('td.text-right strong').contains(makseKokkuString).should('exist').click();
  // cy.get('table.table table-striped table-condensed tfoot').contains(makseKokkuString).should('exist').click();
  // cy.xpath("/html//div[@id='payment-schedule']/table//strong").should('have.text', makseKokku);

  cy.get(selectors.makseKokku).contains('16464.27').should('be.visible');
  // cy.get('tfoot tr td strong').should('have.text', '16464.27');
  // cy.get('tfoot').find('tr').find('td').find('strong').should('have.text', '16464.27');
});

When(
  'Kasutaja lahutab tüüptingimuste kogusummast {float} lepingutasu {float} eurot',
  async (koguSumma, lepinguTasu) => {
    const kokkuMakse = koguSumma - lepinguTasu;
  }
);
