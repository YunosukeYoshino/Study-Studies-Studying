{
  //便利なデコレーターx

  /*デコレーターの内部で行うことをカスタマイズできる */
  function Logger(logString: string) {
    return function (constructor: Function) {
      console.log(logString);
      console.log(constructor);
    };
  }

  /*新しいデコレーター作成
  デコレーター関数に必要な追加の設定を渡すことができます。
  */
  function withTemplate(template: string, hookId: string) {
    return function (constructor: any) {
      // return function (_constructor: Function) {
      //_を記述することでこの引数は受け取るけども必要ないということを伝えられる。

      const hookEl = document.getElementById(hookId);
      const p = new constructor();
      console.log(p.name);
      if (hookEl) {
        //hookElが存在している場合にinnerHTMLを設定
        hookEl.innerHTML = template;
        hookEl.querySelector("h1")!.textContent = p.name;
      }
    };
  }

  @withTemplate("<h1>Personオブジェクト</h1>", "app")

  //   @Logger("ログ出力中 - PERSON") /*デコレーター関数を返す実行をしている */
  class Person {
    name = "Max";

    constructor() {
      console.log("Personオブジェクトを作成中...");
    }
  }
  // ```ここから 既存のクラスやメソッドにデコレーションする
  @withTemplate("<h1>Personオブジェクト</h1>", "app")
  class Person2 {
    name = "Max";

    constructor() {
      console.log("Personオブジェクトを作成中...");
    }
  }
  // ```ここまで

  const pers = new Person();
  console.log(pers);
}
