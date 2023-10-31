## Regex

A reguláris kifejezések segítségével úgynevezett mintailleszkedést tudunk vizsgálni.
Nem csupán azt tudjuk megnézni, hogy egy adott string tartalmaz-e egy részstringet, hanem ennél összetettebb mintákat tudunk keresni. Például az adott szöveg az érvényes TAJ, telefonszám, vagy éppen email cím formátum-e.

Több metódust is használhatunk a mintaegyezés vizsgálatára, a két leggyakrabban használt a Regex `exec()` és a String `match()` metódusa.

A mintát mindig `/pattern/` jelek között helyezzük el:

```js
const pattern = /ab/
const text = 'abraka dabra'
console.log(pattern.exec(text))
console.log(text.match(pattern))
```

A mintánál használhatunk flageket, melyek közül a leggyakoribbak:

- `i`: ignorecase (kisbetű nagybetű különbség nem számít)
- `g`: global search (több találatot is visszaad)
- `m`: multiline search (többsoros stringben lehet keresni)

Ha globálisan akarunk keresni, nem case sensitive-en, akkor írhatjuk a következőt:

```js
const pattern = /AB/gi
const text = 'abraka dabra'
```

Vizsgálhatjuk azt is, hogy a string az adott mintával kezdődik, vagy végződik e:

- `^`: Adott mintával kezdődik-e a string
- `$`: Adott mintára végződik-e a string

```js
const pattern = /^ab/
const text = 'abraka dabra'
console.log(text.match(pattern))
const pattern2 = /dabra$/
console.log(text.match(pattern2))
```

Amennyiben azt akarjuk, hogy a minta pontosan illeszkedjen egy stringre, akkor használjuk egyszerre a `^` és a `$` jeleket.

Lehetőségünk vagy csoportok létrehozására. Ebben az esetben több karaktert is megadhatunk `[]` jelek között. Ebben az esetben bármelyik karakterre való illeszkedést vizsgálunk:

```js
const pattern = /[abc]/g
const text = 'abraka dabrd'
console.log(text.match(pattern))
```

Van 4 fontos speciális karakter:

- `.`: bármilyen karakter
- `+:` az előtte lévő karakter 1 vagy több alkalommal
- `*`: az előtte lévő karakter 0 vagy több alkalommal
- `?`: az előtte lévő karakter 0 vagy 1 alkalommal

Egy bármilyen karakter, utána következzen egy "a" betű:

```js
const pattern = /.a/
const text = 'a'
console.log(text.match(pattern))
```

Egy bármilyen karakter, utána következzen egy vagy több "a" betű:

```js
const pattern = /.a+/
const text = 'abraaaaaaaa'
console.log(text.match(pattern))
```

Egy bármilyen karakter, utána következzen 0 vagy több "a" betű:

```js
const pattern = /.a*/
const text = 'ab'
console.log(text.match(pattern))
```

Egy "b" betű utána következzen 0 vagy 1 "a" betű:

```js
const pattern = /ba?/
const text = 'abraka'
console.log(text.match(pattern))
```

A számosság megadását `{}` között kell megadni:

- `{x}` : az előtte lévő karakter pontosan `x` alkalommal szerepeljen
- `{x, }`: az előtte lévő karakter minimum `x` alkalommal szerepeljen
- `{x, y}`: az előtte lévő karakter minimum `x`, maximum `y` alkalommal szerepeljen

A `b` karakterek után minimum 2 maximum 5 darab `a` karakter következzen:

```js
const pattern = /ba{2,5}/
const text = 'abaaaaaaaaaaaraka'
console.log(text.match(pattern))
```

Lehetőségünk van tagani is. Ilyenkor a már ismert `^` jelet használjuk.
A `b` karakterek után minimum 2 maximum 5 darab `a` karakter következzen, ami után álljon egy **NEM** `a` karakter:

```js
const pattern = /ba{2,5}[^a]/
const text = 'abaaaaaaaaaaaraka'
console.log(text.match(pattern))
```

NAgyon gyakran használunk karakter csoportokat:

- `[a-zA-Z0-9_]`: Az angol abc kis-, és nagybetűi, valamint számok és \_
- `[^a-zA-Z0-9_]`: **NEM** az angol abc kis-, és nagybetűi, valamint számok és \_
- `[0-9]`: szám karakterek
- `[^0-9]`: `NEM` szám karakterek

Ezeknek van egy egyszerűbb megadásai módja is az úgynevezett metakarakterek segtségével:

- `[a-zA-Z0-9_]`: `\w`
- `[^a-zA-Z0-9_]` `\W`
- `[0-9]`: `\d`
- `[^0-9]`: `\D`
