import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import "./App.css";
import ParticlesBg from "particles-bg";
import axios from 'axios';

// Initialize Clarifai with your API key directly
// const app = new Clarifai.App({
//   apiKey: '3e4143161d0a4063827b2e0ba96f9b06',
//   apiEndpoint: 'https://api.clarifai.com'
// });

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}, // Initialize the box state
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
  }

  displayFaceBox = (box) => {
    this.setState({ box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    axios.post(
      'https://api.clarifai.com/v2/models/face-detection/outputs',
      {
        inputs: [
          {
            data: {
              image: {
                url: this.state.input
              }
            }
          }
        ]
      },
      {
        headers: {
          Authorization: `Key 3e4143161d0a4063827b2e0ba96f9b06`,
          'Content-Type': 'application/json'
        }
      }
    )
    .then(response => {
      if (response.data) {
        this.displayFaceBox(this.calculateFaceLocation(response.data));
      }
    })
    .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <ParticlesBg num={10} type="circle" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
