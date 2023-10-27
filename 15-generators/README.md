## Generátorok
A generátor hasonló, mint egy iterátor, azaz amikor egy tömböt, objektumot bejártunk egy ciklus segítségével.
A generátorok speciális függvények, a visszatérési értékük pedig egy iterátor lesz.

## Egyszerű generátor függvény
A `function*` kulcsszó segítségével tudunk generátor függvényt létrehozni. A szintaxisa ezen kívül semmiben sem tér el a hagyományos függvény deklarációtól.

A generátor függvényben használunk egy másik újdonságot, ami talán más nyelvekből talán ismerős lehet. Ez a `yield` kulcsszó . A `yield` megállítja a generátor függvényünket. Szünetelteti a futását.

A generátor függvényen belül használva több `yiled`-et, több helyen is szüneteltethetjük a generátor függvény futását. A `yield` utáni érték mindig egy visszatérési érték lesz. A generátor függvény futása addig lesz szüneteltetve, amíg a `next()`-et nem hívjuk meg, ezzel folytatódik a függvény futása. (Mivel iterátorunk van, ezért van `next()` metódusa.)

A következő példában egy egyszerű generátor függvényt írunk, melyet felhasználva egy konstansba tesszük az iterátort és kiíratjuk az adatokat:

```javascript
  function* languges() {
      console.log('Start');
      yield 'php';
      yield 'perl';
      yield 'ruby';
      console.log('End');
  }

  const generatorObject = languges(); 
  console.log(generatorObject.next());  // Start, {value: 'php', done: false}
  console.log(generatorObject.next());  // {value: 'perl', done: false}
  console.log(generatorObject.next());  // {value: 'ruby', done: false}, End
  console.log(generatorObject.next());  // {value: undefined, done: true}
```

A kiíratásnál láthatjuk, hogy mindig egy `value, done` páros lesz a visszatérési érték. Tehát, hogy az eddigi mondandóm pontosítsam, egy olyan `IteratorResult` objektumot kapunk vissza, ami két tulajdonsággal rendelkezik. Egy `value`-val, ami az értéket tartalmazza, és egy `done`-al, ami azt mutatja, hogy a generátor függvény futása befejeződött e vagy sem.
Az utolsó esetben is `false` a `done` értéke, ugyanis ott még egy `yield` kulcsszó volt, ami szünetelteti a függvény futását. Ha mé egyszer, azaz negyedszer is meghívjuk a `lis.next()`-et, akkor már a `done: true` értéket kapnánk.

## Generátor függvény használata tömbnél
Eddig csak egyszerű primitívekkel dolgoztunk, most viszont megnézzük, hogy mi a helyzet, hogy ha van egy objektumokat tartalmazó tömböm.
A generátor függvénynek lesz egy paramétere, ez lesz maga a tömb.
A függvényen belül indítunk egy ciklust, amin belül lesz a `yield`. Így minden egyes ciklusfutásnál szünetelni fog a generátor függvény futása.
Ezen kívül a kiíratásnál csak a `value`-t kérjük el. A `done`-al nem foglalkozunk most.

```javascript

const users = [{
        firstName: 'Kiss',
        lastName: 'József',
        age: 18
    },
    {
        firstName: 'Horváth',
        lastName: 'Péter',
        age: 34
    },
    {
        firstName: 'Kováts',
        lastName: 'Ilona',
        age: 24
    },
    {
        firstName: 'Nagy',
        lastName: 'Antal',
        age: 66
    }
];

function* loop(arr) {
    for (const item of arr) {
        yield item;
    }
}

const items = loop(users);
console.log(items.next().value);  // {firstName: 'Kiss', lastName: 'József', age: 18}
```

## A return metódus
Generátor függvényen belül nem szoktunk `return` utasítást használni, hiszen az befejezi a függvény futását. Helyette lehetőségünk van a `return()` metódus használatára, így bármikor meg tudjuk szakítani a függvény futását, és tetszőleges visszatérési értéket is tudunk adni. 
```javascript
  function* generatorFunction() {
    yield 1;
    yield 2;
    yield 3;
  }

  const generatorObject = generatorFunction();
  console.log(generatorObject.next());        // {value: 1, done: false}
  console.log(generatorObject.return('end')); // {value: 'end', done: true}
  console.log(generatorObject.next());        // {value: undefined, done: true}
```

## A throw metódus
Generátor függvény esetében lehetőségünk van manuálisan "rádobni" egy kivételt a `throw()` metódus használatával:

```javascript
  function* generatorFunction() {
    try {
      yield 1;
    } catch (error) {
      console.error(error);
    }
    yield 2;
    yield 3;
  }

  const genratorObject = generatorFunction();
  console.log(genratorObject.next()); // {value: 1, done: false}
  console.log(genratorObject.throw(new Error('Custom error'))); // Error: Custom error, {value: 2, done: false}
  console.log(genratorObject.next()); // {value: 3, done: false}
```

## yield*
Lehetőség van egy generátor függvényen belül a `yield` után egy másik generátor függvényt meghívni. 
Ebben az esetben a másik generátor függvény értékei, amit először megkapunk, majd ha az a függvény befejeződött, következnek sorra a hívó függvényen belüli `yield` utáni értékek. Ehhez a hívó függvényen belül a `yield` után, ahol meghívjuk a másik generátort, egy csillagot kell elhelyezni, tehát a szintaxis: `yield*`

```javascript
  function* first() {
    yield 1;
    yield 2;
  }

  function* second() {
    yield* first();
    yield 3;
    yield 4;
    yield 5;
  }

  for (const value of second()) {
    console.log(value); // 1, 2, 3, 4, 5
  }
```