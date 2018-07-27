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

const getAllOrderItemsForGivenOrderNumber = (soid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/soitem.json?orderBy="soid"&equalTo="${soid}"`)
      .then(res => {
        const soitems = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            console.error(res.data[fbKey]);
            res.data[fbKey].id = fbKey;
            soitems.push(res.data[fbKey]);
          });
        }
        resolve(soitems);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const deleteOrderItems = (soitemid) => {
  return new Promise((resolve,reject) => {
    axios
      .delete(`${constants.firebaseConfig.databaseURL}/soitem/${soitemid}.json`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default { postOrderItem, getAllOrderItemsForGivenOrderNumber, deleteOrderItems };
