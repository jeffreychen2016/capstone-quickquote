import constants from '../constants';
import axios from 'axios';

const postOrder = (newOrder) => {
  return new Promise((resolve,reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/so.json`,newOrder)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {postOrder};
