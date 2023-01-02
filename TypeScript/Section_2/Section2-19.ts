// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person = {
  name: "yuta",
  age: 30,
  hobbies: ["sports", "cooking"],
  roll: Role.ADMIN,
};

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}

if (person.roll === Role.ADMIN) {
  console.log("管理者ユーザー");
}
