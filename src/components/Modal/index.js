import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

export function FtpModal(props) {
  const { open, modaldata, modalaction } = props;
  const [modal, setModal] = useState(open);

  useEffect(() => {
    setModal(open);
  }, [open]);

  const toggle = () => {
    setModal(!modal);
    modalaction(!modal);
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className="">
        <ModalHeader toggle={toggle}>{modaldata.title}</ModalHeader>
        <ModalBody>{modaldata.content}</ModalBody>
        <ModalFooter>
          <Button color={modaldata.btnColor} onClick={toggle}>
            {modaldata.btnTitle}
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

FtpModal.propTypes = {
  open: PropTypes.bool,
  modaldata: PropTypes.object,
};

export default FtpModal;
