import React from 'react';

export const FirebaseContext = React.createContext();

export const WithFirebase = Component => props => (
  <FirebaseContext.Provider>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Provider>
);

export default FirebaseContext;