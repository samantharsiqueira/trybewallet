// Arquivo de teste
import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import * as actions from '../redux/actions/index';

// Elementos do formulario
const passwordInput = 'password-input'; // deu erro com outra senha
const emailInput = 'teste@teste.com';

// Testes para a pagina de login
describe('Login componest is working correctly', () => {
  // Mock da API pro teste
  vi.spyOn(global, 'fetch').mockResolvedValue({ json: async () => mockData } as Response);

  // Testar se os campos do usuario começam vazios
  test('Input starting as empty spaces', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByTestId(emailInput)).toHaveValue('');
    expect(screen.getByTestId(passwordInput)).toHaveValue('');
  });

  // Botao comeca desabilitado
  test('"Entrar" button is disabled', () => {
    renderWithRouterAndRedux(<App />);
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });

  test('Form is working properly', async () => {
    // Acessar
    renderWithRouterAndRedux(<App />);
    const login = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    // Agir
    await userEvent.type(login, emailInput);
    await userEvent.type(password, passwordInput);
    // Aferir
    expect(loginButton).toBeDisabled();

    await userEvent.type(login, emailInput);
    await userEvent.type(password, passwordInput);

    expect(loginButton).toBeEnabled();
  });

  test('If store is working and navegating properly', async () => {
    // Renderiza a store
    const { store } = renderWithRouterAndRedux(<App />);

    expect(store.getState().user.email).toBe('');
    const button = screen.getByRole('button', { name: /entrar/i });
    const login = screen.getByRole('text');
    const password = screen.getByTestId(passwordInput);

    await userEvent.type(login, emailInput);
    await userEvent.type(password, passwordInput);

    await userEvent.click(button);

    expect(store.getState().user.email).toBe(emailInput);
  });
});

describe('Wallet form tests', () => {
  const tags = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
    'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

  // Mock das informacoes pra fazer o teste
  const userInitialState = {
    user: { email: 'teste@teste.com' },
  };

  const info = {
    value: '90',
    description: 'comida',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  const infoUpdate = {
    value: '15',
    description: 'cinema',
    currency: 'BRL',
    method: 'Cartão de débito',
    tag: 'Lazer',
  };

  const expenses = [
    'sorvete',
    'Lazer',
    'Cartão de crédito',
    '10.00',
    'Dólar Canadense/Real Brasileiro',
    '3.76',
    '37.56',
    'Real',
    'EditarExcluir',
  ];

  const expensesEdit = [
    'pizza',
    'Lazer',
    'Cartão de crédito',
    '50.00',
    'Dólar Americano/Real Brasileiro',
    '5.15',
    '257.50',
    'Real',
    'EditarExcluir',
  ];

  vi.spyOn(global, 'fetch').mockResolvedValue({ json: async () => mockData } as Response);

  test('Expenses form is fill out correctly and renders the information', async () => {
    vi.spyOn(actions, 'requestSuccessful');
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    expect(fetch).toBeCalledTimes(3);
    const despesa = screen.getByLabelText(/Despesa/i);
    const descrição = screen.getByLabelText('Descrição');
    const selects = screen.getAllByRole('combobox');
    const button = screen.getByRole('button', { name: /adicionar despesas/i });

    await userEvent.type(despesa, info.value);
    await userEvent.type(descrição, info.description);
    await userEvent.selectOptions(selects[0], info.currency);
    await userEvent.selectOptions(selects[1], info.method);
    await userEvent.selectOptions(selects[2], info.tag);

    await userEvent.click(button);

    const cells = screen.getAllByRole('cell').map((tag) => tag.textContent);
    expect(cells).toEqual(expenses);

    expect(store.getState().wallet.expenses).toHaveLength(1);

    const btnEdit = screen.getByRole('button', { name: /editar/i });

    expect(screen.getByRole('button', { name: /excluir/i })).toBeInTheDocument();
    expect(btnEdit).toBeInTheDocument();

    await userEvent.click(btnEdit);

    expect(screen.getByRole('button', { name: /editar despesas/i })).toBeInTheDocument();
    await userEvent.clear(despesa);
    await userEvent.clear(descrição);
    await userEvent.type(despesa, infoUpdate.value);
    await userEvent.type(descrição, infoUpdate.description);
    await userEvent.selectOptions(selects[0], infoUpdate.currency);
    await userEvent.selectOptions(selects[1], infoUpdate.method);
    await userEvent.selectOptions(selects[2], infoUpdate.tag);

    await userEvent.click(screen.getByRole('button', { name: /editar despesas/i }));

    const editCells = screen.getAllByRole('cell').map((tag) => tag.textContent);
    expect(editCells).toEqual(expensesEdit);

    expect(store.getState().wallet.expenses).toHaveLength(1);

    const btnDeletee = screen.getByRole('button', { name: /excluir/i });
    await userEvent.click(btnDeletee);
  });
});
