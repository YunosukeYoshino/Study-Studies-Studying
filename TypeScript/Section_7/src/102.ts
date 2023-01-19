{
  //Generic型のユーティリティ

  interface CourseGoal {
    title: string;
    description: string;
    compleateUntil: Date;
  }

  function createCourseGoal(
    title: string,
    description: string,
    date: Date
  ): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {}; //一時的に別の型に切り替える

    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.compleateUntil = date;
    return courseGoal as CourseGoal; //CourseGoal型ではないのでキャストする必要がある
    // return {
    //     title: title,
    //     description: description,
    //     compleateUntil: date,
    // };
  }

  //読み取り専用 ジェネリクス<string[]>
  // 値を後から追加できないようにできる
  const names: Readonly<string[]> = ["Max", "Anna"];
  //   names.push("Manu"); //エラー
}
