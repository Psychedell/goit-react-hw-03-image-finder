import { ImageGallaryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { GallaryUl } from './ImageGallery.styled';

export default class ImageGallery extends Component {
  render() {
    return (
      <GallaryUl>
        {this.props.resultList.map(({ id, webformatURL, tags }) => {
          return (
            <ImageGallaryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
              onImageClick={this.props.onImageClick}
            />
          );
        })}
      </GallaryUl>
    );
  }
}
