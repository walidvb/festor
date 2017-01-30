/* eslint-disable import/prefer-default-export */

import { mapping_festival_FILTER_SECTION, mapping_festival_FILTER_VENUE } from '../constants/mappingFestivalConstants';

export const filterProgramsBySection = (filter) => ({
  type: mapping_festival_FILTER_SECTION,
  filter,
});

export const filterProgramsByVenue = (filter) => ({
  type: mapping_festival_FILTER_VENUE,
  filter,
});
