# Függvények

## Function definition
JavaScriptben kétfélekép tudunk függvényeket definiálni.  
1. Function declaration (Függvény deklaráció)

```javascript
  function getGrossPriceFD(netPrice, vatPercent) {
    return netPrice * (1 + vatPercent / 100);
  }
```

2. Function expression (Függvény kifejezés)
```javascript
  const getGrossPriceFE = function (netPrice, vatPercent) {
    return netPrice * (1 + vatPercent / 100);
  }
```

## Callback function
A `callback function` vagy röviden csak `callback` egy olyan függvény, amelyet másik függvények adunk át paraméterként.  
Az a függvényt pedig, amelyik `callback`ekkel operál, `higher order function`nek hívjuk.

```javascript
  const numericArray = [234234, 5657, 234, 6, 8, 234346, 7];

  function compare(a, b) {
    return a - b;
  }

  numericArray.sort(compare);
```

A kettő között az a nagy különbség, hogy a függvény deklarációnál - hasonlóan, mint a változóknál itt is van hoisting - a függvény a törzsével együtt felemelődik, és így akárhol használható a kódban, a deklaráció előtt is. Ezzel szemben, mivel függvény kifejezésnél egy változóhoz rendeljük hozzá a függvényt, ezért csak a létrehozás után érjük el.

## Closure és curly
Amennyiben egy függvényt egy másik függvény visszatérési értéke, és ez hivatkozik egy, a külső függvényben található   adatra, akkor egy `closure` azaz lexikai zárvány jön létre. Ez azt jelenti, hogy a külső függvényben tárolt adat nem fog törlődni a memóriából a futása után, ugyanis van egy rá mutató hivatkozás. 

```javascript
  function makeCounter() {
    let counter = 0;
    return function increaseCounter() {
      counter += 1;
      console.log(counter);
    }
  }

  const increaseCounter = makeCounter();
  increaseCounter();  // 1
  increaseCounter();  // 2
  increaseCounter();  // 3

```

Amennyiben a visszaadott függvényt rögtön meg is akarjuk hívni, írhatjuk a következőt: 

```javascript
  makeCounter()();  // 1
```


## IIFE és a blokk hatókörű függvények
### Blokk scope-ú függvény
Ami kapcsoszárójelek között van, az egy blokk. Tehát a blokkszintű függvény a következő:

```javascript
  {
    function calculate(a, b) {
      return a + b;
    }
    console.log(calculate(1, 2)); // 3, mert 1+2
    {
      function calculate(a, b) {
        return a * b;
      }
      console.log(calculate(2, 3)); // 6, mert 2*3
    }
    console.log(calculate(2, 3)); // 5, mert 2+3
  }
```

Ha már a függvényeknél járunk, és tudjuk azt is, hogy a `{}` operátorokkal könnyedén tudunk kódblokkokat készíteni, akkor felmerülhet - jogosan - hogy az `IIFE`-ket lecserélhetjük blokk szintű függvényekre. Hiszen sok esetben ere használtuk őket.
Nézzük is pár példát. Figyeljük meg a különbségeket:

### Blokkszintű függvény strict mód nélkül

```javascript
  {
    function calculate(a, b) {
      return a + b;
    }
    console.log(calculate(1, 2)); // 3, mert 1+2
      {
        function calculate(a, b) {
          return a * b;
        }
        console.log(calculate(2, 3)); // 6, mert 2*3
      }
      console.log(calculate(2, 3)); // 5, mert 2+3
  }

  console.log(calculate(1, 2)); // 3, mert 1+2
```

### Blokkszintű függvény strict módban

```javascript
  'use strict';
  {
    function calculate(a, b) {
      return a + b;
    }
    console.log(calculate(1, 2)); // 3, mert 1+2
      {
        function calculate(a, b) {
          return a * b;
        }
        console.log(calculate(2, 3)); // 6, mert 2*3
      }
      console.log(calculate(2, 3)); // 5, mert 2+3
  }

  console.log(calculate(1, 2)); // Uncaught ReferenceError: calculate is not defined
```

### IIFE strict mód nélkül

```javascript
(function (){
    function calculate(a, b) {
        return a + b;
    }
    console.log(calculate(1, 2)); // 3, mert 1+2
        {
            function calculate(a, b) {
                return a * b;
            }
            console.log(calculate(2, 3)); // 6, mert 2*3
        }
    console.log(calculate(2, 3)); // 6, mert 2*3
})();

console.log(calculate(1, 2));  // Uncaught ReferenceError: calculate is not defined
```

### IIFE strict módban
```javascript
  'use strict';
  (function (){
    function calculate(a, b) {
      return a + b;
    }
    console.log(calculate(1, 2)); // 3, mert 1+2
      {
        function calculate(a, b) {
          return a * b;
        }
        console.log(calculate(2, 3)); // 6, mert 2*3
      }
    console.log(calculate(2, 3)); // 5, mert 2+3
  })();

  console.log(calculate(1, 2)); // Uncaught ReferenceError: calculate is not defined
```

## Default parameter
Végre valahára a függvény paramétereknek adhatunk alapértelmezett értéket. Tehát nem kötelező az adott paraméter(ek) megadása. Régen a következőt csináltuk:

```javascript
  function getGrossPrice(netPrice, vatPercent, discountPercent) {
    var netPrice = netPrice || 1000;
    var vatPercent = vatPercent || 27;
    var discountPercent = discountPercent || 5;
    return netPrice * ((100 - discountPercent) / 100) * (1 + vatPercent / 100);
}
```

Most pedig: 

```javascript
  function getGrossPrice(netPrice, vatPercent = 27, discountPercent = 5) {
    return netPrice * ((100 - discountPercent) / 100) * (1 + vatPercent / 100);
  }
```

