import { ImageGallaryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import MyLoader from 'components/Loader/Loader';
import fetchImages from 'services/api';

export default class ImageGallery extends Component {
  state = {
    resultList: [],
    page: 1,
    loading: false,
  };

  componentDidMount() {
    this.setState({ resultList: [] });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchName;
    const nextName = this.props.searchName;

    if (prevName !== nextName) {
      this.setState({ loading: true, resultList: [] });

      fetchImages(nextName, this.state.page)
        .then(images => this.setState({ resultList: images }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { loading } = this.state;
    const { searchName } = this.props;

    const imgArr = this.state.resultList;
    return (
      <ul className="gallery">
        {loading && <MyLoader />}

        {!searchName && <p>No results yet.</p>}

        {imgArr.map(({ id, webformatURL, tags }) => {
          return (
            <ImageGallaryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
            />
          );
        })}
      </ul>
    );
  }
}
