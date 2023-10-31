## Objects

Objektumokat JavaScriptben többféleképp tudunk létrehozni:

Objektum literál segítségével:

```js
const objLiteral = {}
```

A `new` kulcsszóval az Object konstruktorát használva:

```js
const objContructor = new Object()
```

Saját konstruktor függvény írásával:

```js
function User(name, role) {
  this.name = name
  this.role = role
}

const johnDoe = new User('John Doe', 'user')
const janeDoe = new User('Jane Doe', 'admin')
console.log(johnDoe, janeDoe)
```

### Prototype

Amennyiben szeretnénk a `User` objektumunkhoz metódusokat is hozzárendelni, azt a legszebb módon a `prototype` tulajdonságon keresztül tudjuk megtenni.

```js
User.prototype.whoAmI = function () {
  console.log(`I'm ${this.name}`)
}
```

Ugyan kiegészíthettük volna azt is, hogy:

```js
function User(name, role) {
  this.name = name
  this.role = role
  this.whoAmI = function () {
    console.log(`I'm ${this.name}`)
  }
}
```

Ez egy úgynevezett factory függvény lenne, amivel ugyan nincs baj, viszont a függvényt minden egyes létrejövő objektumhoz le kell tárolni, így több memóriát pazarolunk, mint a `prototype` esetében.

A `prototype` tulajdonság nem más, mint egy objektum, amivel a függvények rendelkeznek. Amikor a `prototype`-on keresztül adunk hozzá metódusokat a konstruktor függvényhez, akkor csak egyszer kerül letárolásra, hiszen nem a létrejövő objektumhoz, hanem a függvényhez fog tartozni. Amikor meghívjuk a `whoAmI()` metódust, a JS engine megnázi, hogy a `user` objektumnak, amit létrehoztam a `new` kulcsszó segítségével van e `whoAmI()` metódusa. Ha van, meghívja. Amennyiben nincs, úgy a prototípus láncon (prototype chain) keresztül megnézi, hogy a `user`-t létrehozó függvény `prototype` tulajdonságán belül van-e `whoAmI()` metódus, és ha van, meghívja azt.

JavaScriptben prototípus alapú öröklés van megvalósítva. Nincsenek a hivatalos értelemben vett osztályok, hanem objektumok örökölnek objektumoktól.

Az öröklődést szintaktikailag többféleképpen is meg lehet valósítani.  
Hozzunk létre egy `Person` konstruktor függvényt, paraméterként csak egy `name`-t vár. Legyen egy `sayHi()` metódusa, amit a prototype-on keresztül adunk hozzá.

```js
function Person(name) {
  this.name = name
}

Person.prototype.sayHi = function () {
  return 'Hi'
}
```

Legyen egy `User` konstruktor függvény, amit a `Person`-ból fogunk származtatni. A `User` konstruktor függvény egy `name` és `role` egy paramétert vár. Azt szeretném, hogy a `User` a `Person`-ból örököljön, emiatt a `name` értékét nem is a `User`, hanem a `Person` kell, hogy beállítsa. Ehhez a `call()` segítségével meghívom a `Person`-t paraméterként megadva neki a `this`-t és a `name`-et.

```js
function User(name, role) {
  Person.call(this, name)
  this.role = role
}
```

A `User` egy metódussal rendelkezzen, ez a `whoAmI()`:

```js
User.prototype.whoAmI = function () {
  return `I'm ${this.name}`
}
```

Már csak az maradt hátra, hogy a `Person` és a `User` közötti szülő-gyermek kapcsolatot beállítsuk, és a `User` elérje a `Person`-ban definiált metódusokat is. Tehát ha létrehozok egy user objektumot elérjem a `sayHi()` metódust is.  
Ehhez a `User` prototype-ját felülírom. Az `Object.create()` metódus felhasználásával létrehozok egy új objektumot egy már meglévő alapján, és rendelem a prototype-hoz. Mivel ezzel a teljesen prototype objektum felül lett írva a konstruktor is beleértve, ezt visza kell írnom, és a végére maradnak a `User` metódusai.

```js
User.prototype = Object.create(Person.prototype)
User.prototype.constructor = User
User.prototype.whoAmI = function () {
  return `I'm ${this.name}`
}
```

Próbáljuk is ki:

```js
const person1 = new Person('Person 1')
const person2 = new Person('Person 2')
const user1 = new User('User 1', 'user')
const user2 = new User('User 2', 'user')
console.log(person1, person2)
console.log(user1, user2)
console.log(user1.sayHi())
```

### Getter, Setter

Használhatunk getter-eket és setter-eket, amik property-k lekérdezésére és beállítására szolgálnak. Akkor hasznosak, ha az adatokon valamilyen transzformációt akarunk végezni. A nagy előnyök, hogy bár metódusok, valójában sima propertykként tudjuk használni őket.
A metódus neve elé írjuk a `get`, `set` kulcssszavakat:

```js
const user = {
  name: 'John Doe',
  get firstName() {
    return this.name.split(' ')[0]
  },
  set firstName(firstName) {
    this.name = `${firstName} ${this.name.split(' ')[1]}`
  },
}

