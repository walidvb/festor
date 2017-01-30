import { combineReducers } from 'redux';
import { mapping_festival_FILTER_SECTION, mapping_festival_FILTER_VENUE } from '../constants/mappingFestivalConstants';

const programs = (state = [], action) => {
  let programs_;
  switch (action.type) {
    case mapping_festival_FILTER_SECTION:
      programs_ = Object.assign([], state);
      return filteredProgramsBySection(programs_, action.filter);
    case mapping_festival_FILTER_VENUE:
      programs_ = Object.assign([], state);
      return filteredProgramsByVenue(programs_, action.filter);
    default:
      return state;
  }

  function filteredProgramsBySection(programs_, filter){
    return programs_.map((program) => {
      if(!filter){
        program.displayed = true;
      }
      else{
        program.displayed = program.sections.find((s) => s.id == filter.id) != undefined
      }
      return program;
    });
  }
  function filteredProgramsByVenue(programs_, filter){
    return programs_.map((program) => {
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
      const sections = Object.assign([], state);
      return sections.map((section) => {
        section.active = (action.filter && (section.id == action.filter.id));
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
      const venues = Object.assign([], state);
      return venues.map((venue) => {
        venue.active = (action.filter && (venue.id == action.filter.id));
        return venue;
      })
    default:
      return state;
  }
};

const mappingFestivalReducer = combineReducers({ programs, sections, days, venues });

export default mappingFestivalReducer;
