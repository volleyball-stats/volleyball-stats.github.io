import moment from 'moment';
import { ASC_ORD } from './constants';


export const naturalOrderSort = (a = '', b = '', order) => {
  const strA = typeof a === 'string' ? a : a.toString();
  const strB = typeof b === 'string' ? b : b.toString();

  return order === ASC_ORD ?
    strA.localeCompare(strB, undefined, { numeric: true, sensitivity: 'base' }) :
    strB.localeCompare(strA, undefined, { numeric: true, sensitivity: 'base' });
};

export const getMonthDateRange = month => ({
  label: moment(month).format('MMMM YYYY'),
  start: moment(month).startOf('month'),
  end: moment(month).endOf('month')
});
