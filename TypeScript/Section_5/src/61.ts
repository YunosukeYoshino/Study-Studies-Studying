{
  //constructor And this
  class Department {
    name: string; //型を定義する
    constructor(userName: string) {
      this.name = userName;
    }
    describe(this: Department) {
      //thisに型定義を行う Departmentクラスを参照するインスタンスだよー
      console.log("Deapartment " + this.name);
    }
  }

  const accounting = new Department("Accounting");

  accounting.describe();

  // const AccountingCopy = { describe: accounting.describe }; //関数を渡しているだけだとthisが参照できない・・・！
  // AccountingCopy.describe(); //エラーがおきるよ

  const AccountingCopy = { name: "Yuche", describe: accounting.describe }; //関数を渡しているだけだとthisが参照できない・・・！
  AccountingCopy.describe(); //nameが指定されているのでエラーが起きない
}
