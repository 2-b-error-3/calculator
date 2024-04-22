@maksegraafik
Feature: Kasutajale kuvatakse liisingu kuumakse vastavalt kasutaja sisestatud andmetele

    Background: Kasutaja sisestab liisingu kalkulaatorisse tüüptingimuste andmed
        Given Kasutaja on liisingu kalkulaatori lehel
        When Kasutaja nõustub küpsiste kasutamisega
        Then Kalkulaatori väljadelt kustutatakse andmed
        When Kasutaja sisestab sõiduki hinna "15000", sissemakse "10" % või sissemakse "NA" eurodes
        Then Finantseeritav summa peab olema vähemalt 5000 eurot hinnast 15000 arvestades sissemakset 10
        When Kasutaja sisestab liisingu perioodi pikkuse aastates "3" ja kuudes "0"
        When Kasutaja sisestab liisingu intressi "7" %
        When Kasutaja sisestab jääkväärtuse "0" % või "NA" eurodes
        Then Vara maksumus peab olema suurem kui 7500 eurot
        Then Liisingu intress peab olema suurem kui 0

    Scenario: Kasutaja sisendab andmed kuumaksu arvutamiseks
        Given Kontrolli annuiteedi kuumakset, kui hind 15000 eurot, sissemakse 10%, periood 36 kuud, intress 7% ja jääk 0
        When Kasutaja vajutab nupule "Maksegraafik"
        Then Kasutaja võrdleb tüüptingimuste kogusummat 16506.26 eurot ilma lepingutasuta maksegraafiku kogu summaga