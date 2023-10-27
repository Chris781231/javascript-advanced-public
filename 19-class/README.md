# Osztályok

## class - osztályok létrehozása

A JavaScript-ben is tudunk _"osztályokat"_ létrehozni a `class` kulcsszó segítségével.

Fontos megjegyezni, hogy ez a `class` nem "olyan" `class`, ahogy esetleg más nyelvekben megszoktuk. A JavaScript-ben továbbra sincsenek osztályok, és továbbra is prototípus alapú öröklődés van. Annyi változott, hogy kaptunk egy `class pattern`-t, aminek a segítségével már hasonló módon tudunk új objektumokat létrehozni, mint más nyelvben.

Néhány tudnivaló:

- a `class` kulcsszót használjuk az osztály létrehozásához
- a konstruktor neve mindig `construct` (Nem kötelező metódus)
- van öröklődés
- elérhetjük az _"ősosztály"_ metódusait
- használhatunk `get()` és `set()` "metódusokat"
- van publikus, privát és statikus módosító

`class`-t definiálni kétféleképp tudunk. Egyrészt osztály deklarációval (`class declarations`), másrészt osztály kifejezéssel (`class expressions`).
Egy osztály deklaráció a következőképp fest:

```javascript
class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
  }

  fullname() {
    return `Fullname: ${this.firstName} ${this.lastName}`
  }
}

let me = new Person('John', 'Doe', 31)
console.log(me) // Person {firstName: "John", lastName: "Doe", age: 31}
```

Egy osztály kifejezés pedig:

```javascript
var Person = class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
  }

  fullname() {
    return `Fullname: ${this.firstName} ${this.lastName}`
  }
}
```

Ami nem feltétlen nevesített, lehet névtelen is:

```javascript
var Person = class {
  constructor(firstName, lastName, age) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
  }

  fullname() {
    return `Fullname: ${this.firstName} ${this.lastName}`
  }
}
```

A `class`-ek neveit nem kötelező nagybetűvel kezdeni, azonban ajánlott.
Megtehetjük azt is, hogy a konstruktor függvényt nem definiáljuk. Ez nem jelent problémát, egyszerűen csak így nem állítunk be semmilyen tulajdonságot példányosításkor. Ettől függetlenül minden metódus amit létrehoztunk elérhető marad.
A `this` mindig az adott objektumot jelenti, ugyanúgy, mint amikor saját konstruktor függvény példányosításával hozztuk létre az objektumokat.
A létrehozott metódusok pedig `prototype`-hoz lesznek hozzárendelve, így minden objektumból elérhetők, hiszen öröklik a szülőtől.

## static - statikus metódus

Íme a statikus metódus (nem _"objektumpéldányból"_ hívjuk).
A statikus metódus magához a `class`-hez kötődik, ojektumpéldányból meghívva hibát kapunk.

```javascript
class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
  }

  fullname() {
    return `Fullname: ${this.firstName} ${this.lastName}`
  }

  static staticMethod() {
    console.log('This is a static method text')
  }
}

console.log(Person.staticMethod()) // 'This is a static method text'
let me = new Person('John', 'Doe', 31)
console.log(me.staticMethod()) // TypeError
```

## get(), set()

Ugyanúgy működik ahogy eddig. Továbbra se használjuk ugyanaz a nevet a `get(), set()` metódusoknál, mint a változóknál, ugyanis a következő még mindig hibát dob:

```javascript
class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
  }

  get firstName() {
    return this.firstName
  }

  set firstName(firstName) {
    this.firstName = firstName
  }
}

let me = new Person('John', 'Doe', 31)
console.log(me.firstName) // Cannot set property name of #Person which has only a getter
me.firstName = 'firstName' // Maximum call stack size exceeded
```

Mint azt tapasztaljuk hibákat kapunk mindkét esetben. Sajnos a `set` és a `get` neve ugyanaz, mint a tulajdonságoké. A `set`-nél látjuk is, hogy az a probléma, hogy mindig önmagát hívja meg. Ezt hogyan tudjuk elkerülni?

A következő módokon:

- A tulajdonságok neveit _"\_"_-al kezdjük. Ez egy nem kifejezetten szépnek mondható megoldás, de megoldás:

