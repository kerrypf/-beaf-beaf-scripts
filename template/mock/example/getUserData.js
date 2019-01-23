const faker = require('faker');

const schema = function() {
  return {
    id: faker.random.uuid(),
    username: faker.internet.userName(),
    avatar: faker.internet.avatar(),
    email: faker.internet.email(),
    updated_at: faker.date.past()
  }
};
let result = [];

for ( let i=0 ; i<= 100; i++){
  result.push(schema());
}

module.exports = result;


