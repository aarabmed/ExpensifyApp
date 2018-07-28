
import database from '../firebase/firebase';
import uuid from 'uuid';



export const addCommand = (command) => ({
  type: 'ADD_COMMAND',
  command
});
export const startAddCommand = (commandData = {}) => {
  return (dispatch) => {
    const {
      companyName,
      createdAt = 0, 
      articleRowCount,
      fornisseur='',
      ArticleName=[],
      NombreArticle=[],
      PrixUnitaire=[],
      MontantArticle=[],
      MontantTotal=0,
      MontantValueLettres='',
      BondCommandNum=[],
      counter=1,
      PayModeValue,
      AccountNumValue='',
      payer, 
      uuidC=0,
      maxRows,

    } = commandData;

    const command = { 
      fornisseur,
      companyName,
      createdAt, 
      articleRowCount,
      ArticleName,
      NombreArticle,
      PrixUnitaire,
      MontantArticle,
      MontantTotal,
      MontantValueLettres,
      counter,
      PayModeValue,
      AccountNumValue,
      payer, 
      uuidC,
      maxRows,
      BondCommandNum 
      };

    return database.ref('commands').push(command).then((ref) => {
      dispatch(addCommand({
        id: ref.key,
        ...command
      }));
    });
  };
};



// REMOVE_COMMAND ===============================================
export const removeCommand = ({ id } = {}) => ({
  type: 'REMOVE_COMMAND',
  id
});

export const startRemoveCommand = ({ id } = {}) => {
  return (dispatch) => {
    return database.ref(`commands/${id}`).remove().then(() => {
      dispatch(removeCommand({ id }));
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
    return database.ref(`commands/${id}`).update(updates).then(() => {
      dispatch(editCommand(id, updates));
    });
  };
};

// SET_EXPENSES
export const setCommands = (commands) => ({
type: 'SET_COMMANDS',
commands
});

export const startSetCommands = () => {
return (dispatch) => {
  return database.ref('commands').once('value').then((snapshot) => {
    const commands = [];

    snapshot.forEach((childSnapshot) => {
      commands.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });

    dispatch(setCommands(commands));
  });
};
};