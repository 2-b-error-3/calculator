@maksegraafik
Feature: Kasutajale kuvatakse liisingu kuumakse vastavalt kasutaja sisestatud andmetele

    Background: Kasutaja sisestab liisingu kalkulaatorisse tüüptingimuste andmed
        Given Kasutaja on liisingu kalkulaatori lehel
        When Kasutaja nõustub küpsiste kasutamisega
        Then Kalkulaatori väljadelt kustutatakse andmed
        When Kasutaja sisestab sõiduki hinna "15000", sissemakse "10" % või sissemakse "NA" eurodes
        When Kasutaja sisestab liisingu perioodi pikkuse aastates "3" ja kuudes "0"
        When Kasutaja sisestab liisingu intressi "7" %
        When Kasutaja sisestab jääkväärtuse "0" % või "NA" eurodes
        Then Vara maksumus peab olema suurem kui 7499 eurot
        Then Liisingu intress peab olema suurem kui 0

    Scenario: Kasutaja sisendab andmed kuumaksu arvutamiseks
        Given Kasutajale kuvatakse "416" eurodes
        When Kasutaja lahutab tüüptingimuste kogusummast 16656.26 lepingutasu 150 eurot
        When Kasutaja vajutab nupule "Maksegraafik"
        Then Kasutaja võrdleb tüüptingimuste kogusummat 16506.26 maksegraafiku kogu summaga