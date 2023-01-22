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

  // ---
  function Log(target: any, propertyName: string | Symbol) {
    console.log("property デコレータ");
    console.log(target.constructor, propertyName);
  }

  //クラスが定義されたときにデコレーター実行するタイミング
  class Product {
    @Log
    title: string;
    private _price: number; //外部からアクセス不可

    set Price(val: number) {
      if (val > 0) {
        this._price = val;
      } else {
        throw new Error("不正な価格です。 -0以下は設定できません。");
      }
    }

    constructor(t: string, p: number) {
      this.title = t;
      this._price = p;
    }

    getPriceWithTax(tax: number) {
      return this._price * (1 + tax);
    }
  }

  const pr1 = new Product("max", 10);
  console.log(pr1);
}
