const conn = require('../helpers/config');
const bcrypt = require('bcrypt')

let success = false;

async function valid(data) {
  const result = await conn.select('*').from('sm_users')
    .where('username', data.username)
    .where('email', data.email)

  if (result.length <= 0) {
    success = true;
  }

  return success;
}

module.exports = {
  save: async (data) => {
    let validate = await valid(data);
    let password = data.password;

    bcrypt.hash(data.password, 10, function(err, hash) {
      password = hash;
    });

    if(validate){
      const result = await conn.insert({
        username: data.username,
        email: data.email,
        password: password,
        firstname: data.firstname,
        lastname: data.lastname,
        sex: data.sex,
      }).into('sm_users')
    }

  },
}
