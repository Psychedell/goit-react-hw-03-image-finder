import { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import { Searchbar } from './Searchbar.styled';
import toast from 'react-hot-toast';

export default class SearchBar extends Component {
  state = {
    imageName: '',
  };

  handleNameChange = evt => {
    this.setState({ imageName: evt.currentTarget.value.toLowerCase().trim() });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.imageName.trim() === '') {
      return toast.error('Please, enter your search request.');
    }

    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <Searchbar>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <FcSearch style={{ marginRight: 5 }} />
            <span>Search</span>
          </button>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.imageName}
            onChange={this.handleNameChange}
            placeholder="Search images and photos"
          />
        </form>
      </Searchbar>
    );
  }
}