```javascript
class Person {
  constructor(firstName, lastName, age) {
    this._firstName = firstName
    this._lastName = lastName
    this._age = age
  }

  get firstName() {
    return this._firstName
  }

  set firstName(firstName) {
    this._firstName = firstName
  }
}

let me = new Person('John', 'Doe', 31)
console.log(me.firstName) // 'John'
me.firstName = 'Jane'
console.log(me.firstName) // 'Jane'
```

- Következő opció, ha a `get(), set()` metódusoknak más nevet adunk, ez azért már szebb:

```javascript
class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
  }

  get getFirstName() {
    return this.firstName
  }

  set setFirstName(firstName) {
    this.firstName = firstName
  }
}

let me = new Person('John', 'Doe', 31)
console.log(me.getFirstName) // 'John'
me.setFirstName = 'Jane'
console.log(me.firstName) // 'Jane'
```

- A javasolt megoldásom: figyelembe véve, hogy `strict mode` esetében nem használhatunk `get(), set()`-et, meg egyébként is a linter-ünk is lehet szól érte, hát ne használjuk. Tényleg így a legegyszerűbb.
  Ha csak arra kell a `get(), set()`, hogy lekérdezzünk, módosítsunk egy adatot, arra felesleges, hiszen megtehetjük nélkülük is. Ha valami összetettebb dolgot szeretnénk, akkor pedig írjunk rá egy függvényt.

## extends - öröklődés, super - ősosztály elérése

Öröklődés van, működik, és jó. Az `extends` kulcsszó után adjuk meg a szülő osztályt.
A szülőosztály tulajdonságait/metódusait a `super` kulcsszó segítségével érhetjük el.
Az alábbi példában létrehozunk egy `Person` osztályt, és ebből leszármaztatva egy `Man` és egy `Woman` gyermekosztályt. A gyermekosztályokban a szülő osztály konstruktorát hívom meg először.

A Woman osztályban arra is láthatunk egy példát, hogyan tudjuk a szülő osztály `fullname()` metódusát felülírni a gyermekben.  
Ez bármikot megtehetjük, és ebben az esetben, mivel a gyermek rendelkezik az adott nevű metódussal, az fog lefutni, nem a szülő osztály ugyanolyan nevű metódusa.

```javascript
class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
  }

  fullname() {
    return `Fullname: ${this.firstName} ${this.lastName}`
  }
}

class Man extends Person {
  constructor(firstName, lastName, age, rationalism) {
    super(firstName, lastName, age)
    this.rationalismLevel = rationalism
  }
}

class Woman extends Person {
  constructor(firstName, lastName, age, empathy) {
    super(firstName, lastName, age)
    this.empathyLevel = empathy
  }
  fullname() {
    return `Hi! I'm ${this.firstName} ${this.lastName}.`
  }
}

const sampleMan = new Man('John', 'Doe', 33, 'high')
const sampleWoman = new Woman('Jane', 'Doe', 20, 'medium')
console.log(sampleWoman.fullname()) // Hi! I'm Jane Doe.
```

## Osztályszintű változó

Erről a következő leckében a `design pattern`-eknél lesz szó.

## Privát láthatóságú változó

Mint említettem nincs "igazi" láthatósági módosító a JavaScript-ben, de ahogy eddig, most is imitálhatjuk azt. Erre többféle módszer is létezik. Az egyik lehetőség ha `WeakMap`-et használunk:

```javascript
const _priv = new WeakMap()
class Person {
  constructor(age) {
    _priv.set(this, age)
  }
  getPriv() {
    var age = _priv.get(this)
    return age
  }
}

const samplePerson = new Person(10)
console.log(samplePerson.getPriv())
```

A `WeakMap` object a saját privát adatait tárolja. Amiatt is hasznos, mert nem akadályozza meg a szemétgyűjtést.

Az _"\_"_-al kezdődő változónevek használata a `JavaScript`-ben mindig vita tárgyát képezik. Használjuk? Ne használjuk? Más nyelvekben a `private` láthatóságú változók nevét kezdjük mindig aláhúzással. A `JavaScript`-ben azonban ilyen igazból nincs, ezért felmerül a kérdés, hogy használjuk e ezt a a fajta névadást vagy sem. Az én véleményem erről az, hogy vallásról ne vitázzunk. Aki használja használja, aki nem az nem.

Más megközelítéssel használhatnánk még `Symbol`-t, vagy saját `module`-okat, ezek az újdonságok a későbbiekben kerülnek bemutatásra.
