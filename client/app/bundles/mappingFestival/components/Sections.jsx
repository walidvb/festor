import React, { PropTypes } from 'react'

const Section = React.createClass({
  render () {
    return (
      <div>
        {this.props.name_1}
      </div>
    )
  }
});


const Sections = (props) => (
  <div>
    { props.sections.map((elem, i) => <Section key={`section-${i}`} {...elem}/>)}
  </div>
);

export default Sections
