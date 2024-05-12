import React from 'react';
import H6 from 'components/H6';
import withBox from 'components/Box';
import PropTypes from 'prop-types';

export function Receipt(props) {
  const {
    data: {
      data: { receipt },
    },
  } = props;
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <H6 data="Payment Terms" />
          <p>{receipt.terms}</p>
        </div>

        <div className="col-md-6">
          <H6 data="Validity" />
          <p>{receipt.validity}</p>
        </div>
      </div>
      <div className="cur_block">
        <div className="row">
          <div className="col-md-6">
            <p>Currency</p>
          </div>
          <div className="col-md-6">
            <p>{receipt.currency}</p>
          </div>
          <div className="col-md-6">
            <p>Amount Payable</p>
          </div>
          <div className="col-md-6">
            <p>{receipt.amount}</p>
          </div>
          <div className="col-md-6">
            <p>Tax Payable</p>
          </div>
          <div className="col-md-6">
            <p>{receipt.tax}</p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>Total Amount</strong>
            </p>
          </div>
          <div className="col-md-6">
            <p>{receipt.total}</p>
          </div>
        </div>
      </div>
      <style>{`
                p {
                    font-size: 14px;
                    text-align: left;
                }

                .cur_block {
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 20px;
                }
            `}</style>
    </div>
  );
}

Receipt.propTypes = {
  data: PropTypes.object,
};

export default withBox(Receipt);
