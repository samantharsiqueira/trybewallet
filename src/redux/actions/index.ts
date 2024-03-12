// Coloque aqui suas actions
import { UserType } from '../../types';

export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';

export const loginUser = (User: UserType) => {
  return {
    type: 'LOGIN_USER',
    payload: User,
  };
};

export const fetchCurrencies = (currencies: string[]) => {
  return {
    type: FETCH_CURRENCIES,
    payload: currencies,
  };
};
