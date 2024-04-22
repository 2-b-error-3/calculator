@kuumakse
Feature: Kasutajale kuvatakse liisingu kuumakse vastavalt kasutaja sisestatud andmetele

    Background: Kasutaja liigub liisingu kalkulaatori lehele ja kustutab andmed
        Given Kasutaja on liisingu kalkulaatori lehel
        When Kasutaja nõustub küpsiste kasutamisega
        Then Kalkulaatori väljadelt kustutatakse andmed


    Scenario Outline: Scenario Outline name: Kasutaja sisendab andmed kuumaksu arvutamiseks
        When Kasutaja sisestab sõiduki hinna "<hind>", sissemakse "<sisseProtsent>" % või sissemakse "<sisseEuro>" eurodes
        Then Finantseeritav summa peab olema vähemalt 5000 eurot hinnast <hind> arvestades sissemakset <sisseProtsent>
        When Kasutaja sisestab liisingu perioodi pikkuse aastates "<aasta>" ja kuudes "<kuud>"
        When Kasutaja sisestab liisingu intressi "<intress>" %
        When Kasutaja sisestab jääkväärtuse "<jääkProtsent>" % või "<jääkEuro>" eurodes
        Then Vara maksumus peab olema suurem kui 7500 eurot
        Then Liisingu intress peab olema suurem kui 0
        Then Kasutajale kuvatakse "<kuumakse>" eurodes

        Examples:
            | hind   | sisseProtsent | sisseEuro | aasta | kuud | intress | jääkProtsent | jääkEuro | kuumakse |
            | 7500   | 10            | NA        | 0     | 6    | 7       | 25           | NA       | 840      |
            | 7500   | 35            | NA        | 1     | 1    | 15      | NA           | 75       | 403      |
            | 15000  | 10            | NA        | 3     | 0    | 7       | 0            | NA       | 416      |
            | 999999 | 70            | NA        | 7     | 0    | 30      | 10           | NA       | 8218     |
            | 7499   | 9             | NA        | 0     | 4    | 10      | 25           | NA       | 1278     |
            | -7500  | 10            | NA        | 0     | 6    | 7       | 25           | NA       | 0        |
            | 15000  | 10            | NA        | 0     | 6    | -7      | 25           | NA       | 1570     |