Amennyiben paraméterként egy objektumot várunk, úgy a kód a következőképp módosul: 

```javascript
  function getGrossPrice({ netPrice = 1000, vatPercent = 27, discountPercent = 5 } = {}) {
    return netPrice * ((100 - discountPercent) / 100) * (1 + vatPercent / 100);
  }
```

A jobb oldali `={}` csupán amiatt kell, hogy a kód akkor is működjön, ha paraméter nélkül híjuk meg a függvényt. Ebben az esetben az alapértelmezett érték egy üres objektum lesz. 

## Spread Operator

Az előző leckében már volt róla szó, és ígértem, hogy részletesebben is kifejtem mi is az a `Spread Operator`.
Eddig annyit írtam, hogy:

*"Ennek a segítségével hasonlóan mint egy tömb, vagy objektum esetében, végig tudunk iterálni a kapott értékeken."*

Ezzel pedig a lényeget el is mondtam. Mikor érdemes használni:

### Az `apply` nélkül függvények hívására

```javascript
var args = [0, 1, 2];
function spreadOperator(x, y, z) {
  return x + y + z;
}

// ES6 előtt...
spreadOperator.apply(null, args);

// ...És most
spreadOperator(...args);
```

### Tömbök összefűzésére, másolására

```javascript
const firstArray = [1, 2, 3];
const secondArray = [4, 5, 6];
console.log([...firstArray, ...secondArray]); // [1, 2, 3, 4, 5, 6]
```

### Elemek slice-olására

```javascript
let str = "hello";
console.log([...str]); // ['h', 'e', 'l', 'l', 'o'], mint az str.slice()
```

###  Duplikált tömbelemek törlésére (erről később a Set-eknél lesz szó)

### Argumentumok tömbösítésére

```javascript
let params = [true, false, "hello", 5];

function spreadOperator(x, y, ...args) {
  console.log(x);
  console.log(y);
  console.log(args);
}

spreadOperator(1, 2, ...params); // 1, 2,  [true, false, 'hello', 5]
```

## Rest parameter

A `Rest parameter` hasonló, mint a `Spread Operator`, csak egy kicsit más szemszögből kell néznünk a dolgokat.
A következő példa után egyértelmű lesz:

```javascript
function restParameters(x, y, ...args) {
  return (x + y) * args.length;
}

console.log(restParameters(1, 2, "hello", true, 5)); // 15
```

Tehát az első két paraméter után a többi már iterálható lesz.

## Arrow function
Az  `arrow function` segítségével egyszerűbben tudunk létrehozni függvényeket függvény kifejezéssel.

Ha emlékszünk még erre:
```javascript
  const add = (a, b) => a + b;
  console.log(add(10, 20));
```
Az arrow function létrehozásának szabályai: 
* Elhagyjuk a `function` kulcsszót
* Az `arrow function` mindig anonim lesz
* A paraméter körüli zárójeleket törölhetjük (EZT CSAK AKKOR TEHETJÜK MEG HA PONTOSAN 1 PARAMÉTER VAN!)
* Elhagyhatjuk a kapcsos zárójeleket (NEM MINDIG!)
* Egy => jelet írunk a paramétere(k) után
* Elhagytuk a `return` kulcsszót (NEM MINDIG!)

Amennyiben az `arrow function` egy objektumot ad vissza, akkor a szintaxis a következőképp módosul: 

```javascript
  const arrowFunction = (firstName) => ({ name: firstName });
```
## Arrow function és a return utasítás
```javascript
  // implicit return
  const arrowFunction1 = (firstName) => { };
  console.log(arrowFunction1('John'));  // undefined

  // implicit return
  const arrowFunction2 = (firstName) => 'Hello ' + firstName + '!';
  console.log(arrowFunction2('John'));  // 'Hello John'

  // implicit return
  const arrowFunction3 = (firstName) => { name: firstName };
  console.log(arrowFunction3('John'));  // undefined (label van a blokkon belül)

   // implicit return
  const arrowFunction4 = (firstName) => ({ name: firstName });
  console.log(arrowFunction4('John'));  // { name: 'John'}

  // explicit return
  const arrowFunction5 = (firstName) => { return { name: firstName } };
  console.log(arrowFunction5('John'));  // { name: 'John'}
```

## Arrow function, mint callback 
Az `arrow function`ök egyik leggyakoribb alkalmazás ä `callback`eknél figyelhető meg:

```javascript
  const numericArray = [243235, 567, 79, 234, 567, 2, 4];
  numericArray.sort((a, b) => a - b);
  console.log(numericArray);
```

## Arrow function és a local binding
Az `arrow function`-nél nincs `local binding`. Tehát nincs `arguments`, `this`, `super`, `new.target`. Ha a  `arrow function`-ön belül megpróbáljuk elérni, akkor a `parent scope` lesz használva.

```javascript
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    fullName: () => {
      console.log(this);
    }
  };
  user.fullName();  // Window {0: global, window: Window, self: Window, …}
```
A parent nem más jelen esetben, mint a `Window`. Ezért nem szerencsés `arrow function`t használni objektum metódusként.  

Azonban objektum metóduson belül nagyon hasznos, hiszen egy ilyen esetben pont a parent scope-ból kell a `firstName`, `lastName`, és így nem kell egy külön változóba kimentem a `this` értékét:

```javascript
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    fullName() {
      setTimeout(() => {
        console.log(this.firstName, this.lastName);
      }, 3000)
    }
  };

  user.fullName();
```

`Arrow function` nélkül ez csak így lehetne megoldani:

```javascript
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    fullName() {
      const self = this;
      setTimeout(function() {
        console.log(self.firstName, self.lastName);
      }, 3000)
    }
  };

  user.fullName();
```

