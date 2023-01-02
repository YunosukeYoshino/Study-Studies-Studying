function add(n1, n2) {
  // JavaScriptで型宣言しない場合以下のように書ける
  if (typeof n1 !== "number" || typeof n2 !== "number") {
    throw new Error("入力値が正しくありません");
  }
  return n1 + n2;
}
