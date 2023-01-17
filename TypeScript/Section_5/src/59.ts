//class

class User {
  name: string; //型を定義する
  constructor(userName: string) {
    this.name = userName;
  }
}

const newUser1 = new User("yunosuke");

console.log(newUser1);
