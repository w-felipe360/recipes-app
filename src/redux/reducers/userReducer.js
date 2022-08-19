const INITIAL_STATE = {
  user: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'EMAIL-DATA':
    return {
      email: action.payload,
    };
  default:
    return ({ ...state });
  }
};

export default userReducer;
