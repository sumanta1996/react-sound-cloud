import React, { Component } from 'react';
import './App.css';
import Layout from './containers/Layout/Layout';
import MusicView from './containers/MusicView/MusicView';

class App extends Component {
  render() {
    return (
      <Layout>
          <MusicView />
      </Layout>
    );
  }
}

export default App;
