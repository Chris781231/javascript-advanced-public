## Async programming

A JavaScript engine az a program, ami a böngészőn belül (is) található, és a JavaScript kód értelmezéséért, futtatásáért, optimalizálásáért felelős.

A memóriaterületet két részre osztja, a _Heap_-re, és a _Stack_-re (ezt nevezzük _Call Stack_-nek is). A _Heap_-ben tárolódnak az objektumok, a *Stack*ben a pirmitívek, és ide kerülnek a függvény hívások. Amikor valamilyen aszinkron kódunk van, például DOM események, Timerek, HTTP kérések, akkor ezek kikerülnek a megfelelő böngésző API-hoz, amik ezeket a kéréseket kezelik, aszinkron módon fognak futni, nem blokkolják a programunk további futását.

Amikor az adott aszinkron kérés végrehajtódott, akkor a callback function bekerül egy _Queue_-be (_Callback Queue/Task Queue_ - Sor). A JS engine innen a _Queue_-ből kiemel egy függvényt, akkor amikor a _Stack_-ben nincs semmi, azaz nincs egyéb futó kód, és lefuttatja azt. Aztán kiemeli a következőt ha volt és így tovább folyamatosan. Ezt hívjuk *Event loop*nak.

Az alábbi esetben ezért először a `start` felirat jelenik meg, utána van két aszinkron kódrész, amik kikerülnek a megfelelő böngésző API-hoz, és ha végzett a futás, akkor a megadott callback a _Queue_-be kerül. Másodiknak kerül a konzolra az `end`, mert bár az első `setTimeout()` esetében 0 milisec-et adtam meg, az attól még aszinkron lesz.
Harmadiknak jelenik meg a `0` és negyediknek az `1000`.

```js
console.log('start')

setTimeout(() => console.log(0), 0)

setTimeout(() => console.log(1000), 1000)

console.log('end')
```

A megadott idő azt jelenti valójában, hogy hívd meg ezt a callback-et X idő múlva, vagy amikor lesz rá időd, tehát nem fut semmi egyéb szinkron kód, üres a _Stack_. Azaz ha van egy hosszú ideig futó szinkron kódunk, akkor amiatt a `setTimeout()` callbackje nem tud 0 milisec múlva lefutni, hiszen a _Stack_ nem üres. Várni kell.

```js
setTimeout(console.log, 1000, '1000')

for (let i = 0; i < 5000; i += 1) {
  console.log(i)
}

setTimeout(console.log, 0, '0')
```

Amire oda kell figyelni, hogy az alábbit kerüljük el:

```js
let result

function request(method, url, callback) {
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      result = JSON.parse(xhr.responseText)
    }
  }
  xhr.open(method, url, true)
  xhr.send()
}

request('GET', './data.json')
console.log(result)
```

Ilyen esetben a `result`-nak még nem lesz értéke a kiíratásnál, hiszen idő kell, amíg a kérésre megérkezik a válasz. A HTTP kérést a megfelelő böngésző API kezeli, amíg megjön a válasz addig pedig a szinkron kódunk futhat tovább.

Ezért is van, hogy callback függvényekkel operálunk az aszinkron kódok esetében:

```js
function callback(response, callback) {
  const result = JSON.parse(response.responseText)
  console.log(result)
}

function request(method, url, callback) {
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr)
    }
  }
  xhr.open(method, url, true)
  xhr.send()
}

request('GET', './data.json', callback)
```

Amit **kerüljetek el**, az az úgynevezett _callback hell_. Míg aszinkron kódnál ez gyakori látvány volt, szinkron kód esetében nem szabad ilyenekkel operálni:

```js
function one(args, callback) {
  console.log('one', args)
  callback()
}

function two(args, callback) {
  console.log('two', args)
  callback()
}

function three(args, callback) {
  console.log('three', args)
  callback()
}

function four(args, callback) {
  console.log('four', args)
  callback()
}

function five(args, callback) {
  console.log('five', args)
  callback()
}

one(1, function () {
  two(2, function () {
    three(3, function () {
      four(4, function () {
        five(5, function () {
          // ...
        })
      })
    })
  })
})
```

A _Task Queue_ mellett van egy _Microtask Queue_ is. A Promise-ok egy másik queue-be kerülnek, ez a _Microtask Queue_. Az ebben lévő feladatok elsőbbséget élveznek a Task Queue-ben lévő feladatok előtt, és egy loop során nem egy elem (job) kerül a Stack-be a _Microtask Queue_-ből, hanem az összes.
