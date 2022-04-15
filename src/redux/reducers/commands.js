const commandReducerDefaultState = [];
export default (state = commandReducerDefaultState, action) => {
    switch (action.type) {
      case 'ADD_COMMAND':
        return [
          ...state,
          action.command
        ];
      case 'REMOVE_COMMAND':
        return state.filter(({ id }) => id !== action.id);

      case 'EDIT_COMMAND':
        return state.map((command) => {
          if (command.id === action.id) {
            return {
              ...command,
              ...action.updates
            };
          } else {
            return command;
          };
        });
      case 'SET_COMMANDS':
        return action.commandes;
    default: return state;
  }
}
