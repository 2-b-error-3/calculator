@invalidValue
Feature: User inserts text as loan amount and period

    Scenario Outline: User inserts invalid loan sum and period
        Given User is on loan calculator page
        When User inserts loan "<loanAmount>"
        Then Defult loan amount value 500 is displayed to the user
        When User inserts period "<loanPeriod>"
        Then Defult loan period value "6" is displayed to the user
        Then Monthly payment value is between 10 and 5300 euros

        Examples:
            | loanAmount                                                | loanPeriod                                    |
            | aa1bb                                                     | qwerty                                        |
            | <a                                                        | ><script src=http://test.com/xss.js></script> |
            | http://example.com/search?q=<script>alert('XSS')</script> | <script>alert('Stored XSS')</script>          |