console.log(user.firstName)
user.firstName = 'Jane'
console.log(user.name)
```

Bármennyi getter-t, setter-t meg tudok adni, akár minden egyes proertyhez külön-külön. Arra kell csak figyelni, hogy a getter, setter utáni függvény neve soha ne egyezzen meg egy property nevével.

```js
const user = {
  name: 'Jane Doe',
  get firstName() {
    return this.name.split(' ')[0]
  },
  set firstName(value) {
    this.name = `${value} ${this.name.split(' ')[1]}`
  },
  get lastName() {
    return this.name.split(' ')[1]
  },
  set lastName(value) {
    this.name = `${this.name.split(' ')[0]} ${value}`
  },
}
```

Lehetőség van a `get`, `set` használatára `prototype` esetében is:

```js
function User(name) {
  this.name = name
}

User.prototype = {
  get firstName() {
    return this.name.split(' ')[0]
  },
  set firstName(value) {
    this.name = `${value} ${this.name.split(' ')[1]}`
  },
  get lastName() {
    return this.name.split(' ')[1]
  },
  set lastName(value) {
    this.name = `${this.name.split(' ')[0]} ${value}`
  },
}
```

### Property descriptor-ok

A `get`, `set`-en kívül van három property descriptor-unk, amik nem mások, mint a tulajdonságok tulajdonságai.

- `enumerable`: iteráción belül megjelenjen-e a tulajdonság
- `configurable`: törölhető-e vagy sem
- `writeable`: csak olvasható, vagy olvasható és írható, ha false akkor readonly

Ha egy objektum propertyjének a leíróit lekérem a `getOwnPropertyDescriptor()` metódus segítségével, akkor ezt a három értéket és plusz negyedikként a `value`-t adja vissza.

```js
const user = {
  name: 'John Doe',
}

console.log(Object.getOwnPropertyDescriptor(user, 'name'))
```

Lehetőségünk van egy objektum esetében minden egyes tulajdonsághoz megadni a descriptorok értékét, a `defineProperty()` vagy a `defineProperties()` segítségével. Ha bármelyik descriptor értékét kihagyjuk, akkor `false` lesz az alapértelmezett értéke, emiatt amit `false`-ra akarunk állítani meg sem kell adni. Ezzel szemben, ha az objektumon belül vesszük el a propertyket, akkor mindhárom értéke `true`-lesz alapértelmezetten. Itt adjuk mega `get`, `set` valamint akár a `value` értékét is. Azt a szabályt kell betartani, hogy ha getter-t, setter-t használunk, akkor a `writeable` és a `value` értéke ne legyen megadva, egyéként hibát kapunk.

```js
const user = {
  name: 'John Doe',
}

Object.defineProperty(user, 'firstName', {
  enumerable: false,
  configurable: false,
  get() {
    return this.name.split(' ')[0]
  },
  set(value) {
    this.name = `${value} ${this.name.split(' ')[1]}`
  },
})
```
