/* eslint-disable import/prefer-default-export */

import { mapping_festival_NAME_UPDATE } from '../constants/mappingFestivalConstants';

export const updateName = (text) => ({
  type: mapping_festival_NAME_UPDATE,
  text,
});
