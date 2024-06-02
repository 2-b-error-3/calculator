@monthlyPayment
Feature: User can select and insert loan sum and period between valid values

    Scenario Outline: User inserts valid loan sum and period
        Given User is on loan calculator page
        When User inserts loan "<loanAmount>"
        Then Inserted loan "<loanAmount>" is visible between 500 and 30000 euros
        When User inserts period "<loanPeriod>"
        Then Inserted period "<loanPeriod>" is visible
        Then Monthly payment value is between 10 and 5300 euros
        When User presses button "JÄTKA"
        Then User is navigated to loan application screen
        And Chosen value "<loanAmount>" is visible on application page
        When User presses on calculator modal
        And Inserted loan "<loanAmount>" is visible between 500 and 30000 euros
        And Inserted period "<loanPeriod>" is visible
        Then Monthly payment value is between 10 and 5300 euros


        Examples:
            | loanAmount | loanPeriod |
            | 5000       | 60         |
            | 500        | 6          |
            | 30000      | 120        |
            | 100        | 2          |
            | 555000     | 300        |
            | -7500      | -25        |
