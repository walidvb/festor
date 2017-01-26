import React, { PropTypes } from 'react'
import Dates from './Dates';
import Sections from './Sections';

const SideBar = (props) => (
  <div>
    <Dates {...props} />
    <Sections sections={props.section} />
  </div>
)

export default SideBar
