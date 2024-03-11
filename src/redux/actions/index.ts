// Coloque aqui suas actions
import { UserType } from '../../types';

export const loginUser = (User: UserType) => {
  return {
    type: 'LOGIN_USER',
    payload: User,
  };
};
