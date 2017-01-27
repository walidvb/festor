import React, { PropTypes } from 'react';

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
    } = this.props;

    return (
      <div className={classes}>
        <div className="">
          { date_start } – {sections.map(section => section.name_1)}
        </div>
        <h3>{art_direction}</h3>
        <h2>
          {name_1}
        </h2>
      </div>
    )
  }
})

Program.propTypes = {
  shows: PropTypes.array.isRequired,
  date_start: PropTypes.string.isRequired,
  date_end: PropTypes.array.isRequired,
  sections: PropTypes.array.isRequired,
  venue: PropTypes.object,
};

export default Program;
