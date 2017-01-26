import React, { PropTypes } from 'react'

const Section = React.createClass({
  render () {
    return (
      <li>
        {this.props.name_1}
      </li>
    )
  }
});


const Sections = (props) => (
  <div className='filter-by-type'>
    <h3>Events by type</h3>
    <ul>
      { props.sections.map((elem, i) => <Section key={`section-${i}`} {...elem}/>)}
    </ul>
  </div>
);

export default Sections
