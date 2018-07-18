import axios from 'axios';
import constants from '../constants';

const getRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/company.json?orderBy="isSupplier"&equalTo=1`)
      .then(res => {
        const supplierProfile = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            supplierProfile.push(res.data[fbKey]);
          });
        }
        resolve(supplierProfile);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {getRequest};
