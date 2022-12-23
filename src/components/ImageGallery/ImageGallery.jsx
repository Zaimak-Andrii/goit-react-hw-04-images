import ImageGalleryItem from 'components/ImageGalleryItem';
import { Component } from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryPropTypes } from './ImageGallery.types';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component {
  state = {
    list: [],
    status: Status.IDLE,
    error: null,
  };
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    console.log('Rerender ', prevProps.searchQuery, this.props.searchQuery);
  }

  render() {
    const { status, error, list } = this.state;
    if (status === Status.IDLE) {
      return (
        <h2 className={css.imageMessage}>Please enter search parameters</h2>
      );
    }

    if (status === Status.PENDING) {
      return <h2 className={css.imageMessage}>Loading...</h2>;
    }

    if (status === Status.REJECTED) {
      return <h2 className={css.imageMessage}>{error?.message}</h2>;
    }

    return (
      <ul className={css.imageGallery}>
        {list.map(item => (
          <ImageGalleryItem key={item.id} item={item} />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = ImageGalleryPropTypes;
