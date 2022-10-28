import { ImageGallaryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import MyLoader from 'components/Loader/Loader';
import fetchImages from 'services/api';
import toast from 'react-hot-toast';
import Modal from 'components/Modal/Modal';
import { GallaryUl } from './ImageGallery.styled';
import { Button } from 'components/Button/Button';

export default class ImageGallery extends Component {
  state = {
    resultList: [],
    page: 1,
    totalPages: 0,
    loading: false,
    isVisible: false,
    showModal: false,
    modalImage: '',
    error: 'error',
  };

  componentDidMount() {
    this.setState({ resultList: [] });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchName;
    const nextName = this.props.searchName;

    if (prevName !== nextName) {
      this.setState({ loading: true, resultList: [], page: 1 });

      fetchImages(nextName, this.state.page)
        .then(data => {
          const { totalHits, hits } = data;

          if (!hits.length) {
            return toast.error(
              'There is no images found with this search request'
            );
          }

          this.setState({
            resultList: hits,
            totalPages: Math.ceil(totalHits / 12),
            isVisible: totalHits / 12 > this.state.page,
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }

    if (prevState.page !== this.state.page) {
      fetchImages(nextName, this.state.page).then(data => {
        const { hits } = data;
        this.setState({
          resultList: [...this.state.resultList, ...hits],
        });
      });
    }
  }

  onImageClick = event => {
    const openImage = this.state.resultList.find(
      image => image.webformatURL === event.currentTarget.src
    ).largeImageURL;

    this.setState({
      modalImage: openImage,
      showModal: true,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const {
      loading,
      isVisible,
      page,
      totalPages,
      resultList,
      showModal,
      modalImage,
    } = this.state;
    const { searchName } = this.props;

    const imgArray = resultList;
    return (
      <>
        <GallaryUl>
          {loading && <MyLoader />}
          {!searchName && <p>No results yet.</p>}

          {imgArray.map(({ id, webformatURL, tags }) => {
            return (
              <ImageGallaryItem
                key={id}
                webformatURL={webformatURL}
                tags={tags}
                onImageClick={this.onImageClick}
              />
            );
          })}
        </GallaryUl>

        {isVisible && totalPages > page && <Button onClick={this.loadMore} />}
        {showModal && (
          <Modal modalImage={modalImage} closeModal={this.toggleModal} />
        )}
      </>
    );
  }
}
