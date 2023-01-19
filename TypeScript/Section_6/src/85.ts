{
  //判別可能なUnion型判別可能なユニオン型 (discriminated union)

  type Combinable = string | number;
  type Numeric = number | boolean;

  type Univarsal = Combinable & Numeric;

  function add(a: Combinable, b: Combinable) {
    if (typeof a === "string" || typeof b === "string") {
      //このif文が型ガードといわれるものです。
      return a.toString() + b.toString();
    }
    return a + b;
  }

  // type
  type Admin = {
    name: string;
    privileges: string[];
  };

  type Employee = {
    name: string;
    startDate: Date;
  };
  type UnknownEmployee = Employee | Admin;

  function printEmployeeInformation(emp: UnknownEmployee) {
    console.log(emp.name);
    if ("privileges" in emp) {
      //オブジェクトの中にプロパティが入ってるかどうか
      console.log("Privileges: " + emp.privileges);
    }
    if ("startDate" in emp) {
      //オブジェクトの中にプロパティが入ってるかどうか
      console.log("Privileges: " + emp.startDate);
    }
  }

  const e1: ElevatedEmployee = {
    name: "Max",
    privileges: ["careate-server"],
    startDate: new Date(),
  };

  printEmployeeInformation({ name: "manu", startDate: new Date() }); //typeで作ったオブジェクトを使用している？

  class Car {
    drive() {
      console.log("運転中...");
    }
  }

  class Truck {
    drive() {
      console.log("トラックを運転中...");
    }
    loadCargo(amount: number) {
      console.log("荷物を載せています..." + amount);
    }
  }

  type Vehicle = Car | Truck;
  const v1 = new Car();
  const v2 = new Truck();

  function useVhicle(vehicle: Vehicle) {
    vehicle.drive();

    if (vehicle instanceof Truck) {
      //instanceof そのクラスで作られたオブジェクトかどうか判断する
      // if ("loadCargo" in vehicle) {
      vehicle.loadCargo(1000);
    }
  }

  useVhicle(v1);
  useVhicle(v2);

  interface Bird {
    type: "bird"; //リテラル型 birdという文字列だけ許容する
    flyingSpeed: number;
  }
  interface Horse {
    type: "horse"; //リテラル型 birdという文字列だけ許容する
    runningSpeed: number;
  }

  type Animal = Bird | Horse;

  function moveAnimal(animal: Animal) {
    // if ("flyingSpeed" in animal) {
    //   console.log(animal.flyingSpeed); //全てのオブジェクトがflyingSpeedを持ってるわけではないので、型ガードでチェックする
    // }
    let speed;

    //判別可能なUnion型判別可能なユニオン型
    switch (animal.type) {
      case "bird": //自動補完が出る
        speed = animal.flyingSpeed;
        break;
      case "horse":
        speed = animal.runningSpeed;
    }
    console.log("移動速度: " + speed);
  }

  moveAnimal({ type: "bird", flyingSpeed: 10 });
}
