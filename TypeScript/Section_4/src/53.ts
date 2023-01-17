{
  // const add = (...numbers: number[]) => {//レストパラメーターで任意の数を受け取れる
  const add = (...numbers: [number, number, number]) => {
    //tupleで数を指定できる
    return numbers.reduce((curResult, curValue) => {
      return curResult + curValue;
    }, 0); //reduce 第一引数に計算式、第二引数は初期値
  };

  // const addNumbers = add(2, 3, 4, 52, 52, 3);
  const addNumbers = add(2, 3, 4); //3つにする必要がある
  console.log(addNumbers);
}
