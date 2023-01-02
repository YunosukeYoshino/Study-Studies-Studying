const person = {
  name: "yuta",
  age: 30,
  hobbies: ["sports", "cooking"],
};

let favoriteActivitys: string[]; //string型の配列
favoriteActivitys = ["news"]; //配列なら代入できる

// const person: {
//   name: string;
//   age: number;
// } = {
//   name: "yuta",
//   age: 30,
// };
for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}
