var person = {
    name: "yuta",
    age: 30,
    hobbies: ["sports", "cooking"]
};
var favoriteActivitys; //string型の配列
favoriteActivitys = ["news"]; //string型は代入できない
// const person: {
//   name: string;
//   age: number;
// } = {
//   name: "yuta",
//   age: 30,
// };
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}
