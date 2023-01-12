{
  const userName = "Max";
  let age = 30;
  age = 29;

  const add = (a: number, b: number) => {
    let result;
    result = a + b;
    return result;
  };
  // const add = (a: number, b: number) => a + b; ワンラインの書き方
  console.log(add(4, 9)); //13

  //引数ユニオン型でvoid型の関数型を定義
  const printOutput: (output: string | number) => void = (output) => {
    console.log(output);
  };
  printOutput("10");

  const button = document.querySelector("button");

  // e:MouseEventは暗黙に型定義されている
  if (button) {
    button.addEventListener("click", (e) => {
      console.log(e);
    });
  }
}
