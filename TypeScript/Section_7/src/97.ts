{
  //Generics に制約を追加する
  // T,U二つの引数であればなんでもよい！
  //extendsでオブジェクト型であることを強制できる！
  function merge<T extends {}, U extends {}>(objA: T, objB: U) {
    // オブジェクト型の交差型を返す。
    return Object.assign(objA, objB);
  }

  const mergedObject = merge({ name: "Max" }, { age: 28 });

  console.log(mergedObject.age);
  console.log(mergedObject);
}
