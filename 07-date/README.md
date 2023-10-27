# Date

## Date objektum létrehozása
`Date` objektum létrehozásához mindig a `new` kulcsszóval történik. Egyéb esetben `string`et kapunk.

```javascript
  const dateNow = new Date();
  const date1 = new Date('October 8, 2019 11:50:10');
  const date2 = new Date('2019-10-08T11:50:10');
  const date3 = new Date(2019, 9, 8, 11, 50, 10, 555);
  const dateString = Date();
```

## Hasznos Date metódusok
```javascript
  const dateNow = new Date();
  console.log(dateNow.toDateString());            // Mon Oct 04 2021
  console.log(dateNow.toLocaleDateString('hu'));  // 2021. 10. 04.
  console.log(dateNow.toTimeString());            // 14:17:06 GMT+0200
  console.log(dateNow.toLocaleTimeString('hu'));  // // 14:17:06
  console.log(dateNow.toJSON());                  // 2021-10-04T12:17:06.144Z
  console.log(Date.now() / 1000 / 60 / 60 / 24);  
```

## get… metódusok
A `get...` metódusok segítségével a `Date` objektumom egyes részeinek az értékét tudjuk lekérdezni:

```javascript
  const dateNow = new Date();

  console.log('year: ', dateNow.getFullYear());           // 2021
  console.log('month: ', dateNow.getMonth());             // 9
  console.log('day of the week: ', dateNow.getDay());     // 10
  console.log('day of the month: ', dateNow.getDate());   // 4
  console.log('hours: ', dateNow.getHours());             // 14
  console.log('minutes: ', dateNow.getMinutes());         // 40
  console.log('seconds: ', dateNow.getSeconds());         // 33
  console.log('miliseconds: ', dateNow.getMilliseconds());//416
```

## getUTC… metódusok
A `getUTC...` metódusok csupán annyiban különböznek az előbbiektől, hogy a greenwichi időzónát veszik alapul:

```javascript
  const dateNow = new Date();

  console.log('UTC year: ', dateNow.getUTCFullYear());            // 2021
  console.log('UTC month: ', dateNow.getUTCMonth());              // 9
  console.log('UTC day of the week: ', dateNow.getUTCDay());      // 10
  console.log('UTC day of the month: ', dateNow.getUTCDate());    // 4
  console.log('UTC hours: ', dateNow.getUTCHours());              // 13
  console.log('UTC minutes: ', dateNow.getUTCMinutes());          // 55  
  console.log('UTC seconds: ', dateNow.getUTCSeconds());          // 10
  console.log('UTC miliseconds: ', dateNow.getUTCMilliseconds()); // 113
```

## set… metódusok
A `set...` metódusok segítségével egy `Date` objektum egyes részeit tudjuk módostani:

```javascript
  const myDate = new Date();
  myDate.setFullYear(2022);
  myDate.setMonth(10);
  myDate.setDate(10);
  myDate.setHours(10);
  myDate.setMinutes(10);
  myDate.setSeconds(10);
  myDate.setMilliseconds(10);
  console.log(myDate);
```