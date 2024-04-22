@maxKuumakse
Feature: Kasutajale kuvatakse liisingu maksimaalne kuumakse vastavalt netosissetulekule

    Background: Kasutaja liigub liisingu kalkulaatori lehele
        Given Kasutaja on liisingu kalkulaatori lehel
        When Kasutaja nõustub küpsiste kasutamisega



    Scenario Outline: Kasutaja kontrollib maksimaalset kuumakset vastavalt netosissetulekule
        Given Kasutaja on kalkulaatori lehel "Maksimaalne kuumakse"
        When Kasutaja sisestab ülalpeetavate arvuks 0
        When Kasutaja sisestab oma "<netosissetulek>"
        Then Kasutajale kuvatakse maksimaalse kuumakse "<teavitus>"

        Examples:
            | netosissetulek | teavitus                                                         |
            | 999            | Maksimaalse kuumakse arvutamiseks on netosissetulek liiga väike. |
            | 1000           | 357                                                              |
            | -1000          | Maksimaalse kuumakse arvutamiseks on netosissetulek liiga väike. |