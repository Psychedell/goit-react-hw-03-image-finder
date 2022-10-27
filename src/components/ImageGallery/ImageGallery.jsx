import { ImageGallaryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import MyLoader from 'components/Loader/Loader';
import fetchImages from 'services/api';
import toast from 'react-hot-toast';

export default class ImageGallery extends Component {
  state = {
    resultList: [],
    page: 1,
    loading: false,
    isVisible: false,
  };

  componentDidMount() {
    this.setState({ resultList: [] });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchName;
    const nextName = this.props.searchName;

    if (prevName !== nextName) {
      this.setState({ loading: true, resultList: [], page: 1 });

      // fetchImages(nextName, this.state.page)
      //   .then(images => this.setState({ resultList: images }))
      //   .finally(() => this.setState({ loading: false }));
      fetchImages(nextName, this.state.page)
        .then(data => {
          const { totalHits, hits } = data;
          if (!hits.length) {
            return toast.error(
              'There is no images found with this search request'
            );
          }

          console.log(data);

          this.setState({ resultList: hits });
        })
        .finally(() => this.setState({ loading: false }));
    }

    if (prevState.page !== this.state.page) {
      // this.setState({ loading: true });
      fetchImages(nextName, this.state.page).then(data => {
        const { hits } = data;
        this.setState({
          resultList: [...this.state.resultList, ...hits],
        });
      });
      // .finally(() => this.setState({ loading: false }));
    }
  }

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { loading } = this.state;
    const { searchName } = this.props;

    const imgArr = this.state.resultList;
    return (
      <>
        <ul className="gallery">
          {loading && <MyLoader />}
          {!searchName && <p>No results yet.</p>}
          {/* largeImageURL */}
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
        {this.state.isVisible && (
          <button type="button" onClick={this.loadMore}>
            {' '}
            Load More
          </button>
        )}
      </>
    );
  }
}
