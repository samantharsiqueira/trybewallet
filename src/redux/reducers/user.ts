// Esse reducer será responsável por tratar as informações da pessoa usuária

import { ActionType } from '../../types';

const INITIAL_STATE_USER = {
  email: '',
  senha: '',
};

function user(state = INITIAL_STATE_USER, action: ActionType) {
  switch (action.type) {
    case 'LOGIN_USER': // nome da action
      return { ...state, email: action.payload.email };
    default:
      return state;
  }
}

export default user;
