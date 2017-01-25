import React, { PropTypes } from 'react';
import Program from './Program';

const MappingFestival = (props) => {
  return <Program {...props} />
};

MappingFestival.propTypes = {
  program: PropTypes.array.isRequired,
};

export default MappingFestival;
