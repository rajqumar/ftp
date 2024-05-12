import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from 'components/ProgressBar';

function CommonPage({ children, color, progress, margin }) {
  return (
    <section style={{ padding: '20px 0px', backgroundColor: color }}>
      <div className="container">
        <div className="row">
          {progress ? <ProgressBar step={progress} /> : null}
          <div style={{ marginTop: margin, width: '100%' }}>
            <div className="container">
              <div className="row">{children}</div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
      .mb-25 {
        margin-bottom: 25px;
      }
      .reject_btn {
        padding: 10px 60px;
        margin-right: 10px;
        margin-bottom: 20px;
        float: right;
      }
      .create_purchase
        {
          padding-left:3px;
        }

        .check-radio-position
        {
          margin-top:10px;
        }

        .table_create
        {
          table-layout: fixed;
        }  
        .create_head
        {
          font-size:16px;
          font-weight:700;
        }

        .tl {
          text-align: left !important;
        }
        .pl-15 {
          padding-left: 15px;
        }
        a {
          color: #3c8dbc;
        }
        .check_trans {
          padding-left:10px;
        }
        .fl-left {
          float:left;
          font-size:16px;
        }        

        .purchase_save {
          background: #6DC144;
          border: 1px solid #6DC144;
          padding: 10px 60px;
          margin-bottom: 20px;
          float: right;
        }
      
        .padding_form {
          padding:0px 10px !important;
        }
        
        #msform {
            text-align: center;
            position: relative;
            width:100%;
        }
        
        #msform fieldset {
          border: 0 none;
          border-radius: 0px;
          padding: 20px 30px;
          transform:unset !important;
          box-sizing: border-box;
          position: relative !important;
        }
        
        #msform fieldset:not(:first-of-type) {
            display: none;
        }
        
        .height_txt_area {
          height:75px !important;
        }

        .btn {
          border-radius: 3px;
        }
        .red_name {
          margin: 0px;
          color: #D2232A;
          cursor: pointer;
        }
        .table-ul {
          list-style: none;
          margin-left: -40px;
        }

        .edit_case {
          padding: 8px;
          margin-left: 10px;
      }
      .fr {
          float: right;
      }
        .reject_btn {
          padding: 10px 60px;
          margin-right: 10px;
          margin-bottom: 20px;
          float: right;
        }
      `}</style>
    </section>
  );
}

CommonPage.propTypes = {
  children: PropTypes.node,
};

export default CommonPage;
