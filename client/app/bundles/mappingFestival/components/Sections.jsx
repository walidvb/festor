import React, { PropTypes } from 'react'

const Section = React.createClass({
  onClick(){
    const filter = this.props.section.active ? null : this.props.section
    this.props.filterProgramsBySection(filter);
  },
  render () {
    const {
      name_1,
      active
    } = this.props.section;
    return (
      <li onClick={this.onClick} className={active ? 'active' : null}>
        {name_1}
      </li>
    )
  }
});


const Sections = (props) => (
  <div className='filter-by-type'>
    <h3>Events by type</h3>
    <ul>
      { props.sections.map((elem, i) => <Section key={`section-${i}`} section={elem} {...props}/>)}
    </ul>
  </div>
);

export default Sections
