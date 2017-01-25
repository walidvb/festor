import React, { PropTypes } from 'react';
import ProgramElement from './ProgramElement';

const Program = ( props ) => {
  return (<div className="program-container" style={{color: 'white'}}>
    {props.program_show_list.map((program_show, i) =>
      <ProgramElement key={`prog-${i}`} { ...props } {...program_show} />
    )}
  </div>)
};

Program.propTypes = {
  program_show_list: PropTypes.array.isRequired,
};

export default Program;
