import React, { PropTypes } from 'react'

const Venue = React.createClass({
  onClick(){
    const filter = this.props.venue.active ? null : this.props.venue
    this.props.filterProgramsByVenue(filter);
  },
  render () {
    const {
      name_1,
      active
    } = this.props.venue;
    return (
      <li onClick={this.onClick} className={active ? 'active' : null}>
        {name_1}
      </li>
    )
  }
});


const Venues = (props) => (
  <div className='filter-by-venues'>
    <h3>Events by venues</h3>
    <ul>
      { props.venues.map((elem, i) => <Venue key={`venue-${i}`} venue={elem} {...props}/>)}
    </ul>
  </div>
);

Venue.propTypes = {
  venue: PropTypes.object.isRequired,
};

export default Venues
