import constants from '../constants';
import axios from 'axios';

const getUserInfoRequest = (uid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/user.json?orderBy="uid"&equalTo="${uid}"`)
      .then(res => {
        const users = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            users.push(res.data[fbKey]);
          });
        }
        resolve(users);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {getUserInfoRequest};
