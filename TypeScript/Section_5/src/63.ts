{
  // constructorの初期化のショートカット
  // constructor(private id: string, public name: string)
  class Department {
    //private id
    // name: string; //型を定義する
    private employees: string[] = []; //デフォルトではpublicです。private employees: string[] = [];にすることで内部でしかアクセスできない
    constructor(private id: string, public name: string) {
      /*
      初期化のコードをすべて省略できる
      */
      // this.id = id;
      // this.name = userName;
    }
    describe(this: Department) {
      //thisに型定義を行う Departmentクラスを参照するインスタンスだよー
      console.log(`${this.id} Deapartment  ${this.name}`);
    }
    addEmployee(employee: string) {
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
