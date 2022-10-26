// import { ImageGallaryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import fetchImages from 'services/api';

export default class ImageGallery extends Component {
  state = {
    resultList: [],
    page: 1,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchName;
    const nextName = this.props.searchName;

    if (prevName !== nextName) {
      fetchImages(nextName, this.state.page).then(images =>
        this.setState({ resultList: images })
      );
    }
  }

  render() {
    const imgArr = this.state.resultList;
    return (
      <ul className="gallery">
        {imgArr.map(img => {
          return (
            <li className="gallery-item" key={img.id}>
              <img src={img.webformatURL} alt="" />
            </li>
          );
        })}
      </ul>
    );
  }
}
