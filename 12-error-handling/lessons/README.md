## Error handling

A kivételkezelés segítségével fel tudunk készülni az esetleges hibákra, így egy fellépő hiba esetében a programunk nem áll le, hanem az általunk megadott utasításokat hajtja végre.

Ha elképzelhető, hogy egy adott kód futása esetén hiba lép fel, akkor azt `try catch` blokkokba helyezzük. A `try` ágba helyezzük a kódot, ahol a hiba felléphet, a `catch` ágba pedig azt a kódot írjuk, aminek hiba esetén le kell futnia. A `catch` paraméterként megkap egy error objektumot, ami 3 propertyvel rendelkezik:

- `message`: hibaüzenet
- `name`: hiba neve
- `stack`: a hiba részletei

```js
try {
  console.log(bubu)
} catch (error) {
  console.error(error.message)
  console.error(error.name)
  console.error(error.stack)
}
```

A `catch` ágon belül általában logolást, egy hálózati kérés küldésének megismétlését stb. érdemes végezni, tehát ténylegesen kezeljük is le a hibát, és kerüljön bele ez egy log fileba.

Egy kódon belül, mi magunk is dobhatunk bármikor hibát a `throw` utasítás segítségével.
Ezt többféleképp is megtehetjük:

- `throw Error('errormessage')`
- `throw new Error('errormessage')`
- `throw new SpeciificError('errormessage')`

Többszörös `catch` blokk nincs. Ha szeretném vizsgálni, hogy milyen típusú hiba történt, és az ennek megfelelő kódot akarom lefuttatni, akkor a következőt írhatjuk:

```js
try {
  const user = JSON.parse(jsonData)
  if (!user.firstName || !user.lastName || !user.age) {
    throw new ReferenceError('Missing property')
  }
} catch (error) {
  if (error instanceof ReferenceError) {
    console.error('Custom Error: ', error.message)
  } else if (error instanceof SyntaxError) {
    console.error('Szintaktikai hiba')
  } else {
    console.error(error.message)
  }
}
```

A sorendnél érdemes odafigyelni, hogy mindig a leggyakoribb, legspecifikusabb hibát vegyünk előre.

A try catch ágat egy harmadik blokkal is ki tudjuk egészíteni. Ez a `finally`. A `finnaly`ban lévő ködrészlet akkor is lefut ha történt hiba, és akkor is ha nem:

```js
try {
  const user = JSON.parse(jsonData)
  if (!user.firstName || !user.lastName || !user.age) {
    throw new ReferenceError('Missing property')
  }
} catch (error) {
  if (error instanceof ReferenceError) {
    console.error('Custom Error: ', error.message)
  } else if (error instanceof SyntaxError) {
    console.error('Szintaktikai hiba')
  } else {
    console.error(error.message)
  }
} finally {
  console.log('Parse ready')
}
```

Mi a helyzet aszinkron kód esetében? Arra kell csak figyelni, hogy a `try catch` blokk a callback függvényen belül legyen, hiszen itt lehet hiba:

```js
const parse = (data) => JSON.parse(data)

setTimeout(() => {
  try {
    const user = parse(jsonData)
    console.log(user)
  } catch (error) {
    console.error('My catch block: ', error)
  }
})
```
