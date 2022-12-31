import { useState } from 'react';
import ImageGallery from 'components/ImageGallery';
import Searchbar from 'components/Searchbar';
import css from './App.module.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const searchHandler = value => {
    setSearchQuery(value);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={searchHandler} />
      <ImageGallery searchQuery={searchQuery} />
    </div>
  );
}
