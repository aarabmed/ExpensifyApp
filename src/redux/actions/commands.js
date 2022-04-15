
import Firebase from '../../firebase/';


const firebase = new Firebase()
export const addCommand = (command) => ({
  type: 'ADD_COMMAND',
  command
});
export const startAddCommand = (commande) => {
  return (dispatch) => {
    /* const {
      companyName,
      createdAt = 0, 
      articleRowCount,
      ArticleName=[],
      NombreArticle=[],
      PrixUnitaire=[],
      MontantArticle=[],
      MontantTotal=0,
      MontantValueLettres='',
      PayModeValue,
      AccountNumValue='',
      payor, 
      uuidC=0,
      maxRows,

    } = commandData;

    const command = { 
      companyName,
      createdAt, 
      articleRowCount,
      ArticleName,
      NombreArticle,
      PrixUnitaire,
      MontantArticle,
      MontantTotal,
      MontantValueLettres,
      PayModeValue,
      AccountNumValue,
      payor, 
      uuidC,
      maxRows,
      };
 */
    return database.ref('commands').push(commande).then((ref) => {
      dispatch(addCommand({
        id: ref.key,
        ...commande
      }));
    });
  };
};



// REMOVE_COMMAND ===============================================
export const removeCommande = ({ id } = {}) => ({
  type: 'REMOVE_COMMAND',
  id
});

export const startRemoveCommand = ({ id } = {}) => {
  return (dispatch) => {
    return firebase.removeCommande(id).then(() => {
      dispatch(removeCommand({id}));
    });
  };
};


// EDIT_EXPENSE ==================================================
export const editCommand = (id, updates) => ({
  type: 'EDIT_COMMAND',
  id,
  updates
});

export const startEditCommand = (id, updates) => {
  return (dispatch) => {
    return firebase.updateCommande(id,updates).then((res) => {
      dispatch(editCommand(res.id, res.commande));
    });
  };
};

// SET_EXPENSES
export const setCommands = (commandes) => ({
type: 'SET_COMMANDS',
commandes
});

export const startSetCommands = () => {
return (dispatch) => {
  return firebase.fetchCommandes().then(res=> {
    dispatch(setCommands(res));
  });
};
};