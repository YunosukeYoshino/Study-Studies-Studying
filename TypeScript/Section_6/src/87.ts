{
  interface ErrorContainer {
    //{email:"正しいメールアドレスではありません。",username:"正しいユーザーネームではありません"}
    // id: string;
    [prop: string]: string; //index型 kyeの値の型を設定できる
  } //エラーメッセージを格納

  const errorBag: ErrorContainer = {
    email: "正しいメールアドレスではありません。",
    username: "ユーザー名に記号を含めることはできません。",
  };

  console.log(errorBag);
}
