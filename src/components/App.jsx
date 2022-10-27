import { Component } from 'react';
import { WrapperApp } from './App.styled';
import SearchBar from './Searchbar/Searchbar';
import { Toaster } from 'react-hot-toast';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    imageName: '',
  };

  componentDidMount() {}

  componentDidUpdate() {}

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <WrapperApp></WrapperApp>
        <ImageGallery searchName={this.state.imageName} />
        <Toaster
          toastOptions={{
            duration: 2500,
            style: {
              background: '#fff',
              color: '#3f51b5',
              marginTop: 30,
              marginRight: 50,
            },
          }}
          position="top-right"
        />
      </>
    );
  }
}
