# Algoritmizálás feladatok

## Feladatok

Az feladatok a [00-practice/excercies](./00-practice/excercies) mappában találhatóak.
A feladatok 4 csoportra vannak osztva nehézségi szint szerint:

- basic
- intermediate
- advanced
- expert
  A `start` mappában kell dolgoznod minden esetben! A kiinduló fájlok előre el vannak készítve. A fájlok végén az `export`, `export default` kulcsszavakkal találkozhatsz, ezeket hagyd módosítatlanul, a kódod ezek **FELETT** kell megírnod!  
  A megadott HTML-fájlba nem kell írnod semmit, csak a JS-fájlokban dolgozz!  
  A HTML-fájlok csak arra szolgálnak, hogy böngészőben is meg tudd tekinteni a megoldásod.

Írj egy-egy függvényt a megadott néven, amely az alábbi algoritmusokat valósítja meg!  
A paraméterként átadott tömb minden esetben szekvenciális, hacsak a feladat másként nem írja!  
A `sort()` metódust és a `Math` object metódusait nem használhatod, hacsak a feladat másként nem írja!  


## Tesztelés

Bármikor tesztelheted magad is a függvényeidet az alábbi parancsok segítségével:

- `npm run test:bas` - a basic feladatokat teszteli
- `npm run test:int` - az intermediate feladatokat teszteli
- `npm run test:adv` - az advanced feladatokat teszteli
- `npm run test:exp` - az expert feladatokat teszteli

### Basic

- `min` mappa:  
  Írj egy függvényt `getTheSmallestElement` néven, amely visszaadja a paraméterként kapott csak egész számokat tartalmazó tömb legkisebb elemét!
- `max` mappa:  
  Írj egy függvényt `getTheLargestElement` néven, amely visszaadja a paraméterként kapott csak egész számokat tartalmazó tömb legnagyobb elemét!
- `even-counter` mappa:  
  Írj egy függvényt `getCountOfTheEvenElements` néven, amely visszaadja a paraméterként kapott csak egész számokat tartalmazó tömb páros elemeinek a számát!
- `sum-and-avg` mappa:  
  Írj két függvényt `getSumOfTheElements` és `getAverageOfTheElements` néven.  
  A `getSumOfTheElements` visszaadja a paraméterként kapott csak egész számokat tartalmazó tömb összegét!  
  A `getAverageOfTheElements` visszaadja a paraméterként kapott csak egész számokat tartalmazó tömb átlagát! Használd fel a `getSumOfTheElements` függvényt!

### Intermediate

- `search-counter` mappa:  
  Írj egy függvényt `searchAndCount` néven, amely első paraméterként kap egy csak egész számokat tartalmazó tömböt és másodikként egy egész számot! A függvény visszatérési értéke egy egész szám, amely megadja, hogy a tömbben hányszor fordult elő a paraméterként kapott szám.
- `even-filter` mappa:  
  Írj egy függvényt `getOddEvenElements` néven, amely paraméterként egy pozitív egész számokat tartalmazó tömböt kap!
  A függvény visszatérési értéke egy olyan új tömb legyen, amely csak a páros számokat tartalmazza!
- `odd-filter` mappa:  
  Írj egy függvényt `getOddEvenElements` néven, amely paraméterként egy pozitív egész számokat tartalmazó tömböt kap!
  A függvény visszatérési értéke egy olyan új tömb legyen, amely csak a páratlan számokat tartalmazza!
- `number-string-sorter` mappa:  
  Írj egy függvényt `numberAndStringSorter` néven, amely paraméterként egy olyan tömböt kap, amely azonos darabú egész számot és string-et tartalmaz véletlenszerű sorrendben!
  Rendezd úgy a tömböt, hogy minden szám után egy string következzen!  
  Add vissza a tömböt!
