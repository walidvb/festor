import React, { PropTypes } from 'react'

const Section = React.createClass({
  onClick(){
    this.props.filterPrograms(this.props, 'section');
  },
  render () {
    return (
      <li onClick={this.onClick}>
        {this.props.name_1}
      </li>
    )
  }
});


const Sections = (props) => (
  <div className='filter-by-type'>
    <h3>Events by type</h3>
    <ul>
      { props.sections.map((elem, i) => <Section key={`section-${i}`} {...elem} {...props}/>)}
    </ul>
  </div>
);

export default Sections
