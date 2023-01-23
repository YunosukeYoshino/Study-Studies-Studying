//  デコレータによるバリデーション
{
  //...116 117

  interface ValidatorConfig {
    [prop: string]: {
      //キーはstringの配列
      [validatableProp: string]: string[]; //["required","positve"]
    };
  }

  const registeredValidators: ValidatorConfig = {};
  function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
      [propName]: [
        // ?? が意味することは、??の左側の値がnullまたはundefinedだった場合に??の右側の値を利用する、ということです。
        ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
        "required",
      ], //キーバリューのペアをobjectに追加できる
    }; //Course プロトタイプのconstructor参照する
  }

  function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name], //キーバリューのペアをobjectに追加できる
      [propName]: [
        ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
        "positive",
      ],
    }; //Course プロトタイプのconstructor参照する
  }

  function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name]; //対象クラスのバリデーターの設定を取得します。
    if (!objValidatorConfig) {
      //ない場合の可能性があるので検証する
      return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
      console.log(prop);

      for (const validator of objValidatorConfig[prop]) {
        //validatorに requiredやpositiveが取得できる。
        switch (validator) {
          case "required":
            isValid = isValid && !!obj[prop]; //明示的にbooleanに変換できる | ひとつでもfalseがあれば全体の結果もfalseに
            break;
          case "positive":
            isValid = isValid && obj[prop] > 0; //0より大きければtrueを返す。
            break;
        }
      } //これで登録されているバリデーターをすべてループをすることができる。
    }
    return isValid; //isValidを返す。
  }
  class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
      this.title = t;
      this.price = p;
    }
  }

  const courseForm = document.querySelector("form")!;
  courseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const titleEl = document.getElementById("title") as HTMLInputElement; //キャストする！
    const priceEl = document.getElementById("price") as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value; //+でnumberにキャストする！

    const createdCourse = new Course(title, price); //インスタンス化
    if (!validate(createdCourse)) {
      //validate関数でオブジェクトを検証します。
      alert("正しく入力してください");
      return;
    }
    console.log(createdCourse);
  });
}
