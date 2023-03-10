import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checkBox: false,
    };
  }

  checkBoxInput = async () => {
    const { trackId } = this.props;

    this.setState({
      loading: true,
      checkBox: true,
    });

    await addSong(trackId);

    this.setState({
      loading: false,
    });
  }

  componentDidMount = () => {
    const { checkFavoriteSongs, trackId } = this.props;
    const favoriteSongValue = checkFavoriteSongs.find((element) => (
      element.trackId === trackId
    ));
    this.setState({
      checkBox: favoriteSongValue,
    });
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { loading, checkBox } = this.state;

    if (loading) return <p>Carregando...</p>;

    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          {`O seu navegador não suporta o elemento${trackName}`}
          {' '}
          <code>audio</code>
        </audio>

        <label htmlFor="favorite">
          Favoritar Musica
          <input
            name="favorite"
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checkBox }
            onChange={ this.checkBoxInput }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  checkFavoriteSongs: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
