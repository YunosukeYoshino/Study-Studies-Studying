function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number) {
  console.log("result: " + num);
}

printResult(add(1, 5));

// let combineValues: Function; //関数なら代入できるためまだ不完全
let combineValues: (a: number, b: number) => number; //引数二個の型定義なので完全

combineValues = add; //関数を代入

// combineValues = 6; //関数を代入しているのに数字が入ってしまうとエラーが起こってしまう・・
// combineValues = printResult; //引数の数が一致しないためエラー

console.log(combineValues(8, 8));
