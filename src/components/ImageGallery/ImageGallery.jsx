import { useInfiniteQuery } from '@tanstack/react-query';
import Button from 'components/Button';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Message from 'components/Message';
import { getSearchedImages } from 'services/pixabayAPI';
import css from './ImageGallery.module.css';
import { ImageGalleryPropTypes } from './ImageGallery.types';

export default function ImageGallery({ searchQuery }) {
  const {
    isFetching,
    isError,
    fetchStatus,
    data: list,
    error,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['search-image', searchQuery],
    queryFn: ({ pageParam = 1 }) => getSearchedImages(searchQuery, pageParam),
    enabled: searchQuery.length > 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (_lastPage, pages) => {
      const firstPage = pages[0];
      if (pages.length < Math.ceil(firstPage.totalHits / firstPage.per_page)) {
        return pages.length + 1;
      }
    },
    select: data =>
      data.pages.reduce((acc, page) => [...acc, ...page.hits], []),
  });

  if (isError) {
    return <Message title={error.message} />;
  }

  if (!list && fetchStatus === 'idle') {
    return <Message title="Please enter search parameters" />;
  }

  return (
    <>
      {list?.length === 0 && !isFetching ? (
        <Message title={`Nothing was found for "${searchQuery}".`} />
      ) : (
        <ul className={css.imageGallery}>
          {list?.map(item => (
            <ImageGalleryItem key={item.id} item={item} />
          ))}
        </ul>
      )}

      {isFetching && <Loader />}
      {hasNextPage && <Button onClick={fetchNextPage}>Load more</Button>}
    </>
  );
}

ImageGallery.propTypes = ImageGalleryPropTypes;
