@changeValue
Feature: User can change loan calculator values

    Background: User inserts valid calculator values
        Given User is on loan calculator page
        When User inserts loan "15000"
        Then Inserted loan "15000" is visible between 500 and 30000 euros
        When User inserts period "24"
        Then Inserted period "24" is visible
        Then Monthly payment value is between 10 and 5300 euros
        Then Monthly payment value is saved for comparison

    Scenario Outline: User changes calculator values using slider
        When User increases the loan amount slider value with argument <increaseArgument>
        Then New loan amount is larger than the previous <loanAmount>
        When User decreases the loan period slider value with argument <decreaseArgument>
        Then New loan period is shorter than the previous <loanPeriod>
        Then New calculated monthly payment amount is larger than previous

        Examples:
            | loanAmount | loanPeriod | increaseArgument | decreaseArgument |
            | 15000      | 24         | 5                | 2                |
            | 15000      | 24         | 20               | 20               |



