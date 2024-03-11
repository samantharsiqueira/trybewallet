import React from 'react';
import { useSelector } from 'react-redux';

function Header() {
  // Armazenar o estado do Redux
  const userInfo = useSelector((state: any) => state.user);

  return (
    <header>
      <h3 data-testid="email-field">{userInfo.email}</h3>
      <h3 data-testid="total-field">0</h3>
      <h3 data-testid="header-currency-field">BRL</h3>
    </header>
  );
}

export default Header;
