{
  //型キャスト

  //   const paragraph = document.querySelector("p"); //HTMLParagraphElement | null
  const paragraph = document.getElementById("message-output")!; //HTMLElement | null

  //   const userInputEllement = <HTMLInputElement>(
  //     document.getElementById("user-input")!
  //   ); //<HTMLInputElement>でinputタグであることを指定できる

  //   const userInputEllement = document.getElementById(
  //     "user-input"
  //   ) as HTMLInputElement; //asの前にある型を伝えることができる。

  //？マークつけても特定のHTMLタグにしかないプロパティを設定できない
  const userInputEllement = document.getElementById("user-input");

  if (userInputEllement) {
    //?の代わりに使える構文
    (userInputEllement as HTMLInputElement).value = "こんにちは";
  }
}
