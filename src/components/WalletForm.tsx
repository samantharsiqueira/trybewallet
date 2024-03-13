import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux'; // Como ajustar a tipagem??
import { fetchCurrencies } from '../redux/actions';

function WalletForm() {
  const dispatch = useDispatch(); // Envia pro estado global
  const currencies = useSelector((state: AnyAction) => state.wallet.currencies); // Seleciona a moeda e guarda em currencies
  const [value, setValue] = useState(''); // Valor inicial do input valor
  const [description, setDescription] = useState(''); // Valor inicial da descrição
  const [selectedCurrency, setSelectedCurrency] = useState('USD'); // Valor inicial da moeda
  const [method, setMethod] = useState('Dinheiro'); // Valor inicial do método de pagamento
  const [tag, setTag] = useState('Alimentação'); // Valor inicial da categoria da despesa
  const [rate, setRate] = useState({}); // Valor inicial da cotação da moeda
  const walletState = useSelector((state: any) => state.wallet); // Valor inciial da wallet

  const getCurrencies = async () => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      console.log(data);
      setRate(data);
      const currenciesArray = Object.keys(data) // Pega as chaves do objeto
        .filter((currency) => currency !== 'USDT'); // Filtra as moedas que não são USDT
      dispatch(fetchCurrencies(currenciesArray)); // Envia as moedas para o estado global
    } catch (error) {
      console.error('Erro ao obter moedas da API', error);
    }
  };

  useEffect(() => {
    // Fazer a requisição à API no momento da renderização do componente
    getCurrencies();
  }, [dispatch]);

  console.log(currencies);

  const handleAddExpense = () => {
    // Fazer a requisição à API no momento do clique do botão
    getCurrencies();
    // Lógica para adicionar a despesa ao estado global
    let id = 0;
    if (walletState.expenses.length > 0) {
      id = walletState.expenses[walletState.expenses.length - 1].id + 1;
    }
    const newExpense = {
      id, // ID sequencial loop de +1
      value,
      description,
      currency: selectedCurrency, // Moeda selecionada
      method,
      tag,
      exchangeRates: rate, // Cotação da moeda selecionada
    };

    dispatch({ type: 'ADD_EXPENSE', payload: newExpense });

    // Limpar os campos após adicionar a despesa
    setValue('');
    setDescription('');
  };

  return (
    <>
      {/* Valor */}
      <input
        data-testid="value-input"
        type="text"
        value={ value }
        onChange={ (e) => setValue(e.target.value) } // Atualiza o estado com o valor do input
      />
      {/* Descrição */}
      <input
        data-testid="description-input"
        type="text"
        value={ description }
        onChange={ (e) => setDescription(e.target.value) } // Atualiza o estado com o valor da descrição
      />
      {/* Moeda */}
      <select
        data-testid="currency-input"
        value={ selectedCurrency }
        onChange={ (e) => setSelectedCurrency(e.target.value) }
      >
        {currencies?.map((currencyOption: string) => (
          <option key={ currencyOption } value={ currencyOption }>
            {currencyOption}
          </option>
        ))}
      </select>
      {/* Método de pagamento */}
      <select
        data-testid="method-input"
        value={ method }
        onChange={ (e) => setMethod(e.target.value) } // Atualiza o estado com o valor do método de pagamento
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
      {/* Categoria de despesa */}
      <select
        data-testid="tag-input"
        value={ tag } // Valor que estamos selecionando no momento
        onChange={ (e) => setTag(e.target.value) } // Atualiza o estado com o valor da categoria de despesa
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
