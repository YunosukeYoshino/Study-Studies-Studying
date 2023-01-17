{
  //分割代入
  const hobbies = ["Sports", "Cooking", "Game", "Movie"];

  const [hobbies1, hobbies2, ...remainingHobbies] = hobbies; //hobbies1=hobbies[0] hobbies2=hobbies[1]と同義
  //hobbies1=[0]  hobbies2=[1]  remainingHobbies=[2] [3] [4] [5]....
  console.log(hobbies1, hobbies2, remainingHobbies);

  //オブジェクト
  const footBallPlayer = {
    name: "kesuke Honda",
    sports: "football",
    age: 35,
    height: 187,
  };

  const { name: userName, sports, age, height } = footBallPlayer;
  //オブジェクトの分割代入の定数は取り出したプロパティ名でないといけない セミコロンを使うことで新しく定数を定義できる。
  console.log(userName, sports, age, height);
}
