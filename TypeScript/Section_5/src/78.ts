{
  //   type AddFn = (a: number, b: number) => number; //関数型

  interface AddFn {
    //上記の別の書き方になる
    (a: number, b: number): number; //匿名メソッド
  }

  let add: AddFn; //代入

  //   AddFnのインターフェースが適用される;
  add = (n1: number, n2: number) => {
    return n1 + n2;
  };

  interface Named {
    readonly name?: string;
    outputName?: string; //?つけることでそのプロパティをい持っているかどちらでもよい
  }
  interface Greetable extends Named {
    greet(phrase: string): void;
  }

  //Greetable interfaceを実装する
  //interfaceを両方持てる
  //   class Person implements Greetable, Named {
  class Person implements Greetable {
    name?: string; //読み取り専用であることを明示できる
    age = 30;

    constructor(n?: string) {
      //パラメーターにデフォルト値を設定できますし、?でもOK
      if (n) {
        this.name = n;
      }
    }
    greet(phrase: string) {
      //interfaceによって強制できる
      if (this.name) {
        console.log(phrase + " " + this.name);
      } else {
        console.log("Hi!");
      }
    }
  }

  let user1: Greetable;

  user1 = new Person(); //インスタンス化
  // user1.name="max"; readonlyのため代入できない
  user1.greet("Hello");
  console.log(user1); //Person {age: 30, name: 'max'}
}
