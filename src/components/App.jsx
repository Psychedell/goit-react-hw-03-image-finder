import { Component } from 'react';
import { WrapperApp } from './App.styled';
import SearchBar from './Searchbar/Searchbar';
import toast, { Toaster } from 'react-hot-toast';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchImages from 'services/api';
import Modal from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import MyLoader from 'components/Loader/Loader';
// import MyLoader from './Loader/Loader';

export class App extends Component {
  state = {
    imageName: '',
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

  // Проверить почему не работает...
  // componentDidUpdate(_, prevState) {
  //   const { imageName, page, resultList } = this.state;

  //   if (prevState.imageName !== imageName || prevState.page !== page) {
  //     this.setState({ loading: true, resultList: [], page: 1 });

  //     fetchImages(imageName, page)
  //       .then(data => {
  //         const { totalHits, hits } = data;

  //         if (!hits.length) {
  //           return toast.error(
  //             'There is no images found with this search request'
  //           );
  //         }

  //         this.setState({
  //           resultList: [...resultList, ...hits],
  //           totalPages: Math.ceil(totalHits / 12),
  //           isVisible: totalHits / 12 > page,
  //         });
  //       })
  //       .catch(error => this.setState({ error }))
  //       .finally(() => this.setState({ loading: false }));
  //   }
  // }

  componentDidUpdate(_, prevState) {
    const { imageName, page, resultList } = this.state;

    if (prevState.imageName !== imageName) {
      this.setState({ loading: true, resultList: [], page: 1 });

      fetchImages(imageName, page)
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

    if (prevState.page !== page) {
      fetchImages(imageName, page).then(data => {
        const { hits } = data;
        this.setState({
          resultList: [...resultList, ...hits],
        });
      });
    }
  }

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

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
      imageName,
      loading,
      isVisible,
      page,
      totalPages,
      resultList,
      showModal,
      modalImage,
    } = this.state;

    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {loading && <MyLoader />}
        {!imageName && <p>No results yet.</p>}
        <WrapperApp>
          <ImageGallery
            resultList={resultList}
            onImageClick={this.onImageClick}
          />
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
        </WrapperApp>
        {isVisible && totalPages > page && (
          <Button onLoadMore={this.loadMore} />
        )}
        {showModal && (
          <Modal modalImage={modalImage} closeModal={this.toggleModal} />
        )}
      </>
    );
  }
}
