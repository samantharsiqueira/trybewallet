import React from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from '../types';

function Header() {
  // const [expenses, setExpenses] = useState(0);

  // Armazenar o estado do Redux
  const userInfo = useSelector((state: StoreType) => state.user);
  const walletInfo = useSelector((state: StoreType) => state.wallet);
  let expenses = 0;
  if (walletInfo.expenses.length > 0) {
    expenses = walletInfo.expenses.reduce((acc, cur) => {
      const { value, exchangeRates, currency } = cur;
      const { ask } = exchangeRates[currency];
      // const sum = Number(cur.value) * Number(cur.exchangeRates[cur.currency]?.ask || 0);
      return acc + (Number(value) * Number(ask));
    }, 0);
    // setExpenses(selectTotalExpenses);
    // console.log(selectTotalExpenses);
  }

  return (
    <header>
      <h3 data-testid="email-field">{userInfo.email}</h3>
      <h3 data-testid="total-field">{expenses.toFixed(2)}</h3>
      <h3 data-testid="header-currency-field">BRL</h3>
    </header>
  );
}

export default Header;
