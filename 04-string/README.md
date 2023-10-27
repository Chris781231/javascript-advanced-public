
# String-ek

## Template literal
Eddig ha `string literál`-t és változókat akartunk összefűzni, a "+" jelet használtuk. Most már van egy szebb, jobb módszer. Ez pedig a `template literal`.  
A `template literal` használatával az aposztróf/idézőjel helyett a tompa ékezetet (AltGr+7) használjuk, és nem kell a "+" jellel összefűznünk, hanem helyette a `${}` jelek közé illesztjük a változóinkat.

```javascript
  const firstName = 'John';
  const lastName = 'Doe';
  const age = 30;

  const sayMyName = `My name is ${firstName} ${lastName}, and I'm ${age} years old.`;
```

## Template literal tömbökkel
Így már egyszerűbben tudunk html template-eket készíteni:

```javascript
  const people = [
    {
      firstName: 'John',
      lastName: 'Doe'
    },
    {
      firstName: 'Jane',
      lastName: 'Doe'
    }
  ];

  const template = `<div>
                      ${people.map(person => `<p>${person.firstName} ${person.lastName}</p>`).join('')}
                    </div>`;
```
## Új String metódusok
- `startsWith(searchString[, position])` : Megadja, hogy a `string` a keresett szövegrészlettel kezdődik e. Megadhatjuk azt is, hogy honnan kezdje a keresést.
- `endWith(searchString[, length])`: Megadja, hogy a `string` a keresett szövegrészlettel végződik e. Megadhatjuk azt is, hogy meddig keressen.
- `includes(searchString[, position])`: Megadja, hogy a `string` a keresett szövegrészt tartalmazza e. Megadhatjuk azt is, hogy honnan kezdje a keresést.
- `repeat(count)` : Egy adott szöveget `count`-szor ismételtet.

## Multiline string
Többsoros szöveget a következőképp tudunk létrehozni:

```javascript
  const multiline = `first line
                     second line 
                     third line`;

  const translate = data => data.split('\n').map(line => line.trimStart()).join('\n');

  console.log(translate(multiline));     
```

## Spread operátor
A `spread operátor`t rengeteg dologra használhatjuk. A leggyakoribb alkalmazásai: 

```javascript
  // split string
  const message = 'message';
  const characterArray = [...message];
  console.log(characterArray);      //  ['m', 'e', 's', 's', 'a', 'g', 'e']

  // concat arrays
  const arr1 = [1, 2, 3, 4, 5];
  const arr2 = [6, 7, 8, 9, 10];
  console.log([...arr1, ...arr2]);  // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  // array - shallow copy
  const copyArr1 = [...arr1];
  console.log(copyArr1);            // [1, 2, 3, 4, 5]

    // object - shallow copy
  const user = {
    firstName: 'John',
    lastName: 'Doe'
  };
  const copyUser = { ...user };
  user.firstName = 'Jane';
  console.log(copyUser);            // {firstName: 'John', lastName: 'Doe'}
```

## Rest paraméter
A `rest parameter` hasonló, mint a `spread Operator`, csak egy kicsit más szemszögből kell néznünk a dolgokat.
Egy függvénynek tudjuk tömbösítve átadni a paramétereket. Azaz jelen esetben lesz 2+X paraméterünk. Az első két paraméter `x` és `y`, az összes többi pedig a `z` tömbbe kerül.

```javascript
  function restParameter(x, y, ...z) {
    console.log(arguments);
    console.log(x, y, z);
  }

 restParameter(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
```

### Tagged template literal
Nem csak `template literal` hanem `tagged template literal`-ok is vannak már a JavaScript-ben. A `template`-ünket át tudjuk adni egy feldolgozó függvénynek, ami segítségével tetszőleges módosításokat hajthatunk végre. Az újdonság az egészben, hogy nem hagyományos módon hívjuk meg a függvényt.

```javascript
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    age: '30'
  };

  const tag = (texts, ...values) =>
    texts.map((text, index) =>
      `${text}${values[index] ? `<strong>${values[index].toLocaleUpperCase()}</strong>` : ''}`
    ).join('');

  const template = tag`My name is ${user.firstName} ${user.lastName}, and I'm ${user.age} years old.`;
  document.body.innerHTML = template;
```
