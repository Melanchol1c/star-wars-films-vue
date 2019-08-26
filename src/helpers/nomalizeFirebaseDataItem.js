import inflection from 'inflection';

/**
 * Method for processing specific firebase data objects.
 *
 * @param {object} dataItem Firebase data object.
 * @param {string} index Item id.
 * @returns {object} Return processed data object.
 */
const nomalizeFirebaseDataItem = (dataItem, index) => {
  const filmData = dataItem.fields;

  const film = {};
  Object.keys(filmData).map(key => {
    film['id'] = index.toString();
    film[inflection.camelize(key, true)] = filmData[key];
  });

  return film;
};

export default nomalizeFirebaseDataItem;
