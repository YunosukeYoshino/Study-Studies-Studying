{
  const userName = "Max";
  let age = 30;
  age = 29;

  const add = (a: number, b: number = 1) => {
    /* bにデフォルト値を設定
     右側の値にしかデフォルト値を設定できない; */
    let result;
    result = a + b;
    return result;
  };
  // const add = (a: number, b: number) => a + b; ワンラインの書き方
  console.log(add(4));

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

const hobbies = ["Sports", "Cooking"];
const ActiveHobbies = ["Study", ...hobbies]; //ダイレクトでも使える

console.log(hobbies[0]); //0番目の配列を展開
//ActiveHobbies.push(hobbies[0], hobbies[1]); //パラメーターを並べる必要がある。
ActiveHobbies.push(...hobbies); //スプレッド構文で展開してあげる。
console.log(ActiveHobbies);

const favaritePlayer = [
  {
    name: "Shohei Ohtani",
    sports: "baseball",
    age: 28,
    height: 197,
  },
];
const footBallPlayer = {
  name: "kesuke Honda",
  sports: "football",
  age: 35,
  height: 187,
};

const wbcMember = {
  ...favaritePlayer, //footBallPlayerが展開される　新しく作られたオブジェクトになる。
};

console.log(wbcMember);

favaritePlayer.push(footBallPlayer);
console.log(favaritePlayer);

const test = []; //空配列を作って
test.push(...favaritePlayer); //スプレッド構文でpushしてあげる
console.log(test); //favaritePlayerが複製されている
