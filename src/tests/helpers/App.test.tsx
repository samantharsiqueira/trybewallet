/* eslint-disable import/no-unresolved */
import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { renderWithRouter, renderWithRouterAndRedux } from './renderWith';
import mockData from './mockData';
import store from '../redux/reducers/index';

describe('App component', () => {
  test('renders Login component when accessing "/"', () => {
    renderWithRouter(<App />, { route: '/' });

    const loginElement = screen.getByText(/Login/i);
    expect(loginElement).toBeInTheDocument();
  });

  test('renders Carteira component when accessing "/carteira"', () => {
    renderWithRouter(<App />, { route: '/carteira' });

    const loginElement = screen.getByText(/Carteira/i);
    expect(loginElement).toBeInTheDocument();
  });
});

describe('Login page works properly', () => {
  vi.spyOn(global, 'fetch').mockResolvedValue({ json: async () => mockData } as Response);

  const passwordInput = 'sem-senha';
  const validLoginInput = '123@123.com';

  test('Input start empty', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByTestId(passwordInput)).toHaveValue('');
  });

  test('Disabled login button', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test('Login from is working properly', async () => {
    renderWithRouterAndRedux(<App />);

    const login = screen.getByRole('textbox');
    const password = screen.getByTestId(passwordInput);
    const button = screen.getByRole('button', { name: /entrar/i });

    await userEvent.type(login, '123@13');
    await userEvent.type(password, 'sem-senha');

    expect(button).toBeDisabled();

    await userEvent.clear(login);
    await userEvent.clear(password);

    await userEvent.type(login, validLoginInput);
    await userEvent.type(password, 'sem-senha');

    expect(button).toBeEnabled();
  });

  test('If the store stores the data correctly and is redirected correctly to Route "/carteira"', async () => {
    renderWithRouterAndRedux(<App />, { store });

    expect(store.getState().user.email).toBe('');

    const button = screen.getByRole('button', { name: /entrar/i });
    const login = screen.getByRole('textbox');
    const password = screen.getByTestId(passwordInput);

    await userEvent.type(login, validLoginInput);
    await userEvent.type(password, 'senha');

    await userEvent.click(button);

    expect(store.getState().user.email).toBe(validLoginInput);

    expect(screen.getByRole('heading', { name: 'Wallet' })).toBeInTheDocument();
  });
});
