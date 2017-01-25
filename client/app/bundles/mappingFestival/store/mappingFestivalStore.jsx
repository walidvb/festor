import { createStore } from 'redux';
import mappingFestivalReducer from '../reducers/mappingFestivalReducer';

const configureStore = (railsProps) => {

  console.log('railsProps', railsProps);
  const program = railsProps;
  return createStore(mappingFestivalReducer, railsProps);
};

export default configureStore;
