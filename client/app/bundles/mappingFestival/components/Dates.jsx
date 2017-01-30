import React, { PropTypes } from 'react'
import moment from 'moment'
const Date = React.createClass({
  onClick(){
    const filter = this.props.section.active ? null : this.props.section
    this.props.filterProgramsByDay(filter);
  },
  render () {
    return (
      <li>
        Day {numberInWords[this.props.index]}
      </li>
    )
  }
});


const Dates = (props) => {
  let days = props.days.sort();
  return (
    <div className='filter-by-type'>
      <h3 className='filter-by-date'>Events by day</h3>
      <ul>
        {days.map( (day, i) => <Date key={`day-${i}`} day={day} index={i}/>)}
      </ul>
    </div>
  );
};

export default Dates


const numberInWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen'];
