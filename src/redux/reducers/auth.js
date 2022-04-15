
const userReducerDefaultState = {
  user:null
}

export default (state = userReducerDefaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.user
      };
    case 'LOGOUT':
      return {
        ...userReducerDefaultState
      };
    default:
      return state;
  }
};
