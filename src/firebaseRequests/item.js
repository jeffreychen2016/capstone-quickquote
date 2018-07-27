import constants from '../constants';
import axios from 'axios';

const postItem = (newItem) => {
  return new Promise((resolve,reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/item.json`,newItem)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// becuase of item/${itemid}.json returns objct key (stuffs inside of -jdhfsfdlsjfxh)
// if still doing:
//  Object.keys(res.data).forEach(fbKey => {
//   res.data[fbKey].id = fbKey;
//   orders.push(res.data[fbKey]);
//  });
// it will try to pull id on "code", which will then throw error
const getAllItemsBasedOnItemId = (itemid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/item/${itemid}.json`)
      .then(res => {
        const items = [];
        if (res.data !== null) {
          res.data.id = itemid;
          items.push(res.data);
        }
        resolve(items);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const deleteItems = (itemid) => {
  return new Promise((resolve,reject) => {
    axios
      .delete(`${constants.firebaseConfig.databaseURL}/item/${itemid}.json`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {postItem, getAllItemsBasedOnItemId,deleteItems};
