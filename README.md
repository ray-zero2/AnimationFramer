# Animation Framer
JavaScript/TypeScript request-animation-frame manager

⚠️ : Currently in alpha. There may be destructive changes.


## install
```shell
npm install ray-zero2/animation-framer
```
or
```
yarn add ray-zero2/animation-framer
```


## how to use
```JavaScript
import AnimationFramer from '@ray-zero2/animation-framer';

// This library uses the Singleton pattern.
const animationFramer = AnimationFramer.getInstance();
// bad -> animationFramer = new AnimationFramer();

animationFramer
  .add({
    id: 'animation1' // unique id,
    order: 1, // execution order,
    update: ({ deltaTime, time }) => {
      /* do something animation */
      console.log('hello1');
    }
  })
  .add({
    id: 'animation2'
    order: 0,
    update: ({ deltaTime, time }) => {
      console.log('hello2');
      const coeff = 0.2;

      // Coefficients that are not affected by fps can be obtained.
      // baseFPS is 60;
      const adjustedCoeff60 = animationFramer.getLerpCoeff(0,2);
      const adjustedCoeff120 = animationFramer.getLerpCoeff(0,2, 120);
    }
  });

animationFramer.start(); // result => hello2 hello1

// ~~~~~~~~~~~~~~~~~~

animationFramer.stop();
animationFramer.remove('animation1');
animationFramer.start(); // result => hello2
```

### others
```JavaScript
  const framer = AnimationFramer.getInstance();
  const animationList = framer.animationList; // get registered animations list;


  /* other request animation frame loop */
    // The coefficient can be calculated using time per frame, even in other loops.
    const coeff = AnimationFramer.getLerpCoeff(0.2, deltaTime, 60); // static method
  /*  */
```
