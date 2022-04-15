const dipenseReducerDefaultState = [];
export default (state = dipenseReducerDefaultState, action) => {
    switch (action.type) {
      case 'ADD_DIPENSE':
        return [
          ...state,
          action.dipense
        ];
      case 'REMOVE_DIPENSE':
        return state.filter(({ id }) => id !== action.id);

      case 'EDIT_DIPENSE':
        return state.map((dipense) => {
          if (dipense.id === action.id) {
            return {
              ...dipense,
              ...action.updates
            };
          } else {
            return dipense;
          };
        });
      case 'SET_DIPENSES':
        return action.dipenses;
    default: return state;
  }
}
