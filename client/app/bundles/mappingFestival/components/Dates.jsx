import React, { PropTypes } from 'react'

const Date = React.createClass({
  render () {
    return (
      <li>
        {this.props.name_1}
      </li>
    )
  }
});


const Dates = (props) => (
  <div className='filter-by-type'>
    <h3 className='filter-by-date'>Events by type</h3>
    <ul>
      
    </ul>
  </div>
);

export default Dates
