/* eslint-disable import/prefer-default-export */

import { mapping_festival_FILTER_SECTION } from '../constants/mappingFestivalConstants';

export const filterProgramsBySection = (filter) => ({
  type: mapping_festival_FILTER_SECTION,
  filter,
});
