import React from 'react'

const SocialMedia = () => (
  <ul
    className="list-unstyled mx-n3 d-flex justify-content-center social-list"
    style={{ margin: '-1rem' }}
  >
    <li className="p-3">
      <a href="https://instagram.com/tripby_">
        <img src={require('../assets/images/icons/instagram.svg')} />
      </a>
    </li>
    <li className="p-3">
      <a href="https://github.com/tripby">
        <img src={require('../assets/images/icons/github.svg')} />
      </a>
    </li>
    <li className="p-3">
      <a href="https://medium.com/@tripby">
        <img src={require('../assets/images/icons/medium.svg')} />
      </a>
    </li>
    <li className="p-3">
      <a href="https://twitter.com/tripby_">
        <img src={require('../assets/images/icons/twitter.svg')} />
      </a>
    </li>
  </ul>
)

export default SocialMedia
