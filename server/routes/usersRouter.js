const { Router } = require('express');
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');

const { findUserById, addNewUser } = require('../queries/users');
const { checkForDuplicateNameAndEmail } = require('../utils/validations');

const usersRouter = knex => {
  const users = knex('users');
  const router = new Router();

  return router
    .get('/:id', async ({ params: { id } }, res, next) => {
      try {
        const user = await findUserById(users, id);
        if (user) {
          return res.status(200).jsonp({ user });
        }
        return res.status(404).jsonp({ message: 'User record not found!' });
      }
      catch(error) {
        return res.status(500).jsonp({ error });
      }
    })
    .post('/', checkForDuplicateNameAndEmail(users), async ({ body }, res, next) => {
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(body.password, saltRounds);
      const newUser = {
        id: uuid(),
        first_name: body.first_name,
        last_name: body.last_name,
        username: body.username,
        email: body.email,
        password: hashedPassword,
        birth_date: body.birth_date,
        city: body.city,
        state: body.state,
        zipcode: body.zipcode,
        annotation: body.annotation,
      };

      try {
        await addNewUser(users, newUser);
        return res.status(200).jsonp({ message: `${newUser.username} has been successfully added as a new user!` });
      }
      catch (error) {
        return res.status(500).jsonp(error);
      }
    });
};

module.exports = usersRouter;