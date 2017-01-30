import { combineReducers } from 'redux';
import { mapping_festival_FILTER_SECTION, mapping_festival_FILTER_VENUE } from '../constants/mappingFestivalConstants';

const programs = (state = [], action) => {

  switch (action.type) {
    case mapping_festival_FILTER_SECTION:
      return filteredProgramsBySection(action.filter);
    case mapping_festival_FILTER_VENUE:
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
  function filteredProgramsBySection(filter){
    const programs = state;
    return programs.map((program) => {
      if(!filter){
        program.displayed = true;
      }
      else{
        program.displayed = program.venue && (program.venue.id == filter.id)
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

const venues = (state = [], action) => {
  switch (action.type) {
    case mapping_festival_FILTER_VENUE:
      const venues = state;
      return venues.map((venue) => {
        console.log(action.filter.id, venue.id);
        venue.active = action.filter && (venue.id == action.filter.id);
        return venue;
      })
    default:
      return state;
  }
};

const mappingFestivalReducer = combineReducers({ programs, sections, days, venues });

export default mappingFestivalReducer;
