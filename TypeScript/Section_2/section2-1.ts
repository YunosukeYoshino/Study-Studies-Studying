function add(n1: number, n2: number) {
  //number型を指定すると文字列を引数に渡せない
  return n1 + n2;
}

const number1 = 5;
const number2 = 2.8;

const result = add(number1, number2);
console.log(result);
