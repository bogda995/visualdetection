import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import "./App.css";
import ParticlesBg from "particles-bg";
import axios from "./api"; // Import the axios instance
import { ThreeDots } from "react-loader-spinner";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {}, // Initialize the box state
      isLoading: false,
    };
  }

  calculateFaceLocation = (data) => {
    const faceData = data.faces[0]; // Make sure this matches the response structure
    if (faceData) {
      const { top_row, left_col, bottom_row, right_col } = faceData;
      const image = document.getElementById('inputimage');

      // Check if the image element exists
      if (image) {
        const width = Number(image.width);
        const height = Number(image.height);
        return {
          leftCol: left_col * width,
          topRow: top_row * height,
          rightCol: width - (right_col * width),
          bottomRow: height - (bottom_row * height),
        };
      } else {
        console.warn("Image element not found.");
        return {};
      }
    } else {
      console.warn("No face detected in the image.");
      toast.warn("No face detected in the image. Please try another photo.", {
        position: "top-right",
        autoClose: 5000,
      });
      return {};
    }
  };

  displayFaceBox = (box) => {
    this.setState({ box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    const imageUrl = this.state.input;
    if (!imageUrl) {
      toast.warn("Please provide a valid image URL.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    this.setState({ imageUrl, isLoading: true }); // Set isLoading to true

    axios
      .post("/detect/", { image_url: imageUrl })
      .then((response) => {
        console.log("API Response:", response.data);
        this.setState({ isLoading: false }); // Set isLoading to false
        if (response.data.error) {
          console.error("Error:", response.data.error);
          toast.warn(response.data.error, {
            position: "top-right",
            autoClose: 5000,
          });
        } else if (response.data.faces && response.data.faces.length === 0) {
          toast.warn("No face detected in the image.", {
            position: "top-right",
            autoClose: 5000,
          });
        } else {
          this.setState({ box: response.data.faces[0] });
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false }); // Set isLoading to false
        toast.error("Error detecting face.", {
          position: "top-center",
          autoClose: 3000,
        });
        console.error("Error:", error);
      });
  };

  onImageLoad = () => {
    // Calculate and display face box once the image is loaded
    this.displayFaceBox(this.calculateFaceLocation({ faces: [this.state.box] }));
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
        {this.state.isLoading ? (
          <ThreeDots color="#00BFFF" height={80} width={80} />
        ) : (
          <FaceRecognition
            box={this.state.box}
            imageUrl={this.state.imageUrl}
            onImageLoad={this.onImageLoad} // Pass onImageLoad to FaceRecognition component
          />
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
