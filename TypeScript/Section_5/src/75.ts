{
  interface Greetable {
    readonly name: string;

    greet(phrase: string): void;
  }

  //Greetable interfaceを実装する
  class Person implements Greetable {
    name: string; //読み取り専用であることを明示できる
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
  // user1.name="max"; readonlyのため代入できない
  user1.greet("Hello");
  console.log(user1); //Person {age: 30, name: 'max'}
}
