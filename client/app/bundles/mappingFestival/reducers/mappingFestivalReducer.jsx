import { combineReducers } from 'redux';
import { mapping_festival_NAME_UPDATE } from '../constants/mappingFestivalConstants';

const program = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const mappingFestivalReducer = combineReducers({ program });

export default mappingFestivalReducer;
