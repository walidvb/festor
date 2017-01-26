import React, { PropTypes } from 'react';

const Program = React.createClass({

  render () {
    const classes = [
      this.props.active ? 'active' : 'inactive'
    ].join(' ');
    const show = this.props.shows[0];
    const {
      art_direction,
      venue,
      } = show;

    const {
      date_start,
      date_end,
      sections,
      name_1,
    } = this.props;

    return (
      <div className={classes}>
        <div className="test">
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
