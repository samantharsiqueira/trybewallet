// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCH_CURRENCIES, ADD_EXPENSE } from '../actions';
import { ExpenseType, InitialStateType } from '../../types';

export type ActionWallet = {
  type: string;
  payload: {
    email: string;
    currencies: string[];
    expenses: ExpenseType[];
    id: number;
    idToEdit: number
  }
};

const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function WalletReducer(state = INITIAL_STATE_WALLET, action: ActionWallet) {
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
        expenses: state.expenses
          .filter((expense) => expense !== action.payload.id),
      };

    default:
      return state;
  }
}

// Novo seletor para calcular a soma total das despesas
// Ajustar a tipagem correta
export const selectTotalExpenses = (state: InitialStateType) => {
  return state.wallet.expenses.reduce((acc, cur) => {
    const sum = Number(cur.value) * Number(cur.exchangeRates[cur.currency]?.ask || 0);
    return acc + sum;
  }, 0);
};

export default WalletReducer;
