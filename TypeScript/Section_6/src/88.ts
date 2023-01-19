{
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
}
