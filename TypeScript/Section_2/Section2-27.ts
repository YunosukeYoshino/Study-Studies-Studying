function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number) {
  console.log("result: " + num);
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  //コールバックの戻り値を特に利用しない事を明示
  const result = n1 + n2;
  cb(result);
}
addAndHandle(10, 20, (result) => {
  console.log(result);
});

printResult(add(1, 5));

// let combineValues: Function; //関数なら代入できるためまだ不完全
let combineValues: (a: number, b: number) => number; //引数二個の型定義なので完全

combineValues = add; //関数を代入

// combineValues = 6; //関数を代入しているのに数字が入ってしまうとエラーが起こってしまう・・
// combineValues = printResult; //引数の数が一致しないためエラー

console.log(combineValues(8, 8));
