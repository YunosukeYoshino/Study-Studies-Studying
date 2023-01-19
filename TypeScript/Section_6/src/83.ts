//交差型

// type
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee; //型の結合

//interface
// interface Admin {
//   name: string;
//   privileges: string[];
// }

// interface Employee {
//   name: string;
//   startDate: Date;
// }

// interface ElevatedEmployee extends Admin, Employee {} //型の結合

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["careate-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Univarsal = Combinable & Numeric;
