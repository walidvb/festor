import { combineReducers } from 'redux';
import { mapping_festival_FILTER_SECTION } from '../constants/mappingFestivalConstants';

const programs = (state = [], action) => {

  switch (action.type) {
    case mapping_festival_FILTER_SECTION:
      return filteredProgramsBySection(action.filter);
    default:
      return state;
  }

  function filteredProgramsBySection(filter){
    const programs = state;
    return programs.map((program) => {
      if(!filter){
        program.displayed = true;
      }
      else{
        program.displayed = program.sections.find((s) => s.id == filter.id) != undefined
      }
      return program;
    });
  }
};

const sections = (state = [], action) => {
  switch (action.type) {
    case mapping_festival_FILTER_SECTION:
      const sections = state;
      return sections.map((section) => {
        section.active = action.filter && (section.id == action.filter.id);
        return section;
      })
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
