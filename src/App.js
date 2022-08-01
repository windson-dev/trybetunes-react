import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/login';
import Search from './pages/search';
import Album from './pages/album';
import Favorites from './pages/favorites';
import Profile from './pages/profile';
import ProfileEdit from './pages/profileEdit';
import NotFound from './pages/notFound';
import Header from './components/header';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p>TrybeTunes </p>
        <Route exact path="/search" component={ Search } />
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route exact path="/*" component={ NotFound } />
        <Route exact path="/" component={ Login } />
      </div>
    );
  }
}

export default App;
