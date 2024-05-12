import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Plain from 'components/Input';
import PropTypes from 'prop-types';

export function TransactionModal(props) {
  const { open, modaldata, modalaction } = props;
  const [modal, setModal] = useState(open);

  useEffect(() => {
    setModal(open);
  }, [open]);

  const toggle = () => setModal(!modal);
  const toggleAction = note => modalaction(!modal, note);

  return (
    <div>
      <Modal isOpen={modal} style={{ 
          background: 'rgba(0, 0, 0, 0.3)', 
          borderRadius: 0,
          boxShadow: '0 2px 3px rgba(0, 0, 0, 0.125)',
          border: 0 }}>
        <ModalHeader toggle={toggle} style={{
            borderBottomColor: '#f4f4f4'
        }}>
            <h4>{modaldata.title}</h4>
        </ModalHeader>
        <ModalBody>
            <p>{modaldata.paragraph}</p>
            <Plain
                data={{
                    box: 'tx',
                    rows: 5,
                    cols: 20,
                    label: modaldata.formLabel,
                    name: modaldata.formName,
                    type: 'textarea',
                    placeholder: ''
                }}
              />
        </ModalBody>
        <ModalFooter>
        <button type="button" class={`btn btn-block ${modaldata.btnColor}`} onClick={() => toggleAction('note')}>REJECT PURCHASE ORDER</button>
        </ModalFooter>
      </Modal>
    <style>{`
        h4 {
            textAlign: 'left',
            fontSize: '24px',
            fontWeight: 700,
        }
        .height_txt_area {
            height: 75px !important;
        }
        .form-control {
            border-radius: 0;
            box-shadow: none;
            border-color: #d2d6de;
        }
        .red_btn {
            background: #D31E25;
            border: 1px solid #D31E25;
            padding: 10px 60px;
            margin-bottom: 20px;
            color: #fff;
            font-weight: 600;
        }
        .btn {
            border-radius: 3px;
            -webkit-box-shadow: none;
            box-shadow: none;
            border: 1px solid transparent;
        }
    `}</style>
    </div>
  );
}

TransactionModal.propTypes = {
  open: PropTypes.bool,
  modaldata: PropTypes.object,
};

export default TransactionModal;
