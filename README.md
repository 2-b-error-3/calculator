## Alustamine

Installi Cypress

```
npm install --save-dev
```

Installi Cucumber sõltuvused

```
npm install @badeball/cypress-cucumber-preprocessor

npm install --save-dev @bahmutov/cypress-esbuild-preprocessor
```

Installi Typescript cyprrss.config.ts faili jaoks

```
npm install ts-loader --save-dev
```

Jooksuta kõiki Cypress teste

```
npx cypress run
```

Jooksuta Cypress teste tagide valides. Iga testi tagi leiab .feature failist kujul '@kuumakse' cypress/e2e kaustast

```
npx cypress run -e TAGS='@kuumakse'
```

Ava Cypress

```
npx cypress open
```

Kirjeldatud Cucumber test stsenaariumid on cypress/e2e kaustast _.feature failidena. Testide samme näeb (CTRL või CMD) ja vajutus tekstil või kaustas cypress/support/step_definitions.
Testide rapordid on vastavalt formaadile eraldi kaustades cypress/reports/_/
Läbi kukkunud testide ekraanutõmmised on cypress/screenshots/ kaustades ja videod cypress/videos/ kaustades.
