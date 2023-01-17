{
  //静的プロパティ thisを使用してconstructorでは使うことが出来ない
  class Department {
    static fiscalYear = 2020; //静的プロパティ

    //private readonly id
    // name: string; //型を定義する
    protected employees: string[] = []; //デフォルトではpublicです。private employees: string[] = [];にすることで内部でしかアクセスできない

    //staticメソッドを定義
    static createEmployee(name: string) {
      //静的プロパティ
      return { name: name };
    }

    constructor(private readonly id: string, public name: string) {}
    describe(this: Department) {
      console.log(`${this.id} Deapartment  ${this.name}`);

      //静的メソッドにアクセス

      // console.log(this.fiscalYear); //erorr
      console.log(Department.fiscalYear); //2020
    }

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
  }

  class AccountingDepartment extends Department {
    private lastReport: string;

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

    constructor(id: string, private reports: string[]) {
      super(id, "Accounting");
      this.lastReport = reports[0];
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
  it.printEmployeeInformation();

  const accounting = new AccountingDepartment("d2", []); //継承してインスタンス化する

  accounting.mostRecentReport = "通期会計レポート"; //addReport呼び出され配列に格納できる！
  accounting.addReport("Something");
  console.log(accounting.mostRecentReport); //ドットでアクセスできる！
  accounting.printReports();
  accounting.addEmployee("Manura");
  accounting.printEmployeeInformation();
}
