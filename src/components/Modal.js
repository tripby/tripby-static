import React from 'react'
import PropTypes from 'prop-types'

import { Modal as BootstrapModal, ModalBody } from 'reactstrap'

const Modal = ({ isOpen, children, toggleModal }) => (
  <BootstrapModal isOpen={isOpen} toggle={toggleModal}>
    <ModalBody>{children}</ModalBody>
  </BootstrapModal>
)

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  toggleModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
}

Modal.defaultProps = {
  isOpen: false,
}

export default Modal
