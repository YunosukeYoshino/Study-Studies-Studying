const userName = "Max";

let age = 30;

age = 29;

function add(a: number, b: number) {
  let result;
  result = a + b;
  return result;
}

//varはグローバルスコープのためどこからでもアクセスが可能
if (age >= 30) {
  var ages = true;
}
// console.log(ages);

//letはローカルスコープのみに対応してるので、下記のコードはエラーになる
if (age >= 30) {
  let isAdult = true;
}
// console.log(isAdult);//
