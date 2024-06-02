## Starting

Install dependencies

```
npm install --save-dev
```

Run all Cypress tests

```
npx cypress run
```

Run individual Cypress test using tag from feature file

```
npx cypress run -e TAGS='@monthlyPayment'
```

Open Cypress

```
npx cypress open
```

Test reports in folder cypress/reports/\_/

Failed test screenshots in cypress/screenshots/ folder and videos in cypress/videos/ folder.
