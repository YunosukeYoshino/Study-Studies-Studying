{
  //Generic クラス

  //keyofでオブジェクトのキーであることを明示している
  function extraAndCovert<T extends {}, U extends keyof T>(obj: T, key: U) {
    return "value :" + obj[key];
  }
  console.log(extraAndCovert({ name: "max" }, "name")); //Max

  //プリミティブ型だけに制限する！ 参照型は除外できる！(オブジェクトや配列)
  class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
      this.data.push(item);
    }

    removeItem(item: T) {
      if (this.data.indexOf(item) === -1) {
        //見つからない場合-1を返すためリターンを返す
        return;
      }
      this.data.splice(this.data.indexOf(item), 1); //見つからない場合-1を返す
    }

    getItems() {
      return [...this.data];
    }
  }

  const textStorage = new DataStorage<string>();
  textStorage.addItem("Data1"); //追加
  textStorage.addItem("Data2"); //追加
  textStorage.removeItem("Data2"); //削除

  console.log(textStorage.getItems()); //['Data1']だけが表示

  //ジェネリクスで型情報を渡すことで高い柔軟性を得る
  //   const numberStorage = new DataStorage<number>();

  //   const objStorage = new DataStorage<object>();
  //   const obj = { name: "Max" };
  //   objStorage.addItem(obj);
  //   objStorage.addItem({ name: "Manu" });

  //   objStorage.removeItem(obj); //参照型なので期待している動作にはならない

  //   console.log(objStorage.getItems());
}
