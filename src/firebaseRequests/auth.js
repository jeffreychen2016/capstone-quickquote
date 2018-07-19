import firebase from 'firebase';

const registerUser = (user) => {
  return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
};

const loginUser = (user) => {
  return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
};

const logoutUser = () => {
  return firebase.auth().signOut();
};

const getUserId = () => {
  return firebase.auth().currentUser.uid;
};

export default {registerUser,loginUser,logoutUser,getUserId};
