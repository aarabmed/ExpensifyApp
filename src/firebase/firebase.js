import * as firebase from 'firebase';

const config = {
  apiKey: "",//your api Key,
  authDomain: "",//your authDomain,
  databaseURL: "",//your database url
  projectId: "",// your project id
  storageBucket: "",// past here your storage bucket
  messagingSenderId: ""// your messaging Sender Id
};

firebase.initializeApp(config);

const database = firebase.database();
const auth = firebase.auth();
export { auth,firebase, database as default };
