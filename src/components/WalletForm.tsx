import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyActionWallet } from 'redux';

function WalletForm() {
  const dispatch = useDispatch();
  const currencies = useSelector((state: AnyActionWallet) => state.currencies);
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD'); // Valor inicial, pode ser ajustado conforme necessário
  const [method, setMethod] = useState('Dinheiro'); // Valor inicial, pode ser ajustado conforme necessário
  const [tag, setTag] = useState('Alimentação'); // Valor inicial, pode ser ajustado conforme necessário

  useEffect(() => {
    // Fazer a requisição à API no momento da renderização do componente
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://economia.awesomeapi.com.br/json/all');
        const data = await response.json();
        const currenciesArray = Object.keys(data)
          .filter((currency) => currency !== 'USDT');
        dispatch({ type: 'SET_CURRENCIES', payload: currenciesArray });
      } catch (error) {
        console.error('Erro ao obter moedas da API', error);
      }
    };

    fetchCurrencies();
  }, [dispatch]);

  const handleAddExpense = () => {
    // Lógica para adicionar a despesa ao estado global
    const newExpense = {
      id: Date.now(), // ID sequencial
      value,
      description,
      currency: selectedCurrency, // Moeda selecionada
      method,
      tag,
      exchangeRates: currencies[selectedCurrency], // Cotação da moeda selecionada
    };

    dispatch({ type: 'ADD_EXPENSE', payload: newExpense });

    // Limpar os campos após adicionar a despesa
    setValue('');
    setDescription('');
  };

  return (
    <>
      <input
        data-testid="value-input"
        type="text"
        value={ value }
        onChange={ (e) => setValue(e.target.value) }
      />
      <input
        data-testid="description-input"
        type="text"
        value={ description }
        onChange={ (e) => setDescription(e.target.value) }
      />
      <select
        data-testid="currency-input"
        value={ selectedCurrency }
        onChange={ (e) => setSelectedCurrency(e.target.value) }
      >
        {currencies.map((currencyOption: string) => (
          <option key={ currencyOption } value={ currencyOption }>
            {currencyOption}
          </option>
        ))}
      </select>
      <select
        data-testid="method-input"
        value={ method }
        onChange={ (e) => setMethod(e.target.value) }
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
      <select
        data-testid="tag-input"
        value={ tag }
        onChange={ (e) => setTag(e.target.value) }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
      <button onClick={ handleAddExpense } type="button">Adicionar despesa</button>
    </>
  );
}

export default WalletForm;
