import { combineReducers } from 'redux';
import { mapping_festival_FILTER_TYPE } from '../constants/mappingFestivalConstants';

const programs = (state = [], action) => {

  switch (action.type) {
    case mapping_festival_FILTER_TYPE:
      return filteredProgramsBy(action.filterType, action.filter);
    default:
      return state;
  }

  function filteredProgramsBy(filterType, filter){
    if(filterType == 'section'){
      const programs = state;
      return programs.map((program) => {
        program.displayed = program.sections.find((s) => s.id == filter.id) != undefined
        return program;
      });
    }
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
