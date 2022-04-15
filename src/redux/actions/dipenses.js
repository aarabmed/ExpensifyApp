
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
      /* const {
        createdAt,
        companyNameInitial,
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
        counter,
        CaisseObserv,
        FornisRowCount,
        ClientRowCount,
        avatar,
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
        payor='',
        cardTitle='Benificitaire'

      } = dipenseData;
 */
     /*  const dipense = { 
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
        payor,
        cardTitle
      }; */
  
      const res = await firebase.createExpense(dipense);
      dispatch(addDipense(res));
    };
  };



// REMOVE_DIPENSE ===============================================
export const removeDipense = ({ id } = {}) => ({
    type: 'REMOVE_DIPENSE',
    id
  });

  export const startRemoveDipense = ({ id } = {}) => {
    return () => {
      return firebase.removeExpense(id).the(() => {
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

  export const  startEditDipense = async (id, updates) => {
    console.log('RESS-EDIT:',updates, '----id',id)
      return await firebase.updateExpense(id,updates).then((res) => {
        dispatch(editDipense(res.id, res.dipense));
      });
  };

  // SET_EXPENSES
export const setDipenses = (dipenses) => ({
  type: 'SET_DIPENSES',
  dipenses
});

export const startSetDipenses = () => {
  return () => {
    return firebase.fetchExpenses().then(res=>{
      dispatch(setDipenses(res));
    })
  };
};