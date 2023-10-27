# Number és Math
### Number.isFinite()
A `Number.isFinite()` metódus segítségével megvizsgálhatjuk, hogy egy adott szám véges e:

```javascript
  console.log(Number.isFinite(Infinity)); // false
  console.log(Number.isFinite(-Infinity)); // false
  console.log(Number.isFinite(NaN)); // false
  console.log(Number.isFinite(10)); // true
```
### Number.isNaN()
Az `Number.isNaN()` metódus segítségével megvizsgálhatjuk, hogy egy adott érték nem szám e. 
A `Number.isNaN()` nem összekeverendő a globális `isNaN()` metódussal. Hasonló, de mégis más. 
A fő különbség, hogy a `Number.isNaN()` nem végez típuskonverziót az összehasonlítás előtt.

```javascript
  console.log('--- Global isNaN()---');
  console.log(isNaN(true));       // false
  console.log(isNaN('hello'));    // true
  console.log(isNaN(12));         // false
  console.log(isNaN(NaN));        // true
  console.log(isNaN('NaN'));      // true

  console.log('--- Number.isNaN()---');
  console.log(Number.isNaN(true));       // false
  console.log(Number.isNaN('hello'));    // false
  console.log(Number.isNaN(12));         // false
  console.log(Number.isNaN(NaN));        // true
  console.log(Number.isNaN('NaN'));      // false
```

### Number.isSafeInteger()
A `Number.MIN_SAFE_INTEGER` a legkisebb a `Number.MAX_SAFE_INTEGER` konstans a legnagyobb biztonságosan használható egész számot adja meg. Ez alatt/felett már nem biztos, hogy a számításaink eredményei összehasonlítások pontosak/megbízhatóak lesznek.

A „biztonságos” szó arra utal, hogy a matematikai egészek hogyan jelennek meg JavaScriptben.
A -2<sup>53</sup>, és 2<sup>53</sup> értékek közé eső értékek biztonságosak, mert a Javascript 64 biten,
előjelesen ábrázolja az egész számokat (1bit – előjelbit, 11bit – karakterisztika, 52(+1)bit - mantissza).
Ezeken a határokon kívül az értékek „nem biztonságosak”, mert egynél több matematikai szám is jelentheti 
ugyanazt az értéket JavaScript-ben. 
Például 2<sup>53</sup> felett csak minden második egész értéket tudja ábrázolni.
Tehát biztonságos az a JavaScript egész, amely egyetlen matematikai egész számot jelöl.

Az `isSafeInteger()` megmondja egy számról, hogy a biztonságos zónába tartozik e.

```javascript
  console.log(Number.MAX_VALUE);

  console.log(Number.MAX_SAFE_INTEGER);
  console.log(Number.MIN_SAFE_INTEGER);

  console.log(Number.isSafeInteger(42));  // true
  console.log(Number.isSafeInteger(9007199254740999)); // false
```

## Bináris és oktális ás hexadecimális számok
```javascript
  const hexa = 0x1F;
  const bin = 0b11111;
  const octal = 0o37;
```

### Math.sign()
Egy szám előjelének vizsgálatára használjuk. 
A visszatérési értéke:
- pozitív szám esetén 1.
- negatív szám estén -1.
- pozitív 0 esetében 0.
- negatív 0 esetében -0.
- egyébként NaN

```javascript
  console.log(Math.sign(10));         // 1
  console.log(Math.sign(+0));         // 0
  console.log(Math.sign(0));          // 0
  console.log(Math.sign(-0));         // -0
  console.log(Math.sign(-1000));      // -1
  console.log(Math.sign(NaN));        // NaN
  console.log(Math.sign(Infinity));   // 1
  console.log(Math.sign(-Infinity));  // -1
```

## Math.trunc()
A `trunc()` metódus visszaadja a szám egész részét
```javascript
  console.log(Math.trunc(30.17));   // 30
  console.log(Math.trunc(-30.17));  // -30
  console.log(Math.trunc(-0.17));   // -0
  console.log(Math.trunc(0.17));    // 0
```

## BinInt
A BigInt egy új primitív típus. Segítségével tetszőleges méretű egész számokkal dolgozhatunk:
```javascript
  const max = Number.MAX_VALUE;
  console.log(max ** 2);    // Infinity

  const bigIntNumber = BigInt(max);
  console.log(typeof bigIntNumber); // bigint
  console.log(bigIntNumber ** 20n); // 124254234561813376899429635407...
```