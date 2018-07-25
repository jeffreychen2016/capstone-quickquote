import constants from '../constants';
import axios from 'axios';

const postOrderItem = (newOrderItem) => {
  return new Promise((resolve,reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/soitem.json`,newOrderItem)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default { postOrderItem };
