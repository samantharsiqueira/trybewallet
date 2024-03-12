// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ActionTypeWallet } from '../../types';
import { FETCH_CURRENCIES } from '../actions';

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

    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload.expenses] };
      console.log(action.payload);

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
export const selectTotalExpenses = (state) => {
  return state.wallet.expenses.reduce((prev, cur) => {
    const sum = Number(cur.value) * Number(cur.exchangeRates[cur.currency]?.ask || 0);
    return prev + sum;
  }, 0);
};

export default WalletReducer;
