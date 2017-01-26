import React, { PropTypes } from 'react';
import Programs from './Programs';
import SideBar from './SideBar';

const MappingFestival = (props) => (
  <div>
    <SideBar {...props} />
    <Programs {...props} />
  </div>
);

MappingFestival.propTypes = {
  programs: PropTypes.array.isRequired,
  sections: PropTypes.array.isRequired,
  days: PropTypes.array.isRequired,
};

export default MappingFestival;
