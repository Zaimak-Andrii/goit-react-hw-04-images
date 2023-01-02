import PropTypes from 'prop-types';

export const ImageGalleryPropTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  list: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeGalleryList: PropTypes.func.isRequired,
};
