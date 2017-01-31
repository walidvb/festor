import React, { PropTypes } from 'react';
const moment = require('moment');

const Program = React.createClass({

  render () {
    const classes = [
      'program',
      this.props.displayed ? 'active' : 'inactive',
    ].join(' ');

    const {
      art_direction,
      venue,
      } = this.props.shows[0];

    const {
      date_start,
      date_end,
      sections,
      name_1,
      posX,
      posY,
      posZ,
    } = this.props;
    const style = {
      transform: `translate3D(${posX}, ${posY}, ${posZ})`,
    };
    const dateStartFormatted = moment(date_start).format("h[h]mm");
    return (
      <div className={classes}>
        <div className="program-date">
          { dateStartFormatted } – {sections.map(section => section.name_1)}
        </div>
        <h3 className="program-artists">{art_direction}</h3>
        <h2 className="program-name">
          {name_1}
        </h2>
      </div>
    )
  }
})

Program.propTypes = {
  shows: PropTypes.array.isRequired,
  date_start: PropTypes.string.isRequired,
  date_end: PropTypes.string.isRequired,
  sections: PropTypes.array.isRequired,
  venue: PropTypes.object,
};

export default Program;
