import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyC5QvbByZN8t4IVQ-IXjVmyOj-EeGY_Yss',
  authDomain: 'collections-project.firebaseapp.com',
  databaseURL: 'https://collections-project.firebaseio.com',
  projectId: 'collections-project',
  storageBucket: 'collections-project.appspot.com',
  messagingSenderId: '373637645274',
  appId: '1:373637645274:web:92dad7ecff550b5b8cf6e3',
  measurementId: 'G-VBTXQCKR78',
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const githubAuthProvider = new firebase.auth.GithubAuthProvider();
