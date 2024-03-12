// Coloque aqui suas actions
import { AnyAction } from 'redux';
import { UserType } from '../../types';

export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';

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

export const addExpense = (newExpense: AnyAction) => {
  return {
    type: ADD_EXPENSE,
    payload: newExpense,
  };
};
