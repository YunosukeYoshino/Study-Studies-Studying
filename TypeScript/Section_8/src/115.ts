//  例："Autobind" デコレータの作成
{
  //アクセサとパラメータのデコレータ アクセサとパラメータのデコレータ

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

    return function <T extends { new (...args: any[]): { name: string } }>(
      originalConstructor: T
    ) {
      // return function (_constructor: Function) {
      //_を記述することでこの引数は受け取るけども必要ないということを伝えられる。

      return class extends originalConstructor {
        //オリジナルのクラスを置き換えている
        constructor(..._: any[]) {
          //_で使っていない引数ということを明示
          super(); //引き継いでいる
          //以下で独自のclassを実行
          console.log("テンプレートを表示"); //5

          const hookEl = document.getElementById(hookId);
          if (hookEl) {
            //hookElが存在している場合にinnerHTMLを設定
            hookEl.innerHTML = template;
            hookEl.querySelector("h1")!.textContent = this.name;
          }
        }
      }; //新しいclassを返す。受け取ったconstuctor関数を継承できる
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

  function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log("Accessor デコレーター");
    console.log(target); //constructor
    console.log(name); //price
    console.log(descriptor); //set:ƒ Price(val)
  }

  function Log3(
    target: any,
    name: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    console.log("Method デコレーター");
    console.log(target); //constructor
    console.log(name); //price
    console.log(descriptor); //set:ƒ Price(val)
  }

  function Log4(target: any, name: string | symbol, position: number) {
    console.log("Parameter デコレーター");
    console.log(target); //constructor
    console.log(name); //Method名
    console.log(position); //0
  }

  //クラスが定義されたときにデコレーター実行するタイミング
  class Product {
    @Log //property
    title: string;
    private _price: number; //外部からアクセス不可

    @Log2 //Accessor
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

    @Log3 //methodの上に
    getPriceWithTax(@Log4 tax: number) {
      return this._price * (1 + tax);
    }
  }

  const p1 = new Product("Book", 100);
  const p2 = new Product("Book2", 200);
  console.log(p1);
  console.log(p2);

  function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
      configurable: true,
      enumerable: false,
      //getterメソッドを追加する！
      get() {
        //thisの参照先はこのget methodが実行するオブジェクトを参照する！これによりイベントリスナーによる上書きを許さない！
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };

    return adjDescriptor;
  }

  class Printer {
    message = "クリックしました！";

    @Autobind //これによりbindなしでもイベントが実行できる！
    showMessage() {
      console.log(this.message);
    }
  }
  const p = new Printer();

  const button = document.querySelector("button")!;
  //   button.addEventListener("click", p.showMessage.bind(p)); thisの参照先がaddEventlisterの時に変わるためbindで回避する
  button.addEventListener("click", p.showMessage);
}
