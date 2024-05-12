import React from 'react';
import PropTypes from 'prop-types';

function ProgressBar(props) {
  const { step } = props;

  return (
    <React.Fragment>
      <form id="msform">
        <ul id="progressbar_rfq">
          <li className="red_dot">RFQ</li>
          <li
            className={
              step === 'quotation' || step === 'po' || step === 'do' || step === 'inv' || step === 'acknow' || step === 'paid' ? 'red_dot active' : ''
            }>
            Quotation
          </li>
          <li className={step === 'po' || step === 'do' || step === 'inv' || step === 'acknow' || step === 'paid' ? 'red_dot active' : ''}>Purchase Orders</li>
          <li className={step === 'do' || step === 'inv' || step === 'acknow' || step === 'paid' ? 'red_dot active' : ''}>Delivery Order</li>
          <li className={step === 'inv' || step === 'acknow' || step === 'paid' ? 'red_dot active' : ''}>Invoice</li>
          <li className={step === 'paid' || step === 'acknow' || step === 'paid' ? 'red_dot active' : ''}>Payment</li>
          <li className={step === 'acknow' ? 'red_dot active' : ''}>Acknowledgement</li>
        </ul>
      </form>
      <style>{`
                #msform {
                    text-align: center;
                    position: relative;
                    width:100%;
                }

                #progressbar_rfq {
                    overflow: hidden;
                    counter-reset: step;
                    margin-top: 140px;  
                    z-index:999;
                    position:relative;
                }

                #progressbar_rfq li {
                    list-style-type: none;
                    color: rgba(34, 34, 34, 1.0);
                    text-transform: capitalize;
                    font-size: 12px;
                    width: 13.33%;
                    font-weight: 500;
                    float: left;
                    z-index: 1001;
                    position: relative;
                    letter-spacing: 1px;
                }
                #progressbar_rfq li.active:before, #progressbar_rfq li.active:after {
                  background: #d2232a;
                  color: white;
              }

                #progressbar_rfq li:first-child:after {
                    content: none;
                }
                #progressbar_rfq li:after {
                    content: '';
                    width: 100%;
                    height: 2px;
                    background: #ccc;
                    position: absolute;
                    left: -45%;
                    top: 7px;
                    z-index: -1;
                }

                #progressbar_rfq li:before {
                    content: '';
                    width: 15px;
                    height: 15px;
                    line-height: 26px;
                    display: block;
                    font-size: 12px;
                    color: #333;
                    background: #fff;
                    border: 1px solid #ccc;
                    border-radius: 25px;
                    margin: 0 auto 10px auto;
                    z-index: 1000;
                }

                .red_dot:before {
                    background-color: #d2232a !Important;
                }

                #progressbar_rfq li {
                    list-style-type: none;
                    color: rgba(34, 34, 34, 1.0);
                    text-transform: capitalize;
                    font-size: 12px;
                    width: 13.33%;
                    font-weight: 500;
                    float: left;
                    z-index: 1001;
                    position: relative;
                    letter-spacing: 1px;
                }
            `}</style>
    </React.Fragment>
  );
}

ProgressBar.propTypes = {
  step: PropTypes.string,
};

export default ProgressBar;
