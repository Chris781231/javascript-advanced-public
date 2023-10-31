## async - await

A Promise-ok kezelésének egy egyszerűbb szintaktikája, használati módja a `async await`.
Az aszinkron függvény esetében a `function` kulcsszó elé írjuk az `async` kulcsszót is.
Az aszinkron függvények mindig Promise-t adnak vissza.

```js
async function one() {
  // Promise.resolve(1);
  return 1
}

one().then(console.log)
```

Egy aszinkron **függvényen belül** használhatjuk az `await` kulcsszót, ami arra szolgál, hogy megvárjuk egy Promise eredményét:

```js
async function one() {
  const promise = new Promise((resolve, resject) => {
    setTimeout(resolve, 1000, 1)
  })
  const result = await promise
  console.log(result)
  return result
}

one().then(console.log)
```

Lényeges performancia különbség lehet, ha sorosan vagy párhuzamosan futtatju ka Promise-okat, azaz megvárjuk, míg fullfilled-ek lesznek.
A `searial` verzióban megvárjuk, míg teljesül az egyik Promise, aztán megvárjuk, míg teljesül a másik, utána adjuk vissza az összegüket. A `parallel` verzióban a két Promise egymás mellett aszinkron fog futni, így a teljes futási idő a fele lesz csak:

```js
function resolve(value) {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000, value * 2)
  })
}

async function serial() {
  const a = await resolve(1)
  const b = await resolve(2)
  return a + b
}

async function parallel() {
  const promiseA = resolve(10)
  const promiseB = resolve(20)
  return (await promiseA) + (await promiseB)
}

serial().then(console.log)
parallel().then(console.log)
```

Vizsgálhatjuk is, hogy mennyi lesz az egyes függvények futási ideje. Erre a `performance.now()` metódusát használhatjuk, ez jobb eredményt ad, mint ha a Date objektumot használnánk:

```js
async function executionTime(func) {
  const start = performance.now()
  const result = await func()
  const end = performance.now()
  console.log({
    functionName: func.name,
    executionTime: end - start,
    result,
  })
}

executionTime(serial)
executionTime(parallel)
```

A régi `XMLHttpRequest` leváltására létrejött egy új API, a `fetch` API, melynek segítségével a hálózati hívásokat sokkal egyszerűbben tudjuk megvalósítani:

```js
function success(response) {
  console.log(response)
}

async function request(url, options = {}) {
  try {
    const response = await fetch(url, options)
    const result = await response.json()
    return result.users
  } catch (error) {
    console.error(error)
  }
}

request('./data.json').then(console.log)
```

MInt látható, összesen két paramétert adtam meg, az első egy URL, a második egy opcionális objektum. A `fetch` mindig egy Promise-t ad vissza. Az `await` kulcszsó segítségével megvárom, míg megérkezik a kérésre a válasz, majd ezt a `json()` metódussal átalakítom. A `json()` metódus szintén aszinkron, egy Promise-t ad vissza, így ez elé is kell az `await` kulcsszó.

Az `async await `segítségével már a callback hell nagyon egyszerűen elkerülhető:

```js
function addOnTo(number) {
  let result = number + 1
  return new Promise((resolve, reject) => {
    resolve(result)
  })
}

async function main() {
  const res1 = await addOnTo(5)
  const res2 = await addOnTo(res1)
  const res3 = await addOnTo(res2)
  const res4 = await addOnTo(res3)
  const res5 = await addOnTo(res4)
  console.log(res5)
}

main()
```
