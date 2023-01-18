{
  //カスタムタイプ いろんな型を設定できる
  // type Greetable = {
  //   name: string;

  //   greet(phrase: string): void;
  // };
  interface Greetable {
    name: string;

    greet(phrase: string): void;
  }

  //Greetable interfaceを実装する
  class Person implements Greetable {
    name: string;
    age = 30;

    constructor(n: string) {
      this.name = n;
    }
    greet(phrase: string) {
      //interfaceによって強制できる
      console.log(phrase + " " + this.name);
    }
  }

  let user1: Greetable;

  user1 = new Person("max"); //インスタンス化
  user1.greet("Hello");
  console.log(user1); //Person {age: 30, name: 'max'}
}
