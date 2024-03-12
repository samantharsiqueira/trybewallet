// Tipagem dos estados e das funções que vou precisar usar nos componentes

export type UserType = {
  email: string,
  senha: string,
};

export type WalletType = {
  email: string,
  currencies: string,
  expenses: string,
  id: number,
};

// Criar um tipo para cada action
export type ActionType = {
  type: string,
  payload: UserType,
};

export type ActionTypeWallet = {
  type: string,
  payload: WalletType,
};

type ExchangeRateType = {
  ask: string;
  name: string;
};

export type ExpenseType = {
  id: number;
  value: string;
  description: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRates: Record<string, ExchangeRateType>;
};

export type InitialStateType = {
  user: {
    email: string;
  };
  wallet: {
    currencies: string[];
    expenses: ExpenseType[];
    editor: boolean;
    idToEdit: number;
  };
};
