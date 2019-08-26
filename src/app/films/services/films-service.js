import { fetch, nomalizeFirebaseDataItem } from '@/helpers';

/** Fetch all films method. */
const fetchAllFilms = async () => {
  const data = await fetch('films');

  // Process firebase data to normal.
  const normalizedData = data.map((film, index) => nomalizeFirebaseDataItem(film, index));
  return normalizedData;
};

/**
 * Fetch data about single film by id.
 *
 * @param {string} id Film id.
 */
const fetchFilmById = async id => {
  const data = await fetch('films', id);

  // Process firebase data to normal.
  const normalizedData = nomalizeFirebaseDataItem(data, id);
  return normalizedData;
};

export { fetchAllFilms, fetchFilmById };
