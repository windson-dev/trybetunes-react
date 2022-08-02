import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputAlbums: '',
      artistName: '',
      loading: true,
      fullAlbum: [],
    };
  }

  disabledButton = ({ target }) => {
    this.setState({
      inputAlbums: target.value,
    });
  }

  componentDidUpdate = () => {
    const { loading } = this.state;
    if (loading) {
      this.setState({ loading: false });
    }
  }

  filterAlbums = async () => {
    const { inputAlbums } = this.state;
    const GET_API = await searchAlbumsAPI(inputAlbums);
    this.setState((element) => ({
      artistName: `Resultado de álbuns de: ${element.inputAlbums}`,
      inputAlbums: '',
      fullAlbum: GET_API,
    }));
  }

  render() {
    const { inputAlbums, fullAlbum, artistName } = this.state;
    const two = 2;
    const enabled = inputAlbums.length < two;

    return (
      <div data-testid="page-search">
        <form action="">
          <input
            type="text"
            id="artist-input"
            data-testid="search-artist-input"
            value={ inputAlbums }
            onChange={ this.disabledButton }
          />

          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ enabled }
            onClick={ this.filterAlbums }
          >
            Pesquisar
          </button>
        </form>
        {fullAlbum.length === 0
          ? <p>Nenhum álbum foi encontrado</p> : fullAlbum.map((element) => (
            <div key={ element.artistId }>
              { element.artistName }
              { element.collectionName }
              <img src={ element.artworkUrl100 } alt="Capa do album" />
              <Link
                to={ `/album/${element.collectionId}` }
                data-testid={ `link-to-album-${element.collectionId}` }
              >
                Album
              </Link>
            </div>
          ))}
        {artistName}
      </div>
    );
  }
}

export default Search;
