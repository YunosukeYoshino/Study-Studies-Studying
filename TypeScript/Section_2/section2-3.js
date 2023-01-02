function add(n1, n2, showResult, phrese) {
    if (showResult) {
        var result = n1 + n2; //こちらで一旦number型の計算をする
        console.log(phrese + result); //phreseが文字列なので一気に計算すると間違った値になる
    }
    else {
        return result;
    }
}
var number1 = 5;
var number2 = 2.8;
var printResult = true;
var resultPhrase = "Result: ";
add(number1, number2, printResult, resultPhrase);
