import React, { PropTypes } from 'react';
import Program from './Program';
import SideBar from './SideBar';

const MappingFestival = (props) => (
  <div>
    <SideBar {...props} />
    <Program {...props} />
  </div>
);

MappingFestival.propTypes = {
  program: PropTypes.array.isRequired,
};

export default MappingFestival;
