import moment from 'moment';

/** Vue template filter to work with date. */
const dateFilter = (value, format = 'DD.MM.YYYY') => {
  if (value) return moment(String(value)).format(format);
};

export default dateFilter;
