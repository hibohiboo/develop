function f() {
  let total = 0;
  const x = 5;
  for (let x = 1; x < 10; x++) {
      total += x;
    }
  console.log(x);
}

const rectangle = { height: 20, width: 10 };
const areaMessage = `Rectangle area is ${rectangle.height * rectangle.width}`;

class Foo {
    /**
     * A function that returns an object.
     * Also no type information is given, the object should be correctly reflected.
     */
  public createSomething() {
      return {
          foo: 'bar',
          doSomething(a: number) { return a + 1;},
          doAnotherThing() {},
        };
    }
}

export default class DataService {
}
