import { fetch, nomalizeFirebaseDataItem } from '@/helpers';

/**
 * Get film's characters ids and find it data in peoples db table.
 *
 * @param {string} id Film id.
 */
export const fetchFilmCharacters = async id => {
  // Get all peoples data.
  const characters = await fetch('people');

  // Get film's data.
  const filmData = await fetch('films', id.toString());

  // Get characters ids from film's data
  const filmCharactersIds = filmData.fields.characters;

  // Process firebase data to normal.
  const normalizedCharactersData = characters.map((character, index) =>
    nomalizeFirebaseDataItem(character, index),
  );

  // Return result characters data of selected film.
  return filmCharactersIds
    .map(id => normalizedCharactersData.filter(character => character.id === id.toString())[0])
    .filter(character => character); // Check it to not be empty.
};

/**
 * Get character's data from backend.
 *
 * @param {string} id Character's id.
 */
export const fetchCharacterById = async id => {
  const data = await fetch('people', id);

  // Process firebase data to normal.
  const normalizedData = nomalizeFirebaseDataItem(data, id);
  return normalizedData;
};
