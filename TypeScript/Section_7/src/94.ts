//組み込みの Generic 型 & Generics とは

const names: Array<string> = []; //ジェネリクス型は追加の情報を渡すことができる。

// 最終的に何を投げるかを指定できる
const promise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve("終わりました。"); //最終的にstringを返す。
  }, 2000);
});

promise.then((data) => {
  data.split("");
});
