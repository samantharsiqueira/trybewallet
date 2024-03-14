import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../types';
import { deleteExpense } from '../redux/actions/index';

function Table() {
  const expenses = useSelector((state: StoreType) => state.wallet.expenses);
  const dispatch = useDispatch();

  const handleChange = (id:number) => {
    dispatch(deleteExpense(id));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => {
          const
            { id, description, tag, method, value, currency, exchangeRates } = expense;
          const valor = parseFloat(value);
          const rate = parseFloat(exchangeRates[currency].ask);
          const exchangeRate = valor * rate;
          return (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{parseFloat(value).toFixed(2)}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{rate.toFixed(2)}</td>
              <td>{exchangeRate.toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button>Editar</button>
                <button
                  onClick={ () => handleChange(id) }
                  data-testid="delete-btn"
                >
                  Excluir
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
