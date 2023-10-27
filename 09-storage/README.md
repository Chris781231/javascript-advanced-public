# Storage

## Cookie
A sütik kisméretű (max 4KB) szöveges adatok, melyek kliensoldalon, a felhasználó számítógépén tárolódnak.   
A sütiket a nevük alapján lehet azonosítani, rendelkeznek értékkel, és sok egyéb opcionális tulajdonságuk lehet.
Ezek közül a legfontosabb az `expires`, ami a tárolt adat érvényességének az idejét adja meg.   
A sütiket a `document.cookies` tárolja pontosvesszővel elválasztva. 
Új sütit az alábbi módon hozhatunk létre:

```javascript
    // document.cookie = 'username=John Doe; expires=Fri, 01 Jan 2021 12:00:00 UTC; path=/';
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
```

## local- és sessionStorage
A `localStorage` és a `sessionStorage` szintén kliensoldali adattárolást valósítanak meg, azonban jóval nagyobb méretű (5MB, de böngészőként eltérő) adatokat is tárolhatunk. Egyszerű kulcs-érték párokat menthetünk le.

Metódusai:
- `setItem(key, stringValue)`:  adat mentése
- `getItem(key)`:  adott kulcsú elem lekérdezése
- `key(index)`: adott indexű kulcs lekérdezése
- `clear()`:  összes elem törlése
- `removeItem(key)`:  adott kulcsú elem törlése

A `local` és a `sessionStorage` között a különbség csak az, hogy a `sessinStorage` tartalma a böngészőlap bezárásakor törlődik.