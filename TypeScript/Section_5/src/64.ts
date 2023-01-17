{
  //readonly 初期化したものを変更することを防げる
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

  const accounting = new Department("d1", "Accounting");
  accounting.addEmployee("Max");
  accounting.addEmployee("Manu");
  accounting.describe(); //d1 Deapartment  Accounting

  accounting.printEmployeeInformation();
}
