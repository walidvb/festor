import React, { PropTypes } from 'react'
import Dates from './Dates';
import Sections from './Sections';

const SideBar = (props) => (
  <div className='filters'>
    <div className='filters-by'>
      <Dates days={props.days} />
      <Sections sections={props.sections} {...props}/>
    </div>
  </div>
)

export default SideBar
