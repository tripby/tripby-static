/**
*
* Alert
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import * as Icon from 'react-feather'


function Alert(props) {
  const ParsedIcon = Icon[props.icon]
  return (
    <div className={`alert alert-${props.type} d-flex align-items-start`}>
      {props.icon && <div className="mr-3"><ParsedIcon /></div>}
      <div style={{ flex: 1 }}>{props.children}</div>
    </div>
  )
}

Alert.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  icon: PropTypes.string,
}

export default Alert
