// Tipagem dos estados e das funções que vou precisar usar nos componentes

export type UserType = {
  email: string,
  senha: string,
};

export type WalletType = {
  email: string,
};

// Criar um tipo para cada action
export type ActionType = {
  type: string,
  payload: UserType,
};

export type ActionTypeWallter = {
  type: string,
  payload: WalletType,
};