- `sort-by-asc` mappa:  
  Írj egy függvényt `sortByAsc` néven, amely paraméterként kap egy csak egész számokat tartalmazó tömböt!
  A függvény visszatérési értéke egy olyan új tömb, amely növekvő sorrendben tartalmazza az elemeket.  
  Használd a `sort()` metódust!

### Advanced

- `section` mappa:  
  Írj egy függvényt `getSectionOfTwoArrays` néven, amely paraméterként két azonos elemszámú, csak egész számokat tartalmazó tömböt kap!
  A visszatérési érték a két tömb metszete (halmazművelet, relációs algebra)!
- `union` mappa:  
  Írj egy függvényt `getUnionOfTwoArrays` néven, amely paraméterként két azonos elemszámú, csak egész számokat tartalmazó tömböt kap!
  A visszatérési érték a két tömb uniója (halmazművelet, relációs algebra)!
- `difference` mappa:  
  Írj egy függvényt `getTheDifferenceBetweenTwoArrays` néven, amely paraméterként két azonos elemszámú, csak egész számokat tartalmazó tömböt kap!
  A visszatérési érték a két tömb különbsége (halmazművelet, relációs algebra)!
- `descartes` mappa:  
  Írj egy függvényt `getCartesianProductOfTwoArrays` néven, amely paraméterként két azonos elemszámú, csak egész számokat tartalmazó tömböt kap!
  A visszatérési érték a két tömb Descartes-szorzata (halmazművelet, relációs algebra)!
- `search` mappa:  
  Írj egy függvényt `linearSearch` néven, amely paraméterként kap egy csak egész számokat tartalmazó tömböt és egy egész számot!
  A függvény visszatérési értéke egy `boolean`, amelynek értéke `true`, ha a tömb tartalmazza a számot, és `false`, ha nem.
  Használj lineáris keresést, ha nem ismered, nézz utána!

### Expert

- `binary-search` mappa:  
  Írj egy függvényt `binarySearch` néven, amely paraméterként kap egy csak egész számokat tartalmazó tömböt és egy egész számot! A függvény visszatérési értéke egy `boolean`, amelynek értéke `true`, ha a tömb tartalmazza a számot, és `false`, ha nem.  
  **Használj logaritmikus keresést; ha nem ismered, nézz utána!**
- `custom-sort` mappa:  
  Írj egy függvényt `customSort` néven, amely a javított buborékos rendezés algoritmus segítségével rendezi a paraméterként kapott tetszőleges elemszámú tömb elemeit növekvő sorrendben! A **NEM szám** típusú elemeket rakd a tömb végére az eredeti sorrendben! Add vissza az új tömböt!  
  **A buborékos rendezési algoritmust a soron következő feladatoknál is használhatod!**
- `nth-smallest` mappa:  
  Írj egy függvényt `getNthSmallestElement`, amely két paramétert kap. Az első egy csak egész számokat tartalmazó tömb, a második **N** egy egész szám. A függvény visszaadja a paraméterként kapott tömb **N**-edik legkisebb elemét! Amennyiben ez nem létezik, úgy `null`-t.
- `nth-largest` mappa:  
  Írj egy függvényt `getNthLargestElement` néven, amely két paramétert kap. Az első egy csak egész számokat tartalmazó tömb, a második **N** egy egész szám. A függvény visszaadja a paraméterként kapott tömb **N**-edik legnagyobb elemét! Amennyiben ez nem létezik, úgy `null`-t.
- `insertion-sort` mappa:  
  Írj egy függvényt `insertionSort` néven, amely paraméterként kap egy tetszőleges elemszámú, csak egész számokat tartalmazó tömböt! A tömb elemeit rendezd növekvő sorrendbe! Ezután a felhasználótól kérj be egy számot (addig kérjünk be értéket, amíg valóban egy véges egész számot ad meg). A számot szúrjuk be a tömbbe úgy, hogy a tömb továbbra is rendezett maradjon, tehát a megfelelő indexű helyre kerüljön be a plusz elem.
  Add vissza a tömböt!
