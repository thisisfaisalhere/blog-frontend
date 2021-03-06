import { IUser } from "../../helpers/interfaces";
import { UserActionTypes } from "./user.types";

const INITIAL_STATE: {
  currentUser: IUser | null;
} = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
