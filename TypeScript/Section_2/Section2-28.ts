let userInput: unknown; //どの型が分からない場合はany型かuknown型になる
let userName: string;

userInput = 5;
userInput = "max";

// 以下のように型をチェックするのが強制されるため
if (typeof userInput === "string") {
  userName = userInput;
}
