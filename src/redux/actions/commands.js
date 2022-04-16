
import Firebase from '../../firebase/';
import { store } from '../store/configureStore';

const { dispatch} = store
const firebase = new Firebase()
export const addCommand = (command) => ({
  type: 'ADD_COMMAND',
  command
});
export const startAddCommand = async (commande) => {
    return firebase.ref('commands').push(commande).then((ref) => {
      dispatch(addCommand({
        id: ref.key,
        ...commande
      }));
    });
};



// REMOVE_COMMAND ===============================================
export const removeCommande = ({ id } = {}) => ({
  type: 'REMOVE_COMMAND',
  id
});

export const startRemoveCommand = async ({ id }) => {
    return firebase.removeCommande(id).then(() => {
      dispatch(removeCommand({id}));
    });
};



// EDIT_EXPENSE ==================================================
export const editCommand = (id, updates) => ({
  type: 'EDIT_COMMAND',
  id,
  updates
});

export const startEditCommand = async (id, updates) => {
    return firebase.updateCommande(id,updates).then((res) => {
      dispatch(editCommand(res.id, res.commande));
    });
};

// SET_EXPENSES
export const setCommands = (commandes) => ({
type: 'SET_COMMANDS',
commandes
});

export const startSetCommands = firebase.fetchCommandes()
  .then(res=> {
    return dispatch(setCommands(res));
  });
