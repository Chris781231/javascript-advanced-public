# Destructuring

## Destructuring arrays
Legyen egy tömbünk, ami X elemet tartalmaz. Ezután szeretnénk, a tömbben tárolt értékeket egy-egy változóban külön tárolni:

```javascript
  const arr = [undefined, 'two', 'three', 'four'];
  const [a, b, c, d] = arr;
  console.log(a, b, c, d);  // undefined, 'two', 'three', 'four'
```
## Swap datas
A különböző cserés rendezésekhez már nem kell egy plusz változót felvennünk.
Lehetőségünk van az értékek megcserélésére:

```javascript
let a = "A értéke";
let b = "B értéke";

[a, b] = [b, a];
console.log(a); // B értéke
console.log(b); // A értéke
```

## Destructuring objects
Egy kicsit dolgozzunk objektumokkal is, nehogy a sok `class`-ezés után elfeledjük a lényeget.
Első körbe azt nézzük meg, hogy a tömbökhöz hasonlóan hogyan tudjuk az előbb tanultakat objektumunk esetében is használni. Első körben az objektumunk két tulajdonságát tároljuk egy-egy konstansba.

```javascript
  const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30
  }

  const { a, lastName } = person;
  console.log(a, lastName);   // undefined, 'Doe'
```
## Destructuring objects with new variable names
Ezzel természetesen nincs vége. A fenti kódnál azt mondtam, hogy nem írhatunk akármilyen nevet az új struktúrában, arra azonban van mód, hogy "alias"-t készítsünk., azaz megadhatjuk, hogy az adott attribútumokra milyen névvel hivatkozunk:

```javascript
  const person = {
      firstName: 'John',
      lastName: 'Doe',
      age: 30
  }

  const { firstName: f, lastName: l } = person;
  console.log(f, l);  // 'John
```
## Destructuring objects with default values
Használhatunk `default value`-kat:

```javascript
  const styles = {
      background: 'white',
      color: 'red',
      display: 'block',
      visibility: 'hidden',
      border: '2px solid red'
  }

  const {
      background,
      color,
      display,
      border = '1px solid black'
  } = styles;

  console.log(background, color, display, border);  // white red block 2px solid red
```

## Destructuring objects with new variable names and default values
A `default value`-kat és az `alias`-okat mixelhetjük is:

```javascript
  const styles = {
      background: 'white',
      color: 'red',
      display: 'block',
      visibility: 'hidden',
  }

  const {
      background: b,
      color: c = 'blue',
      display: d,
      border: bo = '1px solid black'
  } = styles;

  console.log(b, c, d, bo); // white red block 1px solid black
```