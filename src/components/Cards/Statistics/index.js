import React from 'react';
import H4 from 'components/H4';
import PropTypes from 'prop-types';

function Statistics(props) {
  var {
    data: { compData, heading },
  } = props;

  return (
    <React.Fragment>
      <div className="row">
        <H4 data={heading} />
        <div className="flex-container">
          {compData.map((item, index) => {
            return (
            <div className="top_boxese" key={item.id} id={index}>
              <div className="box_block">
                <div className="box_purchase">
                  <p className="purchase_number">{item.purchaseNumber}</p>
                  <p className="purchase_requests">
                    {item.purchaseRequest} <br />
                    {item.subtitle}{' '}
                  </p>
                </div>
                <a href={item.cardLink ? item.cardLink : '#'} className="a-tag">
                  <p className="purchase_view">view</p>
                </a>
              </div>
            </div>
          )})}
        </div>
        <style>{`

        .flex-container {
            display: flex;
            flex-wrap: nowrap;
            justify-content: center;
            overflow: hidden;
        }
        .dash_head {
          padding-left: 15px;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
          margin-top: 10px;
        }
        .procurement_head {
          padding-left: 10px;
          font-size: 20px;
          font-weight: 700;
      }
        .top_boxese {
            background-color: #ffffff;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin: 10px;
            text-align: center;
            width: 140px;
            font-size: 30px;
          }
          .box_purchase
            {
                    padding-top: 15px;
                padding-bottom: 15px;
            }
            .purchase_number
            {
                font-size:32px;
                margin-bottom:0px;
            }
            .purchase_requests
            {
                font-size:12px;
                font-weight:400;
            }
            .purchase_view
            {
                border-top: 1px solid #ccc;
                font-size: 16px;
                margin-bottom: 0px;
                padding: 10px 0;
                color: #d2232a;
                text-transform: uppercase;
                font-weight: 700;
            }
            .a-tag:hover{
              text-decoration:none;
          }
        `}</style>
      </div>
    </React.Fragment>
  );
}
Statistics.propTypes = {
  data: PropTypes.array,
  dynamicClass: PropTypes.string,
  title: PropTypes.string,
  link: PropTypes.string,
};
export default Statistics;
