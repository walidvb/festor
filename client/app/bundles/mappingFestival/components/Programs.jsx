import React, { PropTypes } from 'react';
import Program from './Program';

const Programs = ( props ) => {
  return (<div className="program-container" style={{color: 'white'}}>
    {props.programs.map((program, i) =>
      <Program key={`prog-${i}`} {...program} />
    )}
  </div>)
};

Programs.propTypes = {
  programs: PropTypes.array.isRequired,
};

export default Programs;
