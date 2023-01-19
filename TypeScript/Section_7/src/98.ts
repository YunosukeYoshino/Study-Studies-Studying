{
  //もうひとつの Generic 関数

  // T,U二つの引数であればなんでもよい！
  //extendsでオブジェクト型であることを強制できる！
  function merge<T extends {}, U extends {}>(objA: T, objB: U) {
    // オブジェクト型の交差型を返す。
    return Object.assign(objA, objB);
  }

  const mergedObject = merge({ name: "Max" }, { age: 28 });

  console.log(mergedObject.age);
  console.log(mergedObject);

  interface lengthy {
    length: number;
  }
  //lengthプロパティがあるかどうかわからない
  function countAndDescribe<T extends lengthy>(element: T): [T, string] {
    let descriptionText = "値がありません"; //デフォルトの文字列
    if (element.length > 0) {
      descriptionText = `値は ${element.length} 個です。`;
    }
    return [element, descriptionText];
  }
  console.log(countAndDescribe(["Sports", "Cooking"]));
}
