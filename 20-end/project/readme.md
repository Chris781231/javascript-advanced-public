# Záró feladat

Feladatod egy CRUD alkalmazás elkészítése! Az alkalmazás egy json file-t használ adatforrásként, ami 100 felhasználó adatait (`id`, `name`, `emailAddress`, `address`) tartalmazza.

A feladat megoldásánál a kurzus során tanultakat használd. (fetch API, async functions, try catch blokkok) arrow function, class pattern, stb.)

## Backend

A szerver egy egyszerű json szerver legyen:

Telepíts egy json szervert, az alábbi lépéseket követve:

- Ha nincs a gépeden NodeJS akkor töltsd le, és telepítsd innen az LTS verziót: [NodeJS letöltése](https://nodejs.org/en/download/)
- Ezután add ki a konzolon az alábbi parancsot: `npm install -g json-server`
- A json-server dokumentációját itt találod: [LINK](https://github.com/typicode/json-server)
- A [Mockaroo](https://mockaroo.com/) oldalán generálj le egy json file-t, ami 100 dara `id`, `firstName`, `lastName` objektumot tartalmaz, a gyökérelem neve `users`
- a JSON filet helyezd a projekt mappádba
- indítsd el a json szervert konzolból az alábbi paranccsal: `json-server --watch aJsonFileUtvonala`
- Ezzel van is egy szervered, ami a kiszolgája majd az alkalmazásod. A szerver a 3000-es porton fut, ha a JSON-be a root elem `users` volt, és le akarod kérdezni az 1-es indexű elemet akkor csak ennyit kell beírnod a böngészőbe:
  (http://localhost:3000/users/1)[http://localhost:3000/users/1] és megjelenik az 1-es id-jú user összes adata.

## Frontend

Az alkalmazás egy SPA (Single Page Application) tehát csak egy oldalad legyen. Mindenképp több modult használj!

A megvalósítandó funkciók a következők:

- Az alkalmazás jelenítse meg egy táblázatban a felhasználók adatait. Mindegyik oszlopban legyen egy Szerkesztés, és egy Törlés gomb is.
- A Törlés gombra kattintva azonnal, megerősítés nélkül törlődjön ki az adott user adata a szerverről, és kerüljön eltávolításra a DOM-ból is.
- A Szerkesztés gombra kattintva a user adatai, az id kivételével módosíthatók lesznek a táblázaton belül. Egyszerű text input mezőket használj.
- A Szerkesztés gombra kattintás után ez a gomb eltűnik, ugyanúgy, mint a Törlés gomb, helyette egy Mentés, és Visszavonás gomb jelenjen meg.
- A Mentés gombra kattintva validálni kell a beírt adatokat.
- A validáláshoz reguláris kifejezéseket használj.
- Amennyiben a beírt adatok nem validak, egy hibaüzenetet kell megjeleníteni ami 5 másodperc után eltűnik.
- Amennyiben az adatok validak mind az adatbázisban, mind a DOM-ban mentésre kerüljenek. Ebben az esetben is meg kell jeleníteni egy üzenetet, ami 5 másodpercig látszódik.
- Egyszerre több üzenet is látszódhat.
- A hibáról, és a sikeres módosításról szóló üzenetek design alapján is megkülönböztethetők legyenek.
- A Mentés után ne lehessen tovább szerkeszteni az adatokat.
- Amíg egy user adatai szerkesztés alatt állnak, ne lehessen más user adatait szerkeszteni, sem törölni. Amennyiben mégis valaki rákattint valamelyik másik Törlés, vagy Szerkesztés gombra, jelenlen meg 5 másodpercre az alábbi hibaüzenet:
  "Először be kell fejezned az aktuális szerkesztést"
- A Visszavonás gombra kattintva a user eredeti, tehát a szerkesztés előtti adatok íródjanak vissza.
- Újra a Szerkesztés, és Törlés gomb látszódjon.
- Lehetőség legyen új felhasználók létrehozására. Ehhez egy formot kell készíteni.
- Új felhasználók adatainak felvitelekor legyen validálás. Itt ugyanazok a szabályok érvényesek, és ugyanúgy kell az üzeneteket is megjeleníteni, mint a szerkesztéskor.
- Sikeres mentés estén a felhasználó adatai jelenjenek meg a táblázat tetején. Innen kezdve szerkeszthető, törölhető az új user is.

## Bónuszok

1. Ahol lehet használj object desructuring-et
2. Az adatok lekérése az inputokból dinamic propeties segítségével történjen
3. Realtime validálás legyen és jelezd is a felhasználó felé (pl. input border colorral, és a hibaüzenet megjelenítésével) mikor valid, mikor nem a mező
4. Figyelj oda az accessibility, minimum annyit tegyél meg, hogy ahol click esemény működik, ott az Enter billentyűleütés is működjön
5. A hibaüzenetek legyenek kiszervezve például egy JSON fileba, így többnyelvűvé teheted az alkalmazást. Készíts külön JSON filet a magyar és például az angol nyelvhez. A felhasználó a menüben válassza ki melyik nyelvet szeretné használni, ez legyen localStorageba tárolva, és az ennek megfelelő JSON filet használd.
6. A form serializálásra írj egy új helper function-t
7. Használd az axios-t a natív fetch API helyett
