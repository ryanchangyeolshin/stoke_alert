const uuid = require('uuid/v4');
const faker = require('faker');

exports.seed = async (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: uuid(),
          first_name: 'Joseph',
          last_name: 'Woo',
          username: 'CoachWoo',
          password: faker.internet.password(),
          email: 'coach_woo@gmail.com',
          birth_date: faker.date.between('1980-01-01', '2000-12-31'),
          city: 'Los Angeles',
          state: 'CA',
          zipcode: '90007',
          annotation: 'Shure Shure Shure Shure Shure Shure Shure Shure!',
        },
        {
          id: uuid(),
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
          birth_date: faker.date.between('1980-01-01', '2000-12-31'),
          city: faker.address.city(),
          state: faker.address.state(),
          zipcode: faker.address.zipCode(),
          annotation: faker.lorem.sentence(),
        },
      ]);
    });
};
