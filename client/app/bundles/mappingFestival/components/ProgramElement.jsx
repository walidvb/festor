import React, { PropTypes } from 'react';

const ProgramElement = React.createClass({
  componentWillMount() {
    const { show, program, venue, section_show_list, section } = this.props;
    const { show_id, program_id } = this.props;
    const show_ = show.find((elem) => (elem.id == show_id));
    const program_ = program.find((elem) => (elem.id == program_id));

    const { venue_id, section_id } = program_;
    const venue_ = venue.find((elem) => (elem.id == venue_id));
    const section_ = section.find((elem) => elem.id == section_id);
    this.state = {
      active: false,
      show_,
      program_,
      venue_,
      section_
    }
  },
  render () {
    const classes = [
      this.state.active ? 'active' : 'inactive'
    ].join(' ');

    const {
      show_,
      program_,
      venue_,
      section_ } = this.state;

    return (
      <div className={classes}>
        <div>
          { program_.date_start } – {section_ ? section_.name_1 : null}
        </div>
        <h2>{show_.art_direction}</h2>
        <h3>
          {program_.name_1}
        </h3>
      </div>
    )
  }
})

ProgramElement.propTypes = {
  program: PropTypes.array.isRequired,
  show: PropTypes.array.isRequired,
  show_id: PropTypes.number.isRequired,
};

export default ProgramElement;
