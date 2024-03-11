import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserType } from '../types';
import { loginUser } from '../redux/actions';

function Login() {
  // Estados para os campos do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Logica de validação dos campos do formulário

  const isEmailValid = (inputEmail: string) => {
    const regExEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValidation = regExEmail.test(String(inputEmail).toLowerCase());
    return emailValidation;
  };

  const isPasswordValid = (inputPassword: string) => {
    const passwordValidation = inputPassword.length >= 6;
    return passwordValidation;
  };

  // Lógica de manipulação da mudança nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  useEffect(() => {
    setBtnDisabled(!(isEmailValid(email) && isPasswordValid(password)));
  }, [email, password]);

  // eslint-disable-next-line react/jsx-indent
  return (

  // Lógica de manipulação do clique no botão e navegação
    <form
      onSubmit={ (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, senha: password } as UserType));
        navigate('/carteira');
      } }
    >
      <input
        data-testid="email-input"
        type="text"
        onChange={ handleChange }
        value={ email }
        name="email"
      />
      ;

      <input
        data-testid="password-input"
        type="password"
        onChange={ handleChange }
        value={ password }
        name="password"
      />
      ;

      <button type="submit" disabled={ btnDisabled }>
        Entrar
      </button>
    </form>
  );
}

export default Login;
