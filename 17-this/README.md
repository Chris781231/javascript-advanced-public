## This

JavaScript esetében a `this` értéke sajnos nem evidens, mert kontextus függő:

1. A globális kódban a global object, ami böngészőben a window, stict módban pedig undefined

   ```js
   console.log(this)
   ;(function () {
     console.log(this)
   })()
   ;(function () {
     'use strict'
     console.log(this)
   })()
   ```

2. Egy objektum metódusában (közvetlenül) az objektum maga

   ```js
   const user = {
     firstName: 'John',
     lastName: 'Doe',
     speak(message) {
       console.log(this)
       console.log(`${this.firstName} ${this.lastName} says ${message}`)
     },
   }

   user.speak('Hi')
   ```

3. Függvényen belül, strict mód nélkül a global object, ami böngészőben a window

   ```js
   const user = {
     firstName: 'John',
     lastName: 'Doe',
     speak() {
       function logger() {
         console.log(this.firstName)
       }
       logger()
     },
   }

   var firstName = 'Jane'

   user.speak()
   ```

4. Függvényen belül, strict módban undefined

   ```js
   'use strict'

   const user = {
     firstName: 'John',
     lastName: 'Doe',
     speak() {
       function logger() {
         console.log(this.firstName)
       }
       logger()
     },
   }

   var firstName = 'Jane'

   user.speak()
   ```

5. Egy eventnél az elem maga, amin az esemény bekövetkezett

   ```js
   'use strict'

   const eventThisSample = {
     create() {
       const template = '<button onclick="console.log(this)">Click me</button>'
       document.body.insertAdjacentHTML('afterend', template)
     },
     handleClick() {
       console.log('clicked')
     },
   }

   eventThisSample.create()
   ```

6. bind()

   ```js
   'use strict'

   const user = {
     firstName: 'John',
     lastName: 'Doe',
     speak(message) {
       console.log(this)
       console.log(`${this.firstName} ${this.lastName} says ${message}`)
     },
   }

   const jane = {
     firstName: 'Jane',
     lastName: 'Doe',
   }

   const speakBind = user.speak.bind(jane)
   speakBind('YEAH')
   ```

7. call(), apply() metódusoknál bármi, kézzel megadhatom

   ```js
   'use strict'

   const user = {
     firstName: 'John',
     lastName: 'Doe',
     speak(message) {
       console.log(this)
       console.log(`${this.firstName} ${this.lastName} says ${message}`)
     },
   }

   const jane = {
     firstName: 'Jane',
     lastName: 'Doe',
   }

   const speak = user.speak
   speak.call(jane, "DO'OH")
   speak.apply(user, ["DO'OH"])
   ```

8. contructor függvénynél az objektumpéldány amit létrehozunk a segítségével
9. Az arrow function a parent scopeból örökli a this-t

   ```js
   'use strict'

   const user = {
     firstName: 'John',
     lastName: 'Doe',
     speak() {
       console.log(this)
       const looger = () => {
         console.log(this)
       }
       looger()
     },
   }

   user.speak()
   ```
