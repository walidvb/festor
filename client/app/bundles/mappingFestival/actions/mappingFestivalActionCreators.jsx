/* eslint-disable import/prefer-default-export */

import { mapping_festival_FILTER_TYPE } from '../constants/mappingFestivalConstants';

export const filterPrograms = (filter, filterType) => ({
  type: mapping_festival_FILTER_TYPE,
  filter,
  filterType,
});
