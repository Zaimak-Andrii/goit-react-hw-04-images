import Button from 'components/Button';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Message from 'components/Message';
import { useState, useEffect } from 'react';
import { getSarchedImages } from 'services/pixabayAPI';
import css from './ImageGallery.module.css';
import { ImageGalleryPropTypes } from './ImageGallery.types';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function ImageGallery({
  searchQuery,
  page,
  list,
  onChangePage,
  onChangeGalleryList,
}) {
  const [isShowLoadMoreButton, setIsShowLoadMoreButton] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery.length === 0) return;

    const fetchSearch = async () => {
      try {
        setStatus(Status.PENDING);
        setError(null);
        setIsShowLoadMoreButton(false);

        const data = await getSarchedImages(searchQuery, page);

        onChangeGalleryList(prev => [...prev, ...data.hits]);
        setIsShowLoadMoreButton(page * data.per_page < data.totalHits);
        setStatus(Status.RESOLVED);
      } catch (err) {
        setError(err.message);
        setStatus(Status.REJECTED);
      }
    };

    fetchSearch();
  }, [searchQuery, page, onChangeGalleryList]);

  if (status === Status.IDLE) {
    return <Message title="Please enter search parameters" />;
  }

  if (status === Status.REJECTED) {
    return <Message title={error} />;
  }

  return (
    <>
      {list.length === 0 && status !== Status.PENDING ? (
        <Message title={`Nothing was found for "${searchQuery}".`} />
      ) : (
        <ul className={css.imageGallery}>
          {list.map(item => (
            <ImageGalleryItem key={item.id} item={item} />
          ))}
        </ul>
      )}

      {status === Status.PENDING && <Loader />}

      {isShowLoadMoreButton && (
        <Button
          onClick={() => {
            onChangePage(prev => prev + 1);
          }}
        >
          Load more
        </Button>
      )}
    </>
  );
}

ImageGallery.propTypes = ImageGalleryPropTypes;
