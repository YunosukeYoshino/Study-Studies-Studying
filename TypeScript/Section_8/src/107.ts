{
  //デコレーターファクトリー

  /*デコレーターの内部で行うことをカスタマイズできる */
  function Logger(logString: string) {
    return function (constructor: Function) {
      console.log(logString);
      console.log(constructor);
    };
  }

  @Logger("ログ出力中 - PERSON") /*デコレーター関数を返す実行をしている */
  class Person {
    name = "Max";

    constructor() {
      console.log("Personオブジェクトを作成中...");
    }
  }

  const pers = new Person();
  console.log(pers);
}
