{
  //"keyof" の制約

  //keyofでオブジェクトのキーであることを明示している
  function extraAndCovert<T extends {}, U extends keyof T>(obj: T, key: U) {
    return "value :" + obj[key];
  }
  console.log(extraAndCovert({ name: "max" }, "name")); //Max
}
