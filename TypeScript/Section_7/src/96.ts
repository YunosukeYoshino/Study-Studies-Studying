{
  // T,U二つの引数であればなんでもよい！
  function merge<T extends {}, U>(objA: T, objB: U) {
    // オブジェクト型の交差型を返す。
    return Object.assign(objA, objB);
  }

  const mergedObject = merge({ name: "Max" }, { age: 28 }); /*as {
        name: string;
        age: number;
      };*/ //型キャストは使えるが面倒・・・
  //ジェネリクス型は渡した型を推論できる！

  console.log(mergedObject.age);
  console.log(mergedObject);
}
