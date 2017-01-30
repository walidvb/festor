import React, { PropTypes } from 'react';
import Program from './Program';

const Programs = ( props ) => {
  function getProgramPosition(program){
    let posX, posY, posZ;
    return {
      posX,
      posY,
      posZ
    }
  }
  return (<div className="program-container" style={{color: 'white'}}>
    {props.programs.map((program, i) => {
        const pos = getProgramPosition(program, i);
        return <Program key={`prog-${i}`} {...program} {...pos} />
      }
    )}
  </div>)
};

Programs.propTypes = {
  programs: PropTypes.array.isRequired,
};

export default Programs;
