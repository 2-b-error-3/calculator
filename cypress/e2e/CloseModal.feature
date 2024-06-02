@closeModal
Feature: User can select and insert loan sum and period betwbbn valid values

    Background: User inserts valid loan sum and period
        Given User is on loan calculator page
        When User inserts loan "15000"
        Then Inserted loan "15000" is visible between 500 and 30000 euros
        When User inserts period "24"
        Then Inserted period "24" is visible
        Then Monthly payment value is between 10 and 5300 euros

    Scenario Outline: Chosen values must be used in the application process after closing the modal
        When User closes the modal pressing to close button
        Then User is navigated to loan application screen
        And Chosen value "15000" is visible on application page