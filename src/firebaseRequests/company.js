import constants from '../constants';
import axios from 'axios';

const getCurrentUserCompanyInfo = (companyId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/company.json?orderBy="id"&equalTo=${companyId}`)
      .then(res => {
        const companies = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            companies.push(res.data[fbKey]);
          });
        }
        resolve(companies);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {getCurrentUserCompanyInfo};
