import { createStore } from 'redux';
import mappingFestivalReducer from '../reducers/mappingFestivalReducer';

const configureStore = (railsProps) => {

  const data = JSON.parse($('[data-component-name=MappingFestivalApp]').get(0).attributes['data-props'].value);
  console.log('data', data);
  const normalizedForApp = normalizeForApp(data);
  const store = createStore(mappingFestivalReducer, normalizedForApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};

export default configureStore;

const flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

function normalizeForApp(data){
  let days = [];
  const programs = data.program.map((program_) => {
    let program = program_;
    // add show to program
    program.shows = data.program_show_list.filter((elem) => elem.program_id == program.id)
      .map((program_show) => data.show.find((show) => show.id == program_show.show_id));
    program.venue = data.venue.find((venue) => venue.id == program.venue_id);
    program.sections = flatten(program.shows.map(sectionsFromShow));

    program.displayed = true;

    return program;
  })

  data.program.map((program) => {
    const date = new Date(program.date_start);
    //format US style
    const day = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    if(!days.includes(day)){
      days.push(day);
    }
  });

  const sections = data.section;
  const venues = data.venue;
  console.log('venues', data);
  return {
    programs,
    days,
    sections,
    venues,
  };

  function sectionsFromShow(show){
    return data.section_show_list.filter((elem) => elem.show_id == show.id)
      .map((section_show) => data.section.find((section) => section.id == section_show.section_id))
  }
}
