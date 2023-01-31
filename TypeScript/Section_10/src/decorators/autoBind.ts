//autobind decorator
// メソッドのデコレーターとして作成
export function autobind(
  _: any, //construcor関数かclassのプロトタイプ  引数として使用するのみなので _をつける
  _2: string, //プロパティネーム,   引数として使用するのみ
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value; //submit handlerを取得している！

  const adjDescriptor: PropertyDescriptor = {
    configurable: true, //プロパティを変更できるように
    get() {
      //オリジナルのメソッドにアクセス
      const boudFn = originalMethod.bind(this); //オリジナルのbindを呼び出す
      return boudFn;
    },
  };

  return adjDescriptor;
}
