import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGallaryItem = ({ webformatURL, tags, onImageClick }) => {
  return (
    <GalleryItem>
      <GalleryItemImage src={webformatURL} alt={tags} onClick={onImageClick} />
    </GalleryItem>
  );
};
