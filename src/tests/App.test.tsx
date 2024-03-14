// Arquivo de teste
import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

// Elementos do formulario
const passwordInput = 'password-input'; // deu erro com outra senha
const emailInput = 'email-input';
const ValidationEmail = 'teste@teste.com';

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
  });

  test('If store is working and navegating properly', async () => {
    // Renderiza a store
    const { store } = renderWithRouterAndRedux(<App />);

    expect(store.getState().user.email).toBe('');
    const button = screen.getByRole('button', { name: /entrar/i });
    const login = screen.getByTestId('email-input');
    const password = screen.getByTestId(passwordInput);

    await userEvent.type(login, ValidationEmail);
    await userEvent.type(password, passwordInput);

    await userEvent.click(button);

    expect(store.getState().user.email).toBe(ValidationEmail);
  });
});
