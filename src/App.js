import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation'; //maybe don't need to put '.js' at end
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js'; 
import './App.css';



//change these to style particles
const particlesOptions = {
      particles: {
          number: {
              value: 100,
              density: {
                enable: true,
                value_area: 700
              }
          },
          "line_linked": {
              "enable": true,
              "opacity": 0.15
          },
          "move": {
              "direction": "down",
              "speed": 2
          },
          size: {
              value: 2
          },
          "opacity": {
              "anim": {
                  "enable": true,
                  "speed": 1,
                  "opacity_min": 0.05
              }
          }
      },
      interactivity: {
          events: {
              onhover: {
                  enable: true,
                  mode: "repulse"
              }
          }
      }
  } 

const initialState = {
      input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }

class App extends Component {
  constructor() {
    super()
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (responseData) => {
    // {    //clarifaiFace gives us an object that looks like this
    //   top_row: 0, 
    //   left_col: 0.04952106,
    //   bottom_row: 0.98981357,
    //   right_col: 0.9523591
    // } const clarifaiFace = responseData.outputs[0].data.regions[0].region_info.bounding_box;
    
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const regions = responseData.outputs[0].data.regions;
    
    let results = [];
    for (let i = 0; i < regions.length; i++) {
      let boxValues = regions[i].region_info.bounding_box;

      results.push(
        {
          id: "face" + i,
          leftCol: boxValues.left_col * width,
          topRow: boxValues.top_row * height,
          rightCol: width - (boxValues.right_col * width),
          bottomRow: height - (boxValues.bottom_row * height)
        }
      );
    }
    return results
  }

  displayFaceBox = (boxes) => {
    console.log(boxes);
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://vast-dawn-81006.herokuapp.com/image-score', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.state.input //this.state.image wouldn't have worked...see setState() docs
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://vast-dawn-81006.herokuapp.com:3000/image-score', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(updatedEntries => {
              this.setState(Object.assign(this.state.user, {entries: updatedEntries}))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response)) //the values in this response are percentages
      }) 
      .catch(err => console.log(err));
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      console.log('enter press here! ')
    }
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    // const {isSignedIn, imageUrl, route, box } = this.state; //use destructuring to clean up code
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} rank={this.state.user.entries}/>
              <ImageLinkForm
                inputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
                handleKeyPress={this.handleKeyPress}
              />
              <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl}/>
            </div>
          : (
              this.state.route === 'signin'
              ?  <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              :  <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
     </div>
    );
  }
}

export default App;
