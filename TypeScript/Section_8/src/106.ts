function Logger(constructor: Function) {
  console.log("ログ出力中...");
  console.log(constructor);
}

@Logger
/*デコレーターはクラスが定義された前に実行される。
インスタンス化のタイミングではない*/
class Person {
  name = "Max";

  constructor() {
    console.log("Personオブジェクトを作成中...");
  }
}

const pers = new Person();
console.log(pers);
