{
  //便利なデコレーターx

  /*デコレーターの内部で行うことをカスタマイズできる */
  function Logger(logString: string) {
    console.log("Loggerが実行"); //2

    return function (constructor: Function) {
      console.log(`logString ${logString}`); //3
      console.log(constructor); //4
    };
  }

  /*新しいデコレーター作成
  デコレーター関数に必要な追加の設定を渡すことができます。
  */
  function withTemplate(template: string, hookId: string) {
    console.log("TEMPLATE FACTORY"); //1

    return function (constructor: any) {
      // return function (_constructor: Function) {
      //_を記述することでこの引数は受け取るけども必要ないということを伝えられる。
      console.log("テンプレートを表示"); //5

      const hookEl = document.getElementById(hookId);
      const p = new constructor();
      if (hookEl) {
        //hookElが存在している場合にinnerHTMLを設定
        hookEl.innerHTML = template;
        hookEl.querySelector("h1")!.textContent = p.name;
      }
    };
  }
  //デコレーターは下から順番に処理される！
  @withTemplate("<h1>Personオブジェクト</h1>", "app")
  @Logger("ログ出力中 - PERSON") //3
  class Person {
    name = "Max";

    constructor() {
      console.log("Personオブジェクトを作成中..."); //6 //7
    }
  }

  const pers = new Person();
  console.log(pers);
}
