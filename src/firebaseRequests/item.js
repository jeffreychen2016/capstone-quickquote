import constants from '../constants';
import axios from 'axios';

const postOrderItem = (newOrderItem) => {
  return new Promise((resolve,reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/item.json`,newOrderItem)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getAllOrderItemsBasedOnItemId = (itemid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/item/${itemid}.json`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {postOrderItem, getAllOrderItemsBasedOnItemId};
