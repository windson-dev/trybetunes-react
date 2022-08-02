import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from './musicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      artistName: '',
      albumName: '',
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const GET_API = await getMusics(id);
    const index = 0;

    this.setState({
      songs: GET_API,
      artistName: GET_API[index].artistName,
      albumName: GET_API[index].collectionName,
    });
  }

  render() {
    const { songs, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">

        <p data-testid="artist-name">{artistName}</p>
        <p data-testid="album-name">{albumName}</p>

        {songs.map((element, index) => index !== 0 && (
          <MusicCard
            key={ index }
            previewUrl={ element.previewUrl }
            trackName={ element.trackName }
            trackId={ element.trackId }
          />
        ))}

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
