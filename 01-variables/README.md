# Változók

## ES6+, azaz az ECMAScript 2015 utáni szabványai

A következő leckékben részben az _ES6_-nak nevezett új szabvány JavaScript\_-ben való újdonságairól fogtok tanulni.

Mindenekelőtt had szögezzem le, hogy amennyiben bármelyik "újdonságot" (2015 nem tagnap volt, szóval annyira nem is új) szeretnétek használni, győződjetek meg róla, hogy milyen böngésző támogatja, és melyik verziótól.
Erre a [kangax](https://kangax.github.io/compat-table/es6/), vagy a [caniuse](https://caniuse.com) oldal tökéletes.

Az [MDN web docs](https://developer.mozilla.org) oldalon is sok érdekességet olvashattok. A hivatalos [ECMAScript dokumentációban](https://www.ecma-international.org/ecma-262/) pedig szinte minden kérdésre megtaláljátok a választ.

## Változók és konstansok

## Hoisting

A `var` kulcsszóval létrehozott változók a deklarálás előtt is elérhetőek, azonban ilyen esetben mindig `undefined` értékkel rendelkeznek.

```javascript
console.log(sampleVariable) // undefined
var sampleVariable = 'global'
console.log(sampleVariable) // global
```

Ennek az az oka, hogy a JavaScript Engine a változók deklarációját felemeli, globális kód esetében a fájl tetejére, függvények esetében a függvények elejére. Ezt a mechanizmust nevezzük `hoisting`-nak.  
A `var` kulcsszóval létrehozott változók ezen kívül automatikusan inicializálódnak `undefined` kezdőértékkel. Ezért lehetséges őket elérni a kódban történő tényleges deklarálás előtt.  
A fenti kód működés tekintetében az alábbival egyezik meg:

```javascript
var sampleVariable = undefined
console.log(sampleVariable)
sampleVariable = 'global'
console.log(sampleVariable)
```

## Scope

A `scope` nem más, mint a változók (és függvények) hatóköre, azaz a kódnak az a része, amelyen belül elérhetők.  
A `var` kulcsszóval létrehozott változók `function scope`al, azaz függvény hatókörrel rendelkeznek. Ez azt jelenti, hogy ha egy függvényen belül létrehozunk egy változót, akkor a függvényen belül - azaz lokálisan - mindenhol elérhető. Ha a globális kódban hozzuk létre, akkor a teljes kódban elérhető.

```javascript
var globalScope = 'global'

function sampleFunction() {
  console.log(globalScope)
}

function sampleFunction2() {
  var localScope = 'local'
  console.log(localScope)
}

sampleFunction() // 'global'
sampleFunction2() // 'local'
console.log(localScope) // ReferenceError: localScope is not defined
```

## Shadowing

Abban az esetben, ha mind lokálisan, és mind globálisan ugyanolyan nevű változót hozunk létre - ami nem túl szerencsés - akkor lokálisan, azaz a függvényen belül csak a lokális változót érjük el, a globálisat nem.

```javascript
var globalScope = 'global'

function sampleFunction() {
  var globalScope = 'local'
  console.log(globalScope)
}
sampleFunction() // 'local'
console.log(globalScope) // 'global'
```

## Memory leak

Nagyon könnyen tudunk `memory leak`et azaz memórialyukat, memóriaszivárgást okozni, ha elfelejtjük a változó létrehozásához szükséges kulcsszót kitenni a változó neve elé. Ugyanis a változó ebben az esetben is létrejön, azonban globálisan.

```javascript
function sampleFunction() {
  localVariable = 'local'
  console.log(localVariable)
}

sampleFunction() // 'local'
console.log(localVariable) // 'local'
```

## Nested scope

A `scope` azaz a hatókörök esetében is beszélhetünk egymásba ágyazásról. Az alábbi példában egy változót hozunk létre `sampleVariable` névvel az `outerFunction` függvényen belül. Majd ezen függvényen belül újabb függvényeket deklarálunk. Látható, hogy a belső függvények szintén hozzáférnek a változóhoz.

```javascript
function outerFunction() {
  var sampleVariable = 1
  console.log(sampleVariable)

  function innerFunction1() {
    sampleVariable = 2
    console.log(sampleVariable)

    function innerFunction2() {
      console.log(sampleVariable)
    }
    innerFunction2()
  }
  innerFunction1()
}

outerFunction()
```

Fordítva ez már nem lenne igaz, tehát a belső függvényekben deklarált változók a külsőbb függvényekből már nem elérhetőek.

## let

### Temporary Dead Zone

A `let`-el létrehozott változó inicializálás előtt nem elérhető.
Van `hoisting` itt is. A `var`-al definiált változóhoz képest a `let`-el létrehozottnál a különbség az inicializálásnál van. A `var`al létrehozott inicializálódik `undefined` értékkel, azonban a `let`tel létrehozott nem. Tehát ha megpróbáljuk elérni, `ReferenceError`-tkapunk, ami nem azt mondja, hogy nem létezik a változó, hiszen a `hositing` miatt felemelődik, mindösszesen csak nem lesz elérhető inicializáció előtt. A `let\const\class` csak akkor lesz inicializálva, amikor az utasítás kiértékelődik. A kiértékelés előtti részt `Temporary Dead Zone`-nak hívjuk.

```javascript
console.log(sampleVaribale) // ReferenceError: Cannot access 'sampleVaribale' before initialization
let sampleVaribale = 'sample'
```

### Redeclaration

A `let`-tel deklarált változót nem lehet újra deklarálni.

```javascript
let sampleVariable // undefined
let sampleVariable // Uncaught SyntaxError: Identifier 'sampleVariable' has already been declared
```

### Block scope

Blokkszintű (`block scoped`) változókat tudunk létrehozni a `let` kulcsszó segítségével.
Amennyiben `let`-el hozunk létre egy változót, ugyanúgy lehet globális, mint `var` esetében - ha nem függvényen belül hozzuk létre - de egyébként csak egy adott blokkon belül, leegyszerűsítve a nyitó `{` és a záró `}` között létezik.

A következő esetben jól látható, hogy a `var`-al létrehozott változó esetében az adott blokkon kívülről is elérhető a változó. Mivel nem egy függvényen belül lett létrehozva, így globálisan elérhető lesz.
A `let`-el létrehozott változó esetében viszont csak az adott blokkon belül lesz elérhető.

```javascript
{
  let sampleVariable = 1
  console.log(sampleVariable)
}
console.log(sampleVariable) // Uncaught ReferenceError: sampleVariable is not defined
```

### if else

Mivel az `if` és az `else` ág is külön-külön blokkok, ezért az ezekben létrehozott változók kívülről nem lesznek elérhetőek, csak a kapcsoszárójeleken belül.

```javascript
if (value === 1) {
  let result = true // csak itt érhető el
} else {
  let result = false // csak itt érhető el
}
console.log(result) // ReferenceError: result is not defined
```

### Switch case

A`switch case` vezérlési szerkezet esetében a `switch` maga egy blokk, csak ott vannak kapcsos zárójelek, tehát a `case`ek nem számítanak külön blokknak. Azaz nem hozhatunk létre a `case`eken belül ugyanolyan névvel változókat, hiszen az már létezik, ez pedig olyan ,minta újra deklarálnánk, ami nem lehetséges `let` esetében.

```javascript
let value = 1

switch (value) {
  case 0:
    let result = 'Nulla'
    break
  case 1:
    let result = 'Egy' //  Identifier 'result' has already been declared
    break
  default:
    let result = 'Null'
}
```

### Esemény figyelők let nélkül

Egy gyakori eset, amikor több elemre akarunk eseményfigyelőt hozzárendelni, és az elemek bejárásához egy `for` ciklust használunk. Ilyenkor nem várt hibába ütközünk.

```html
<button class="click-me">Click me PLÍÍÍÍZ!</button>
<button class="click-me">Click me PLÍÍÍÍZ!</button>
<button class="click-me">Click me PLÍÍÍÍZ!</button>
```

```javascript
var elements = document.querySelectorAll('.click-me')
for (var i = 0; i < elements.length; i += 1) {
  elements[i].addEventListener('click', function () {
    console.log('item: ' + i) // minidig 3 lesz a konzolon
  })
}
```

A `console.log()`-on belül az `i` értéke mindig 3 lesz, ugyanis amikor az esemény bekövetkezik, a ciklus már lefutott. Az `i` továbbra is elérhető, az értéke pedig jelen esetben 3, az elemek száma, ami a kilépési feltétel.

Ezt eddig csak úgy tudtuk megoldani, - ami egyébként szebb is - hogy az eseményfigyelő callback függvényét kiszerveztük:

```javascript
function clickHandler(i) {
  elements[i].addEventListener('click', function () {
    console.log('item: ' + i)
  })
}

var elements = document.querySelectorAll('.click-me')
for (var i = 0; i < elements.length; i += 1) {
  clickHandler(i)
}
```

### Esemény figyelők let-tel

Ha a `for loop header`-ben deklaráljuk, minden egyes iterációnál új `binding` lesz. Valamint a `scope` a ciklusmagra is vonatkozik. (Az `IE11` nem támogatja a `let`-et ebben az egy esetben, sem `strict` módban sem anélkül. Mintha `var`-t használtunk volna.)  
A `let`-et emiatt nagyon jól használhatjuk több elemhez való eseményfigyelő hozzárendeléséhez is:

```javascript
let elements = document.querySelectorAll('.click-me')
for (let i = 0; i < elements.length; i += 1) {
  elements[i].addEventListener('click', function () {
    console.log('item: ' + i) // jelen esetben 0 vagy 1 vagy 2
  })
}
```

## Polyfill és transpiler

### Polyfill

Ha egy új projekt-et kezdtek, a specifikációban meg lesz szabva, hogy az alkalmazásnak milyen böngészők milyen verziójában kell működnie. Ekkor már tudjuk, hogy az új szabványból mi is az, ami natív módon támogatott. Szerencsére nem kell kétségbe esni akkor sem, ha olyan böngészőre kell fejlesztenünk, ami
nem támogatja az új szabványt. Lehetőségünk van ugyanis `polyfill`-ek és `transpiler`-ek használatára.

_A `polyfill` egy olyan kód/kódrészlet, mely biztosítja számunkra azt a működést, melyet natív módon elvárnánk a böngészőtől._

Abban az esetben, ha valamilyen új szabvány adta új `property`-t, `method`-ot szeretnénk használni, de az nem támogatott valamelyik böngészőben, melyben működnie kell a kódunknak, nagy segítségünkre lehetnek a `polyfill`-ek. Ezek segítségével emulálni tudjuk a működést.

Ha használni akarjuk az `String.includes()` metódust, de az IE11-ben nem támogatott, írhatunk egy saját kódot, vagy használhatunk már mások által megírtakat, hogy az új metódus működését szimuláljuk.

```javascript
if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    'use strict'
    if (typeof start !== 'number') {
      start = 0
    }
    if (Number.isNaN(search) || start + search.length > this.length) {
      return false
    } else {
      return this.indexOf(search, start) !== -1
    }
  }
}
```

### Transpiler

_A `transpiler`-ek olyan eszközök, amelyek egy adott nyelvben írt kódot átalakítanak egy másik nyelv ekvivalens kódjává. A JavaScript esetében ez nem feltétlenül egy másik nyelvet, hanem a szabvány egy másik verzióját jelenti._

Tehát `transpiler`-eket akkor érdemes használni, ha nem csak új tulajdonságokat, metódusokat akarunk használni, hanem újfajta szintaxist is. A `traspiler`-ek sem támogatnak mindent. Ezt mindig ellenőrizzük! A `transpiler`-ek használata általgenerált kód performancia szempontjából sokkal rosszabb lehet, mint a natív kód.

A [Babel](https://babeljs.io) az egyik legnépszerűbb transpiler. Csak a szintaxist alakítja át, de a `babel-polyfill` segítségével a `Promise`-ok, és az új metódusok használata is támogatott.

Arra szolgál, hogy az általunk megírt _ES6_-os _javascript_ kódot áttransponálja a régi szabvány szerintire. Másszóval az _ES6_-os (vagy újabb) kódunkból _ES5_-os verziójút készít.
(A `Babel` beállításai és plugin-jai segítségével rengetek egyéb opció is a rendelkezésünkre.)
Remekül testre szabható, konfigurálható eszközről van szó. Méltán népszerű. Nézzünk meg egy példát mi történik, ha az új szabvány szerinti `class` kulcsszóval hozunk létre egy új osztályt, és ezt a kódot a régebbi szabvánnyá alakítjuk.

**Az eredeti kód:**

```javascript
class A {}
```

**és a transzponált:**

```javascript
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

var A = function A() {
  _classCallCheck(this, A)
}
```

## const - konstansok

Lehetőségünk van konstansok létrehozására a `const` kulcsszóval.
A konstans egy `immutable binding`-ot készít. Tehát nem a konstansban tárolt adat, hanem a `binding` maga módosíthatatlan. Azaz nem tehetjük ki újra a változó neve után az egyenlőségjelet többé, a reassignment hibát eredményez. A `let`-nél tárgyalt `scope` szabályok a konstansra is érvényesek.

**Nézzünk egy példát:**

```javascript
const sampleVariable = 'value'
console.log(sampleVariable)
sampleVariable = 'new value' //  TypeError: Assignment to constant variable.
```

Láthatjuk, hogy ha a konstans értékét meg akarjuk változtatni, hibát kapunk.
Azonban van kivétel:

```javascript
const sampleObject = {
  firstName: 'John',
  lastName: 'Doe'
}

sampleObject.firstName = 'Jane'
console.log(sampleObject) // {firstName: 'Jane', lastName: 'Doe'}
```

Nem kapunk hibát, ha az objektum tulajdonságát megváltoztathatjuk. Ha a konstans egy objektumot tárol, akkor a tulajdonságai, metódusai módosíthatók.

Azonban:

```javascript
const sampleObject = {
  firstName: 'John',
  lastName: 'Doe'
}

sampleObject = {} // TypeError: Assignment to constant variable.
```

Ebben az esetben hibát kapunk. A reassignment továbbra sem megengedett.

A legtöbb programozási nyelvben a konstansoknak névadásánál csak nagybetűket használnak. JavaScriptben ugyanazok a névadási szabályok vonatkoznak a konstansokra is, mint a változókra. Használjuk nyugodtan a camelCase elnevezést.

Mikor melyiket használjam? `var`, `let`, esetleg `const`? Felmerülhet a kérdés. A `var` használatát már érdemes kerülni, ha már az új szabvány szerint írjuk a kódot. Abban az esetben, ha az adott érték biztosan nem változik meg a program futása során, használjunk `const`-ot, minden más esetben pedig `let`-et.

## Object.freeze() - az objektum "lefagyasztása"

A JavaScript-ben lehetőségünk van arra, hogy egy objektumot _"lefagyasszunk"_.
Ezzel elérhetjük azt hogy ne tudjuk megváltoztatni az objektum tulajdonságait, metódusait. A _"lefagyasztott"_ elem `immutable`. Nem csak konstansoknál használhatjuk, hanem bármilyen objektumon.
Nem "fagyaszthatunk" le bármit. A `window`-t például nem lehetséges, de a `document`-et már igen.
Az `Object.freeze()` nem visszavonható, tehát NINCS `unfreeze()` vagy hasonló metódusunk. (Ez persze nem jelenti azt, hogy nincs rá megoldás.)

```javascript
'use strict'

const user = {
  firstName: 'John',
  lastName: 'Doe'
}

Object.freeze(user)

user.firstName = 'Jane' // TypeError: Cannot assign to read only property 'firstName' of object '#<Object>'
console.log(user)
```

Nagyon fontos, hogy hibát csak akkor kapunk, ha `strict` módot használunk. Anélkül nem kapunk hibaüzenetet, egyszerűen csak nem módosul a property.  
Ezen felül, ha valamelyik objektum property szintén egy objektum, akkor az már módosítható, tehát az `Object.freeze()` csak a legfelsőbb szintű propertykre vonatkozik.

## Memory lifecycle

A JavaScript memóriakezelése három fő lépésből áll:

- Memóriaterület lefoglalása (Allocate)
- Memóriaterület írása/olvasása (Use)
- Memóriaterület felszabadítása (Release - Garbage collection)

Amikor létrehozunk egy változót és értéket adunk neki, az alábbiak történnek:

1. Egyedi azonosító létrehozása
2. Memóriaterület lefoglalása
3. Érték tárolása a lefoglalt memóriaterületen

A JavaScript Engine a memóriaterületet két részre osztja: Heap, és Stack.  
A Heap egy nagy méretű rendezetlen memóriaterület, itt kerülnek tárolásra az objektumok.
A Stack, azaz verem, egy FIFO (First In Last Out) tároló, itt tárolódnak a primitívek.
