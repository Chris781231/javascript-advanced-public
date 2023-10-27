## Egyéb újdonságok
## for..of 
Egy újabb ciklus. A `for..in`-hez nagyon hasonló, viszont ez nem a kulcsokon, hanem az értékeken szalad végig. A segítségével bármilyen iterálható objektumon végig tudunk menni. Ugyanúgy működik szinte, mint egy sima `for` ciklus. Azt tartsuk észbe - hogy ha tömbnél használnánk - ,hogy ugyanúgy mint a `for`, ha a tömb nem folytonos, akkor az üres elemeken is végigmegy.

```javascript
  const numbers = [345, 76, 24, 7682, 354];

  for (let key of Object.keys(numbers)) {
      console.log(key);
  }
```

## Intl objektum
### Collator
Az `Intl` objektum szerint lehetőségünk van lokalizáció szerinti dátum, pénznem formázására, karaktereket összehasonlítására. 
A `Collator` használatával adott nyelv szerinti string összehasonlítást végezhetünk. Ha több nyelvben is előfordul ugyanaz a karakter, de más az ABC szerinti elhelyezkedése, akkor az `Intl.Collator` nélkül nem mindig kapnánk a megfelelő eredményt egy összehasonlításnál.  

```javascript
  const charList = ['ä', 'a', 'z'];
  const germanCollator = new Intl.Collator('de');
  const swedishCollator = new Intl.Collator('sv');
  console.log(charList.sort(germanCollator.compare));   // ['a', 'ä', 'z']
  console.log(charList.sort(swedishCollator.compare));  // ['a', 'z', 'ä']
```
### NumberFormat
A `NumberFormat` segítségével egyszerűen lehet a megfelelő lokalizáció szerint formázott összeget, és a hozzá tartozó pénznemet megjeleníteni:

```javascript
  const usCurrency = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
  });
  const gbCurrency = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
  });
  const deCurrency = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
  });

  console.log(usCurrency.format(100200400.45));   // $100,200,400.45
  console.log(gbCurrency.format(100200400.45));   // £100,200,400.45
  console.log(deCurrency.format(100200400.45));   // 100.200.400,45 €
```
### DateTimeFormat
Ugyanígy lehetséges a megfelelő lokalizáció szerinti formátumban a dátumot is megjeleníteni:

```javascript
  const now = new Date();
  console.log(new Intl.DateTimeFormat('hu-HU').format(now));  // 2022. 01. 18.
  console.log(new Intl.DateTimeFormat('en-US').format(now));  // 1/18/2022
```

## Symbol

A `Symbol()`  egy új primitív típus. A `new Symbol ()`-al való létrehozás nem támogatott. A szimbólum fő jellemzője, hogy minden esetben egy egyedi értéket ad vissza.  
Ez azt jelenti, hogy létrehozhatunk két szimbólumot, mely ugyanazt az értéket tartalmazza, de mivel a szimbólum egy egyedi azonosítót ad vissza, ezért ha összehasonlítjuk őket érték és típus alapján, különbözni fognak. 
Egy opcionális `string` paramétere van.

### Létrehozása

```javascript
  const mySymbol = Symbol();
  console.log(typeof mySymbol);           // symbol
  const mySymbol2 = Symbol('mySymbol');
  const mySymbol3 = Symbol('mySymbol');
  console.log(mySymbol2 == mySymbol3);    // false
  console.log(mySymbol2.toString());      // Symbol(mySymbol)
```

### for és keyFor metódusok
A `Symbol()`-nak, akárcsak a tömböknek van `length` tulajdonsága, és néhány fontos metódusa:

- `Symbol.for(key)`: Megkeresi a paraméterként megadott kulcsú szimbólumot. Ha megtalálja visszaadja azt, nincs találat, akkor létrehozza a szimbólumot a kulccsal.
- `Symbol.keyFor(sym)`: Visszaadja a magadott szimbólum kulcsát.

```javascript
  const id = Symbol.for('id');
  console.log(id.description);              // id
  const anotherId = Symbol.for('id'); 
  console.log(id === anotherId);            // true

  const nameSymbol = Symbol.for('name');
  console.log(Symbol.keyFor(nameSymbol));   // name
  console.log(nameSymbol.description);      // name
```

### Symbol objektum propertyként
Ha egy `Symbol`t objektum tulajdonságként használunk fel, az nem fog megjelenni egy iterációban, ha bejárjuk az objektum tulajdonságait. Viszont a `getOwnPropertySymbols()` metódussal elérhetővé válik. 

