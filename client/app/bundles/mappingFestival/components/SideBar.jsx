import React, { PropTypes } from 'react'
import Dates from './Dates';
import Sections from './Sections';

const SideBar = (props) => (
  <div className='filters'>
    <div className='filters-by'>
      <Dates  {...props} />
      <Sections  sections={props.sections} />
    </div>
  </div>
)

export default SideBar
