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

let favorite: any[]; //配列のany型
favorite = ["news", "test"]; //配列のany型であればなんでも入れることができる。

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}
