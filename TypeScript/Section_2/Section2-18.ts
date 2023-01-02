const person: {
  name: string;
  age: number;
  hobbies: string[];
  roll: [number, string];
} = {
  name: "yuta",
  age: 30,
  hobbies: ["sports", "cooking"],
  roll: [2, "author"],
};

person.roll.push("admin");
person.roll[1] = 10;

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
