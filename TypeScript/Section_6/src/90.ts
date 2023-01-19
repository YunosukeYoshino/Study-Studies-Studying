{
  //オプショナルチェーン
  type Combinable = string | number;
  type Numeric = number | boolean;

  type Univarsal = Combinable & Numeric;

  //関数オーバーロード 推論がうまくいかないときに役に立つ
  function add(a: number, b: number): number; //二つともnumberが呼び出されるとnumberを返す
  function add(a: string, b: string): string; //二つともstringが呼び出されるとstringを返す
  function add(a: string, b: number): string;
  function add(a: number, b: string): string;
  function add(a: Combinable, b: Combinable) {
    if (typeof a === "string" || typeof b === "string") {
      //このif文が型ガードといわれるものです。
      return a.toString() + b.toString();
    }
    return a + b;
  }

  //型キャストでstringであることを伝える。いちいち伝えないといけないのが面倒・・・
  const result = add("hello", "yuche") as string; //string | number
  //   function add(a: string, b: string): string (+3 overloads)

  result.split("");

  const fetchedUserData = {
    //dammy
    id: "u1",
    name: "user1",
    job: {
      title: "Developer",
      description: "TypeScript",
    },
  };
  //fetchedUserData.jobが存在していれば右辺を返す
  //   console.log(fetchedUserData.job && fetchedUserData.job.title);

  //オプショナルチェーンはネストされたオブジェクトに安全にアクセス可能
  console.log(fetchedUserData?.job?.title);

  const userInput = ""; //nullやundefindはfalsyとして扱われる

  //   nullやundefind ではない場合左辺が使われる 空文字列が左辺を使える
  const scoredData = userInput ?? "DEFALUT";

  console.log(scoredData);
}
