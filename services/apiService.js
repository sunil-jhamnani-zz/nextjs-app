import { userData } from "../_data";

export const postRequest = (url, opts) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // authenticate
      if (url.endsWith('/user/login')) {
        // get parameters from post request
        let params = JSON.parse(opts.body);

        let findUser = userData.filter(user => {
          return user.email === params.email && user.password === params.password;
        })

        if (findUser.length) {
          // if login details are valid return user details and fake jwt token
          let user = findUser[0];
          let responseJson = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            token: 'fake-jwt-token'
          };
          resolve({ ok: true, data: responseJson});
        } else {
          // else return error
          reject('Username or password is incorrect');
        }
      }

      if (url.endsWith('/user/register')) {
        let newUser = JSON.parse(opts.body);
        let duplicateUser = userData.filter(user => {
          return newUser.email === user.email
        });

        if (duplicateUser.length) {
          reject('Email ' + newUser.email + ' already taken');
          return;
        }

        newUser.id = userData.length ? Math.max(...userData.map(user => user.id)) + 1 : 1;

        userData.push(newUser); // I know it wont make any change but just writing to mock it.

        // respond 200 OK
        resolve({ ok: true });
      }
    }, 500)
  })
};