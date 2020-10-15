import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import SongList from './components/SongList';
import AddSong from './components/AddSong';
import SongDetail from './components/SongDetail';
import { BrowserRouter, Route } from 'react-router-dom';

const client = new ApolloClient({
  uri: '/graphql'
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <BrowserRouter>
          <Route exact path="/" component={SongList} />
          <Route exact path="/songs/new" component={AddSong} />
          <Route exact path="/songs/:songId" component={SongDetail} />
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
