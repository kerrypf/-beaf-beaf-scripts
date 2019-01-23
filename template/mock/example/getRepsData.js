const faker = require("faker");
const users = require("./getUserData");
const Languages = ["javascript", "java", "c#", "c++", "prolog", "nodejs"];

const getRandomUser = () =>
  users[
    Math.min(
      Math.max(0, Math.round(Math.random() * users.length)),
      users.length - 1
    )
  ];

const schema = function() {
  let name = faker.lorem.words();
  return {
    id: faker.random.uuid(),
    name: name,
    full_name: name,
    private: faker.random.boolean(),
    html_url: faker.internet.url(),
    description: faker.lorem.sentence(),
    fork: faker.random.boolean(),
    url: faker.internet.url(),
    created_at: faker.date.past(),
    updated_at: faker.date.past(),
    homepage: faker.internet.url(),
    size: faker.random.number(),
    language: Languages[faker.random.number() % 6],
    has_issues: faker.random.boolean(),
    forks_count: faker.random.number(),
    watchers: faker.random.number(),
    stargazers_count: faker.random.number(),
    creator: getRandomUser()
  };
};
let result = [];

for (let i = 0; i <= 500; i++) {
  result.push(schema());
}

module.exports = result;
