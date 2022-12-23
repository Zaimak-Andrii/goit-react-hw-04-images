import css from './ImageGalleryItem.module.css';
import { ImageGalleryPropTypes } from '../ImageGallery/ImageGallery.types';

export default function ImageGalleryItem({ item }) {
  const { webformatURL, largeImageURL, tags } = item;

  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = ImageGalleryPropTypes;
