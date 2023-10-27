# Fetch és Promise

## Promise

A `Promise` egy aszinkron hívást körbeölelő objektum, amely a művelet aktuális állapotát hordozza magában. Minden `Promise` egyetlen egyszer futhat le, és a futás eredménye csak sikeres vagy sikertelen lehet. Az eredménytől függően képes a megfelelő `callback` metódusokat meghívni.

Egy promise a következő állapotokkal rendelkezhet:

* **fulfilled**: vagyis teljesített, ha az aszinkron művelet sikeresen
* **rejected**: lefutott, ha az aszinkron művelet sikertelen volt
* **pending**: ha a művelet még fut
* **settled**: ha az aszinkron hívás már megtörtént, függetlenül a
  sikerességétől

Az alábbi kép szépen szemlélteti a `Promis`-ok lefutását, állapotait:

![Promise](./img/js-promise.svg)

Forrás:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

A specifikáció a `Promise` objektumoktól egyetlen metódust követel meg, a `then()`-t. Ez a függvény két `callback` paramétert vár melyeket attól függően hív meg, hogy milyen eredménnyel fog járni az aszinkron művelet.
[Forrás](http://webprogramozas.inf.elte.hu/tananyag/weaf1/lecke9_lap1.html#hiv11)

Nézzünk egy egyszerű példát:

```javascript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(Error("Error message"));
  }, 3000);
});

myPromise
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });
```

A `Promise`-nak két paramétert adtunk. Az egyik a `resolve`, a másik a `reject`. Mindkettő egy-egy függvény. A `resolve`-ot akkor hívjuk meg, ha megfelelően futott le a folyamat, a `reject`-et pedig akkor, ha valamilyen hiba történt.
Ha bármelyik függvény meghívásra kerül, a `Promise` megszűnik létezni. Egy `Promise`-ra csak az egyiket lehet meghívni.
Mindkettő függvény paraméterezhető is ha szükség van rá.

Nézzünk meg egy összetettebb példát is:

```javascript
const datas = [
  { firstName: "John", lastName: "Doe", age: 31 },
  { firstName: "Jane", lastName: "Doe", age: 20 },
  { firstName: "Anonim", lastName: "Anonymous", age: 62 }
];

function postDataFunc(age) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const post = datas.find(postdata => postdata.age === age);
      if (post) {
        resolve(post);
      } else {
        reject(Error("Data not found"));
      }
    }, 3000);
  });
}

postDataFunc(31)
  .then(post => {
    console.log(post);
    return post;
  })
  .then(post => {
    console.log("Name:", post.firstName, post.lastName);
  })
  .catch(err => {
    console.error(err);
  });

// Name: John Doe
```

A fenti `Promise` már egy fokkal összetettebb.

* A `postDataFunc`-be megadunk egy életkort.
* Ezen belül a `Promise`-nak megadjuk a `resolve`, és `reject` paramétereket.
* Indítunk egy `setTimeout`-ot. Ez egy aszinkron művelet, ezt fogja körbe a `Promise`
* A `post` egy `boolean`, azaz hogy van e találatunk vagy nincs. Azaz megnézzük,hogy a tömbünkbe van e olyan objektum, ahol az `age` egyenlő a megadott értékkel.
* Ha nem volt találatunk a `reject`-et hívjuk meg.
* Ha volt találatunk a `resolve`-ot hívjuk meg.
* Meghívjuk a függvényt jelenleg a 31 paraméterrel. A függvényünk visszatérési értéke a `Promise`
* Három másodperc múlva kiírja, hogy: _Name: John Doe_ (Ha nem talált akkor pedig: *Data not found*)
* A `catch` a hibakezelésre van

A következő példában egy újabb remek használatát láthatjátok a `Promise`-nak.
Két `Promise` hozunk létre. A `Promise.all()` annyit tesz, hogy a paraméterként megadott, jelen esetben kettő darab `Promise`-ból egy darab összegyúrt `Promise`-t ad vissza.
Ez az összetett `Promise` akkor lesz teljesített, ha a magába foglalt `Promise`-ok mindegyike lefutott.

Az alábbi példában az egyik 3 a másik 10 másodperc után fut le. Így a későbbi időpontban, tehát 10 másodperc múlva lesz mind a kettő teljesítve (Ne feledjük, aszinkron futnak!).

```javascript
const cat = new Promise(resolve => {
  setTimeout(() => {
    resolve({
      sound: "miau",
      loyal: false
    });
  }, 10000);
});

const dog = new Promise(resolve => {
  setTimeout(() => {
    resolve({
      sound: "vau",
      loyal: true
    });
  }, 3000);
});

Promise.all([cat, dog]).then(responses => {
  const [catProps, dogProps] = responses;
  console.log(catProps, dogProps);
});
```

## Fetch

A `Fetch API` az `XMLHttpRequest` kiváltására jött létre. Mind Google, mindMozilla bácsi támogatja már a használatát. Az AJAX-al ellentétben különválasztották a kérést és a választ, valamint egyszerűbb a szintaxis, és könnyebb egyéni header-eket beállítani.

A gyakorlatban: elkérünk egy json file-t, és belerakjuk egy változóba.
Figyeljétek meg, a `fecth()` egy `Promise`-szal tér vissza:

**Megjegyzés**: mindenképp `localhost`-ról futtassátok!

```javascript
let fetchInit = {
  method: "GET",
  headers: new Headers(),
  mode: "cors",
  cache: "default"
};

const fetchData = fetch("data/data.json", fetchInit);
fetchData.then(data => data.json()).then(data => console.log(data));
```

## Kombináljuk

A `fetch()` egy `Promise`-aszal tér vissza, amit bátran használjuk is.
Elkérjük a json-t, és feldolgozzuk, mint az imént:

```javascript
const postPromise = fetch("data/data.json");

postPromise
  .then(data => data.json())
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });
```
