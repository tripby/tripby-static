import React from 'react'
import PropTypes from 'prop-types'
import Identicon from '../Identicon'

const User = ({ userId, logout }) => {
  const shortUserId = userId.slice(userId.length - 8, userId.length)
  return (
    <div>
      <div className="d-inline-flex align-items-center mb-1">
        <span className="mr-2">
          <Identicon hash={userId} size={24} />
        </span>
        <small>
          <span className="text-muted">id</span>{' '}
          <strong title="Este é o ID da sua conta" style={{ cursor: 'help' }}>
            {shortUserId}
          </strong>
        </small>
      </div>
      <a href="#!" className="p-0 small text-muted d-block" onClick={logout}>
        Sair
      </a>
    </div>
  )
}

User.propTypes = {
  userId: PropTypes.string.isRequired,
}

export default User
