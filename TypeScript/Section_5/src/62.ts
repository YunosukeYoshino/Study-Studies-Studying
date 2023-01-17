{
  //private and public
  class Department {
    name: string; //型を定義する
    private employees: string[] = []; //デフォルトではpublicです。private employees: string[] = [];にすることで内部でしかアクセスできない
    constructor(userName: string) {
      this.name = userName;
    }
    describe(this: Department) {
      //thisに型定義を行う Departmentクラスを参照するインスタンスだよー
      console.log("Deapartment " + this.name);
    }
    addEmployee(employee: string) {
      this.employees.push(employee);
    }

    printEmployeeInformation() {
      console.log(this.employees.length);
      console.log(this.employees);
    }
  }

  const accounting = new Department("Accounting");
  accounting.addEmployee("Max");
  accounting.addEmployee("Manu");
  // accounting.employees[2] = "anna"; //直接アクセスできてしまう・・・
  /*
  private employees: string[] = [];にすることで内部でしかアクセスできない
  プロパティ 'employees' はプライベートで、クラス 'Department' 内でのみアクセスできます。
  */
  accounting.printEmployeeInformation();
}
