import constants from '../constants';
import axios from 'axios';

const postShipTo = (shipToAddress) => {
  return new Promise((resolve,reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/shipto.json`,shipToAddress)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {postShipTo};
