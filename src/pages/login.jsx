import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      loading: false,
    };
  }

  disabledButton = ({ target }) => {
    this.setState({
      inputName: target.value,
    });
  }

  redirectToSearch = async (event) => {
    event.preventDefault();
    const { inputName } = this.state;
    const { history } = this.props;

    this.setState({
      loading: true,
    });

    await createUser({ name: inputName });

    this.setState({
      loading: false,
    });

    history.push('/search');
  }

  render() {
    const { inputName, loading } = this.state;
    const three = 3;
    const enabled = inputName.length < three;
    if (loading) return <p>Carregando...</p>;

    return (
      <div data-testid="page-login">
        <form action="">

          <input
            type="text"
            data-testid="login-name-input"
            name="login"
            onChange={ this.disabledButton }
            value={ inputName }
          />

          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ enabled }
            onClick={ this.redirectToSearch }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Login;
