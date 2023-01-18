//interface 型の定義 オブジェクトの構造
interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}

let user1: Person;
user1 = {
  name: "yuche",
  age: 30,

  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  },
};

user1.greet("Hello");
