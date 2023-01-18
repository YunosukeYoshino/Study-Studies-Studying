{
  //privateなコンストラクタ
  //シングルトンパターン 生成するインスタンスの数を1つに制限するデザインパターンです

  abstract class Department {
    static fiscalYear = 2020; //静的プロパティ

    //private readonly id
    // name: string; //型を定義する
    protected employees: string[] = []; //デフォルトではpublicです。private employees: string[] = [];にすることで内部でしかアクセスできない

    //staticメソッドを定義
    static createEmployee(name: string) {
      //静的プロパティ
      return { name: name };
    }

    constructor(protected readonly id: string, public name: string) {}
    //abstract = 抽象
    abstract describe(this: Department): void; //独自の実装はできないため中身を削除
    /*
    具体的な実装を提供せずに、サブクラスに継承することができる
    abstractは親クラスをインスタンスすることはできない
    */

    addEmployee(employee: string) {
      // this.id = "d2"; //Readonly 初期化したものを変更することを防げる
      this.employees.push(employee);
    }

    printEmployeeInformation() {
      console.log(this.employees.length);
      console.log(this.employees);
    }
  }

  class ITDepartment extends Department {
    /*
    一つのクラスしか継承できない
    継承先で何も指定しなければbaseクラスが自動的に追加される
    */
    admins: string[];
    constructor(id: string, admins: string[]) {
      super(id, "IT");
      this.admins = admins;
    }

    describe() {
      console.log("IT部門 - ID:" + this.id);
    }
  }

  class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment; //インスタンスにオブジェクトを格納

    /*プロパティのようにアクセスできる！ */

    //getter
    get mostRecentReport() {
      if (this.lastReport) {
        return this.lastReport; //カプセル化 情報を隠蔽
      }
      throw new Error("レポートが見つかりません");
    }

    //setter
    set mostRecentReport(value: string) {
      if (!value) {
        throw new Error("正しい値を入力してください");
      }
      this.addReport(value); //reportが呼び出される
    }

    private constructor(id: string, private reports: string[]) {
      super(id, "Accounting");
      this.lastReport = reports[0];
    }

    static getInstance() {
      //インスタンスがあればそのインスタンスを返す。
      if (AccountingDepartment.instance) {
        return this.instance; //thisはクラスを指す
      }

      //インスタンスがなければそのインスタンスを作ってプロパティを作成。
      //staticプロパティに格納
      this.instance = new AccountingDepartment("d2", []);
      return this.instance;
    }

    describe(): void {
      console.log("会計部門 - ID:" + this.id);
    }
    addReport(text: string) {
      this.reports.push(text);
      this.lastReport = text;
    }

    printReports() {
      console.log(this.reports);
    }

    addEmployee(name: string) {
      //メソッドの上書き！！ 独自の実装 継承元のprotectedが鍵
      if (name === "Max") {
        return;
      }
      //継承元がprivateの場合サブクラスに継承できない protectedなら継承可能
      this.employees.push(name);
    }
  }

  const employee1 = Department.createEmployee("Max");
  console.log(employee1, Department.fiscalYear); //{name: 'Max'} 2020

  const it = new ITDepartment("d1", ["max"]); //継承してインスタンス化する
  it.addEmployee("Max");
  it.addEmployee("Manu");
  it.describe(); //d1 Deapartment  it
  // it.printEmployeeInformation();

  // const accounting = new AccountingDepartment("d2", []); //継承してインスタンス化する
  const accounting = AccountingDepartment.getInstance();
  const accounting2 = AccountingDepartment.getInstance();
  console.log(accounting);
  console.log(accounting2);

  accounting.mostRecentReport = "通期会計レポート"; //addReport呼び出され配列に格納できる！
  accounting.addReport("Something");
  accounting.describe();
  console.log(accounting.mostRecentReport); //ドットでアクセスできる！
  // accounting.printReports();
  accounting.addEmployee("Manura");
  // accounting.printEmployeeInformation();
}
