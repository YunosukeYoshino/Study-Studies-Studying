{
  //継承
  class Department {
    //private readonly id
    // name: string; //型を定義する
    private employees: string[] = []; //デフォルトではpublicです。private employees: string[] = [];にすることで内部でしかアクセスできない
    constructor(private readonly id: string, public name: string) {}
    describe(this: Department) {
      console.log(`${this.id} Deapartment  ${this.name}`);
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
    constructor(id: string, private reports: string[]) {
      super(id, "Accounting");
    }

    addReport(text: string) {
      this.reports.push(text);
    }

    printReports() {
      console.log(this.reports);
    }
  }

  const it = new ITDepartment("d1", ["max"]); //継承してインスタンス化する
  it.addEmployee("Max");
  it.addEmployee("Manu");
  it.describe(); //d1 Deapartment  it
  it.printEmployeeInformation();

  const accounting = new AccountingDepartment("d2", []); //継承してインスタンス化する
  accounting.addReport("Something");
  accounting.printReports();
}
