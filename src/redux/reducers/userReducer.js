const INITIAL_STATE = {
  user: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  // case value:
  //   return();
  default:
    return ({ ...state });
  }
};

export default userReducer;
