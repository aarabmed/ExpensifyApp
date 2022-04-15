import app from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const config = {
  apiKey: process.env.apiKey,//your api Key,
  authDomain: process.env.authDomain,//your authDomain,
  databaseURL: process.env.databaseURL,//your database url
  projectId: process.env.projectId,// your project id
  storageBucket: process.env.storageBucket,// past here your storage bucket
  messagingSenderId: process.env.messagingSenderId// your messaging Sender Id
};


class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  fetchExpenses =()=> this.db.ref('dipenses').once('value').then((snapshot) => {
        const dipenses = [];
        snapshot.forEach((childSnapshot) => {
          dipenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });

        });
    return dipenses
  })



  createExpense =(data)=> this.db.ref('dipenses').push(data).then((ref) => {
      return {id:ref.key,dipense:data}
    /* this.db.ref(`documentsSize`).child('counter').transaction(() => {
    }); */
  });

  removeExpense =(id)=> this.db.ref(`dipenses/${id}`).remove().then(() => {
    return {id:id}
  /* this.db.ref(`documentsSize`).child('counter').transaction(() => {
  }); */
  });

  updateExpense =(id, updates)=> this.db.ref(`dipenses/${id}`).update(updates).then(() => {
      return {id:id,dipense:updates}
  });



  fetchCommandes =()=> this.db.ref('commands').once('value').then((snapshot) => {
    const commands = [];
    snapshot.forEach((childSnapshot) => {
      commands.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    return commands
  });

  fetchUser =(id)=> this.db.ref(`users`).child(id).once('value').then((snapshot) => {
    return snapshot.val()
  })
    
  createCommande =(data)=> this.db.ref('commandes').push(data).then((ref) => {
    return {id:ref.key,command:data}
  
  });

  removeCommande =(id)=> this.db.ref(`commandes/${id}`).remove().then(() => {
    return {id:id}
  
  });

  updateCommande =(id, updates)=> this.db.ref(`commandes/${id}`).update(updates).then(() => {
    return {id:id,commande:updates}
  });
   

  doCreateUserWithEmailAndPassword = (email, password) =>this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>this.auth.signInWithEmailAndPassword(email, password);
  
  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>this.auth.currentUser.updatePassword(password);
}


//const database = firebase.database();
//const auth = firebase.auth();
//export { auth,firebase, database as default };
export default Firebase;