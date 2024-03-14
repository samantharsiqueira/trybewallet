// Coloque aqui suas actions
import { AnyAction } from 'redux';
import { UserType, ExpenseType } from '../../types';

export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

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

export const deleteExpense = (id: number) => {
  return { type: DELETE_EXPENSE, payload: { id } };
};

export const requestSuccessful = (data: ExpenseType) => {
  return { type: 'successful', payload: { expenses: data } };
};