```javascript
  const id = Symbol('id');
  const person = {
      [id]: 1,
      firstName: 'John',
      lastName: 'Doe'
  }

  for (const key in person) {
      if (person.hasOwnProperty(key)) {
          console.log(key);   // firstName, lastName
      }
  }

 console.log(Object.getOwnPropertySymbols(person).map(symbol => person[symbol])); // [1]
```


## Map
A `Map` egy újfajta adatszerkezet. Más programozási nyelvekben az asszociatív tömbökhöz, vagy dictionary-hoz hasonló, tehát kulcs - érték `(key-value)` párokat tartalmaz.

Néhány fontosabb metódusa - a teljesség igénye nélkül:

- `set()` - értékadás
- `get()` - adott kulcsú elem értékének lekérdezése
- `has()` - megadja, hogy egy adott kulcsú elem létezik e
- `keys()`  - visszaadja a kulcsokat
- `values() ` - visszaadja az értékeket
- `delete()` - adott kulcsú elem törlése
- `clear()` - Map összes elemének törlése

**WeakMap**
A következőkben tér el a `Map`-től:

- A `Weak` típusok gyenge referenciával rendelkeznek a tárolt objektumra, nem akadályozzák meg a `garbage collection`-t, ha nincs semmilyen más hivatkozás egy tárolt objektumra. Így memóriát spórolhatunk a használatukkal.

```javascript
  let key1 = {
      name: 'John Doe'
  };
  let key2 = {
      name: 'Jane Dee'
  };
  const sampleMap = new Map();
  const sampleWeakMap = new WeakMap();

  sampleMap.set(key1, 'dead');
  sampleWeakMap.set(key2, 'dead');

  console.log(sampleMap.get(key1));     // dead
  console.log(sampleWeakMap.get(key2)); // dead

  key1 = null;
  sampleMap.forEach((value, key) => {
      console.log(key);                 // {name: 'John Doe'}
  });
  key2 = null;
  console.log(sampleWeakMap.get(key2)); // null
```

* A fentiekből következik, hogy a `WeakMap` nem biztosít semmilyen metódust/függvényt, amivel elérhetőek lennének a kulcsok. Ez a gyakorlatban annyit jelent, hogy a `get()`, `set()`, `has()`, `delete()` metódusokon kívül mást nem használhatunk.
* a `WeakMap` kulcsai nem lehetnek primitív típusok

## Set
A `Set` nagyon hasonlít egy tömbhöz, azonban a tömbbel ellentétben csak egyedi értékeket tartalmaz. Ergo egy elem nem fordulhat benne elő többször.

Néhány fontosabb metódusa - a teljesség igénye nélkül:

* `add()` - új érték hozzáadása
* `entries()` - értékek lekérdezése
* `has()` - megadja, hogy egy adott kulcsú elem létezik e
* `values()` - visszaadja az értékeket
* `delete()` - adott kulcsú elem törlése
* `clear()` - Map összes elemének törlése

**WeakSet**

Szinte ugyanaz, mint a `Set` néhány apróság kivételével, melyek a `Map` és `WeakMap` analógiája alapján könnyen megérthetők:

* Csak objektumokat tárolhatunk benne

Tehát akárcsak a `WeakMap` esetében nem lehet végigiterálni az elemein, nincs `clear(), keys(), values(), entries(), forEach()` metódusa, és `size` tulajdonsága se.


## Objektumok
### Property shorthand
Egy objektum tulajdonságainak megadása már történhet az alábbi módon is:

```javascript
  const firstName = 'John';
  const lastName = 'Doe';
  const user = {
      firstName,
      lastName
  };
```

### Method Properties
Hasonló egyszerűsítés történt az objektum metódusainál is:

```javascript
  const user = {
    create() {},
    read() {},
    update(id) {},
    delete() {},
  }
```

### Computed Property Names
Sőt, lehetőségünk van számított tulajdonságok létrehozására az alábbi módon:

```javascript
  const key = 'key';
  const value = 'value';
  const myObj = {
      [key]: value,
      [`computed${key}123`]: 'computed'
  };
  console.log(myObj); // {key: 'value', computedkey123: 'computed'}
```

### Dynamic Properties
Az objektumok tulajdonság-érték párjait teljesen dinamikusan is legenerálhatjuk az alábbi módon: 
```javascript
  const keys = ['key1', 'key2', 'key3'];
  const values = ['values1', 'values2', 'values3'];
  const myObj = {
      [keys.shift()]: values.shift(),
      [keys.shift()]: values.shift(),
      [keys.shift()]: values.shift(),
  };
  console.log(myObj); // {key1: 'values1', key2: 'values2', key3: 'values3'}
```