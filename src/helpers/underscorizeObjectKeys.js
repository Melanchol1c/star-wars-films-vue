import inflection from 'inflection';

/**
 * Transform object's keys in snake case.
 *
 * @param {object} object Object data.
 */
const underscorizeObjectKeys = object => {
  const transformedData = {};

  Object.keys(object).map(key => (transformedData[inflection.underscore(key)] = object[key]));

  return transformedData;
};

export default underscorizeObjectKeys;
