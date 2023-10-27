## Modules
Lehetőségünk van a file-okban lévő változókat, függvényeket, stb. exportálni, importálni.
Van egy külső `math.js` file-unk `components` mappában, az alábbi tartalommal:

```javascript
const helper = "Nem importálható";

export const pi = 3.141593;
export function sumValues(x, y) {
  return x + y;
}
```

A konstans és a függvény elé egy `export` kulcsszót írtam. Ezeket tudjuk majd használni más fileokban. Ahol nincs ott az `export` azt nem tudjuk majd használni.

Az `app.js` file-ba szeretnénk használni a fenti `pi` konstanst, és a `sumValues()` függvényt.
A következőt kell tennünk:

```javascript
// Importáljuk a pi-t és a suvValues-t
import { pi, sumValues } from "./components/math.js";
console.log("2 = " + sumValues(1 + 1));
```

Majd pedig a `html` file-ba a következőt írjuk:
`<script type="module" src="./app.js"></script>` 
A `type` tulajdonság értéke `module` legyen. Sok esetben a használatát engedélyeznünk kell külön a böngészőkben. Chrome alatt ezt a `chrome://flags` alatt az **Experimental Web Platform features** bekapcsolásával tudjuk megtenni.

A fenti egy egyszerű példa a modulok használatára. Természetesen nem csak ez az egyféle megadási mód létezik. Erről bővebben a dokumentációban olvashattok.
