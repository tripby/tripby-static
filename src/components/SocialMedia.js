import React from 'react'

const SocialMedia = () => (
  <ul className="list-unstyled m-0 d-flex justify-content-between social-list">
    <li>
      <a href="https://instagram.com/tripby_"><img src={require('../assets/images/icons/instagram.svg')} /></a>
    </li>
    <li>
      <a href="https://github.com/tripby"><img src={require('../assets/images/icons/github.svg')} /></a>
    </li>
    <li>
      <a href="https://medium.com/@tripby"><img src={require('../assets/images/icons/medium.svg')} /></a>
    </li>
    <li>
      <a href="https://twitter.com/tripby_"><img src={require('../assets/images/icons/twitter.svg')} /></a>
    </li>
    <li>
      <a href="https://join.slack.com/t/tripby/shared_invite/enQtMzQwOTcyNTUyNjYzLTY5MjFiZjIyOWVkZDk2ZDQ2Zjc3MmE0N2FmNmE3NmFhMzA3MzY3MTFkNjJhZjgxMjYzOWZhNGQyNzg1YWM4ZTU"><img src={require('../assets/images/icons/slack.svg')} /></a>
    </li>
  </ul>
)

export default SocialMedia
