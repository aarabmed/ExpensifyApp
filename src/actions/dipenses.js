
import database from '../firebase/firebase';
import uuid from 'uuid';







//ADD_DIPENSE
export const addDipense = (dipense) => ({
    type: 'ADD_DIPENSE',
    dipense
  });

  export const startAddDipense = (dipenseData = {}) => {
    return (dispatch) => {
      const {
        createdAt = 0,
        companyNameInitial='',
        ArticleName=[],
        FornisNames='',
        FornisNumNBS='',
        FornisPHS=[],
        FornisQUS=[],
        FornisMontants=[],
        ClientNames=[],
        ClientPjs=[],
        ClientQjs=[],
        ClientMontants=[],
        Responsable='',
        AccountNumValue='',
        PayModeValue='espece',
        MontantValueLettres='',
        MontantTotal=0,
        RemiseValue='',
        LibValue='',
        ChantierValue='',
        ClientType,
        counter=1,
        CaisseObserv='',
        FornisRowCount=[],
        ClientRowCount=[],
        avatar='',
        isFornisseur=false,
        isClient=false,
        isEmployer=false,
        isActionnaire=false,
        isSubMenu=false,
        isAutre=false,
        uuidF=0,
        uuidC=0,
        maxRows=0,
        benificType='',
        CompanyName='',
        avatarOrText='text',
        payer='',
        cardTitle='Benificitaire'

      } = dipenseData;

      const dipense = { 
        companyNameInitial, 
        createdAt,
        counter,
        ArticleName,
        FornisNames,
        FornisNumNBS,
        FornisPHS,
        FornisQUS,
        FornisMontants,
        ClientNames,
        ClientPjs,
        ClientQjs,
        ClientMontants,
        Responsable,
        AccountNumValue,
        PayModeValue,
        MontantValueLettres,
        MontantTotal,
        RemiseValue,
        LibValue,
        ChantierValue,
        ClientType,
        CaisseObserv,
        ClientRowCount,
        FornisRowCount,
        avatar,
        isClient,
        isEmployer,
        isActionnaire,
        isSubMenu,
        isAutre,
        isFornisseur,
        uuidF,
        uuidC,
        maxRows,
        benificType,
        avatarOrText,
        CompanyName,
        payer,
        cardTitle
      };
  
      return database.ref('dipenses').push(dipense).then((ref) => {
        dispatch(addDipense({
          id: ref.key,
          ...dipense
        }));
      });
    };
  };



// REMOVE_DIPENSE ===============================================
export const removeDipense = ({ id } = {}) => ({
    type: 'REMOVE_DIPENSE',
    id
  });

  export const startRemoveDipense = ({ id } = {}) => {
    return (dispatch) => {
      return database.ref(`dipenses/${id}`).remove().then(() => {
        dispatch(removeDipense({ id }));
      });
    };
  };


  // EDIT_EXPENSE ==================================================
export const editDipense = (id, updates) => ({
    type: 'EDIT_DIPENSE',
    id,
    updates
  });

  export const startEditDipense = (id, updates) => {
    return (dispatch) => {
      return database.ref(`dipenses/${id}`).update(updates).then(() => {
        dispatch(editDipense(id, updates));
      });
    };
  };

  // SET_EXPENSES
export const setDipenses = (dipenses) => ({
  type: 'SET_DIPENSES',
  dipenses
});

export const startSetDipenses = () => {
  return (dispatch) => {
    return database.ref('dipenses').once('value').then((snapshot) => {
      const dipenses = [];

      snapshot.forEach((childSnapshot) => {
        dipenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setDipenses(dipenses));
    });
  };
};