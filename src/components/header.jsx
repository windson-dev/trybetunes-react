import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
    };
  }

  componentDidMount = async () => {
    const response = await getUser();
    const { name } = response;
    this.setState({
      user: name,
    });
  }

  componentDidUpdate = () => {
    const { loading } = this.state;
    if (loading) {
      this.setState({ loading: false });
    }
  }

  render() {
    const { user, loading } = this.state;

    return (
      <header data-testid="header-component">
        {!loading ? (
          <p data-testid="header-user-name">
            {user}
          </p>
        ) : <p>Carregando...</p> }

        <Link to="/search" data-testid="link-to-search">Procurar:</Link>

        <Link to="/favorites" data-testid="link-to-favorites">Favoritos:</Link>

        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
