import { useState } from 'react';
import ImageGallery from 'components/ImageGallery';
import Searchbar from 'components/Searchbar';
import css from './App.module.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [galleryList, setGalleryList] = useState([]);

  const searchHandler = value => {
    setGalleryList([]);
    setPage(1);
    setSearchQuery(value);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={searchHandler} />
      <ImageGallery
        searchQuery={searchQuery}
        onChangePage={setPage}
        list={galleryList}
        onChangeGalleryList={setGalleryList}
        page={page}
      />
    </div>
  );
}
