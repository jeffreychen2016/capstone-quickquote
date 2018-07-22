import constants from '../constants';
import axios from 'axios';

const getProductsRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/product.json`)
      .then(res => {
        const products = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            products.push(res.data[fbKey]);
          });
        }
        resolve(products);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {getProductsRequest};
