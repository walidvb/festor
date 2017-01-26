import { combineReducers } from 'redux';
import { mapping_festival_NAME_UPDATE } from '../constants/mappingFestivalConstants';

const programs = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const sections = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const days = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const mappingFestivalReducer = combineReducers({ programs, sections, days });

export default mappingFestivalReducer;
