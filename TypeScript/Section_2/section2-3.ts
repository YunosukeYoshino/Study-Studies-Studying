function add(n1: number, n2: number, showResult: boolean, phrese: string) {
  if (showResult) {
    const result = n1 + n2; //こちらで一旦number型の計算をする
    console.log(phrese + result); //phreseが文字列なので一気に計算すると間違った値になる
  } else {
    return result;
  }
}

const number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = "Result: ";
add(number1, number2, printResult, resultPhrase);
