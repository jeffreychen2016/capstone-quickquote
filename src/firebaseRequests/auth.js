import firebase from 'firebase';

const registerUser = (user) => {
  return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
};

export default {registerUser};
