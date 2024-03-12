import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouter, renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const LOGIN_ROUTE = '/';
const WALLET_ROUTE = '/carteira';

