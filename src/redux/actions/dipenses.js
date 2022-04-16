
import Firebase from '../../firebase/';
import { store } from '../store/configureStore';

const {dispatch} = store


const firebase = new Firebase()

//ADD_DIPENSE
export const addDipense = (dipense) => ({
    type: 'ADD_DIPENSE',
    dipense
  });

  export const startAddDipense = (dipense) => {
    return async () => {
      const res = await firebase.createExpense(dipense);
      dispatch(addDipense(res));
    };
  };



// REMOVE_DIPENSE ===============================================
export const removeDipense = ({ id } = {}) => ({
    type: 'REMOVE_DIPENSE',
    id
  });

  export const startRemoveDipense = ({ id }) => {
      return firebase.removeExpense(id).the(() => {
        dispatch(removeDipense({ id }));
      });
  };


  // EDIT_EXPENSE ==================================================
export const editDipense = (id, updates) => ({
    type: 'EDIT_DIPENSE',
    id,
    updates
  });

  export const  startEditDipense = async (id, updates) => {
      return firebase.updateExpense(id,updates).then((res) => {
        dispatch(editDipense(res.id, res.dipense));
      });
  };

  // SET_EXPENSES
export const setDipenses = (dipenses) => ({
  type: 'SET_DIPENSES',
  dipenses
});

export const startSetDipenses = firebase.fetchExpenses().then(
    res=>{
      dispatch(setDipenses(res));
    }
)