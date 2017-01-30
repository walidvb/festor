import React, { PropTypes } from 'react'
import Dates from './Dates';
import Sections from './Sections';
import Venues from './Venues';

const SideBar = (props) => (
  <div className='filters'>
    <div className='filters-by'>
      <Dates days={props.days} />
      <Sections sections={props.sections} {...props}/>
      <Venues venues={props.venues} {...props}/>
    </div>
  </div>
)

export default SideBar
