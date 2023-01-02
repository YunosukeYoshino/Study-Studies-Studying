function combine(input1, input2, resultConverstion) {
    var result;
    if ((typeof input1 === "number" && typeof input2 === "number") ||
        resultConverstion === "as-number") {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + "" + input2.toString();
    }
    return result;
    // if (resultConverstion === "as-number") {
    //   return +result; //number型に変換
    // } else {
    //   return result.toString();
    // }
}
var combineAges = combine(30, 26, "as-number");
console.log(combineAges);
var combineStringAges = combine("30", "26", "as-number"); //文字列で渡す
console.log(combineStringAges);
var combineNames = combine("tom", "anna");
console.log(combineNames);
