// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { AnyAction } from 'redux';
import { ActionTypeWallet } from '../../types';
import { FETCH_CURRENCIES, ADD_EXPENSE } from '../actions';

const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
  editor: false,
  idtoEdit: 0,
};

function WalletReducer(state = INITIAL_STATE_WALLET, action: ActionTypeWallet) {
  switch (action.type) {
    case FETCH_CURRENCIES: // nome da action
      console.log(action.payload);
      return { ...state, currencies: action.payload };

    case ADD_EXPENSE:
      console.log(action.payload);
      return { ...state, expenses: [...state.expenses, action.payload] };

    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense !== action.payload.id),
      };

    default:
      return state;
  }
}

// Novo seletor para calcular a soma total das despesas
// Ajustar a tipagem correta
export const selectTotalExpenses = (state: AnyAction) => {
  return state.wallet.expenses.reduce((prev:string, cur: AnyAction) => {
    const sum = Number(cur.value) * Number(cur.exchangeRates[cur.currency]?.ask || 0);
    return prev + sum;
  }, 0);
};

export default WalletReducer;
