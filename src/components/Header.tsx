import React from 'react';
import { useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { selectTotalExpenses } from '../redux/reducers/wallet';

function Header() {
  // Armazenar o estado do Redux
  const userInfo = useSelector((state: AnyAction) => state.user);

  const totalExpenses = useSelector(selectTotalExpenses);

  return (
    <header>
      <h3 data-testid="email-field">{userInfo.email}</h3>
      <h3 data-testid="total-field">{totalExpenses.toFixed(2)}</h3>
      <h3 data-testid="header-currency-field">BRL</h3>
    </header>
  );
}

export default Header;
