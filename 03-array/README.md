# Tömbök

## forEach()
Amennyiben eddig valamelyik `for` ciklussal jártunk be egy tömböt: 

```javascript
  const numericArray = [345, 5471234, 53457, 123543, 542, 234];
  for (let i = 0; i < numericArray.length; i += 1) {
    console.log(numericArray[i]);
  }
```

Lehetőség van megoldani mindezt a `forEach()` tömb metódus segítségével is. A `forEach()` a paraméterként kapott függvény hívja meg mindegyik tömbelemen. A `callback` bármilyen kódot tartalmazhat.

```javascript
  numericArray.forEach(item => console.log(item));
```
## map()
A `map()` metódust arra használjuk, hogy egy tömb elemein valamilyen műveletet végezzünk, és egy új tömböt állítsunk elő.  Az eredeti tömböt nem módosítja.

```javascript
  const numericArray = [11, 22, 33, 44, 55];
  const exponentArray = numericArray.map(item => item ** 2);
  console.log(exponentArray);   // [121, 484, 1089, 1936, 3025]
```
## filter()
A `filter()` metódust arra használjuk, hogy egy tömb elemeit valamilyen feltétel alapján leszűrjük, és egy új tömböt állítsunk elő. Az eredeti tömböt nem módosítja.

```javascript
  const numericArray = [11, 22, 33, 44, 55];
  const evenArray = numericArray.filter(item => item % 2 === 0);
  console.log(evenArray);   // [22, 44]
```

## reduce()
A `reduce()`, ahogy a neve is mutatja arra jó, hogy egy tömb elemeit redukáljuk. A paraméterként kapott callback a visszatérési értékét átadja a következő függvényhívásnak. A `prevoiusValue` a tömb első elemének az értéke (ha nem volt megadva 2. paraméterként alapértelemzett érték), utána a függvények visszatérési értéke kerül bele. A `currentValue` pedig az aktuális tömbelem.

```javascript
  const numericArray = [11, 22, 33, 44, 55];
  const sumOfArray = numericArray.reduce((prevoiusValue, currentValue) => prevoiusValue + currentValue);
  console.log(sumOfArray);  // 165
```

## flat()
A `flat()` segítségével egy többdimenziós tömböt tudunk egydimenzióssá alakítani.  
A paraméterként megadott érték a mélység, azaz hány dimenzióig történjen meg az átalakítás. 

```javascript
  const matrix = [11, 22, 33, [44, 55, [66, 77]]];
  console.log(matrix.flat(Infinity));
```
## flatMap()
A `flatMap()` nem más, mint két metódus a `flat()` és a `map()` összevonása: 

```javascript
  const numericArray = [11, 22, 33, 44, 55];
  const exponentialFlatArray = numericArray.flatMap(item => [item, item ** 2, item ** 3]);
  console.log(exponentialFlatArray); //  [11, 121, 1331, 22, 484, 10648...]
```
### Új tömb metódusok
- `find()` - Visszaadja a tömb keresett elemét, ha nem talál `undefined`-el tér vissza.
- `findIndex()` - Visszaadja a tömb keresett elemének indexét, ha nem talál -1-el tér vissza.
- `some()` - Megadja, hogy a tömb valamely elemére igaz e a keresési feltétel.
- `every()` - Megadja, hogy a tömb összes elemére igaz e a keresési feltétel.

### Típusos tömbök
Lehetőségünk van típusos tömbök létrehozására. Tehát csak és kizárólag olyan elemeket tartalmazhatnak ezek a tömbök, melyek adott típusba tartoznak. Ezek a következők:

- `Int8Array()` - 8 bites előjeles egész
- `Uint8Array()` - 8 bites előjel nélküli egész
- `Uint8ClampedArray()` - 8 bites előjel nélküli egész (a nem megfelelőértékeket módosítja a legkisebb/legnagyobb értékre)
- `Int16Array()` - 16 bites előjeles egész
- `Uint16Array()` - 16 bites előjel nélküli egész
- `Int32Array()` - 32 bites előjeles egész
- `Uint32Array()` - 32 bites előjel nélküli egész
- `Float32Array()` - 32 bites lebegőpontos
- `Float64Array()` - 64 bites lebegőpontos
