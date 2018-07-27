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

const getAllItemsBasedOnItemId = (itemid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/item/${itemid}.json`)
      .then(res => {
        const items = [];
        if (res.data !== null) {
          console.error(res.data);
          Object.keys(res.data).forEach(fbKey => {
            console.error(res.data[fbKey]);
            res.data[fbKey].id = fbKey;
            items.push(res.data[fbKey]);
          });
        }
        resolve(items);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {postItem, getAllItemsBasedOnItemId};
