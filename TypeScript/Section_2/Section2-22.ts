function combine(
  input1: number | string,
  input2: number | string,
  // resultConverstion: string//これだとどの引数を渡せばいいか分からない
  resultConverstion: "as-number" | "as-text" //どちらかの文字列しか許可されない
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConverstion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + "" + input2.toString();
  }
  return result;
  // if (resultConverstion === "as-number") {
  //   return +result; //number型に変換
  // } else {
  //   return result.toString();
  // }
}

const combineAges = combine(30, 26, "as-number");
console.log(combineAges);

const combineStringAges = combine("30", "26", "as-number"); //文字列で渡す
console.log(combineStringAges);

const combineNames = combine("tom", "anna");
console.log(combineNames);
