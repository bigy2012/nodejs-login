const conn = require('../helpers/config');
const bcrypt = require('bcrypt')


async function valid(data) {
  let success = false;
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
    try {
      let validate = await valid(data);

      if (validate) {
        bcrypt.hash(data.password, 10, async function (err, hash) {
          await conn('sm_users').insert({
            username: data.username,
            email: data.email,
            password: hash,
            firstname: data.firstname,
            lastname: data.lastname,
            sex: data.sex,
            cash: 0
          });
        });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error)
      return false;
    }
  },

  login: async (data) => {
    let success = false;

    const result = await conn.select('*').from('sm_users')
    .where('email', data.email)
    
    const compare = await bcrypt.compare(data.password, result[0].password)
    if (compare) {
      success = true;
    }
    return {
      success: success,
      data: result
    };
  }


}
