import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation'; //maybe don't need to put '.js' at end
import Logo from './Components/Logo/Logo';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        {/*<ImageLinkForm />
        <FaceRecognition />*/}
      </div>
    );
  }
}
export default App;
