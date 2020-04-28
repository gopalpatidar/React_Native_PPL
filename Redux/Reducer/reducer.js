import { ADD_ITEM, P_HOME } from '../Action/action';

const Istate = {
  Category: "All",
  profile:'home'
};

export const reducer = (state = Istate, action) => {
  switch (action.type) {
    case ADD_ITEM:
      let newState = {
        ...state,
        Category: action.data
      };
      return newState;
    case P_HOME:
      let profileH = {
        ...state,
        profile: action.data
      };
      return profileH;
    default:
      return state;
  }
};
