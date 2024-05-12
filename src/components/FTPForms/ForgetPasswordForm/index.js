import React from 'react';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import Plain from 'components/Input';

function ForgetPasswordForm(props) {
  const { submitForm, handleSubmit } = props;

  return (
    <div className="login-box">
      <div className="login-box-body">
        <h4 className="login_head">Forget Password</h4>

        <form onSubmit={handleSubmit(submitForm)}>
          <Plain
            data={{
              type: 'email',
              label: 'Email',
              name: 'email',
              placeholder: 'name@example.com',
              validate: ['required'],
            }}
          />

          <div className="row justify-content-center">
            <div className="col-xs-12 pad_login">
              <Button
                color="red"
                value="Send Email"
                shape="rect"
                position="left"
                className="btn-block"
                icon={null}
                dynamicClassName={'btn-primary'}
              />
            </div>
          </div>
        </form>
      </div>
      <style>{`

        .login-box {
          width: 360px;
          margin: 12% auto;
          position:relative;
        }
       
        .login-box-body {
          padding: 20px;
          background: #fff;
          border: 1px solid #dddcdc;
          border-radius: 5px;
          min-height: 100%;
          box-shadow: 
        }
        .login_head {
          font-size: 32px;
          font-weight: bold;
          margin: 0px 0 20px 0;
          color: #333;
          text-align: center;
        }

        .col-xs-12 {
          width: 100%;
        }

        .pad_login
        {
          padding:0px 15px;
        }

        .btn.btn-flat {
          border-radius: 0;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          border-width: 1px;
        }

        .btn-primary {
          background-color: #3c8dbc;
          border-color: #367fa9;
        }

        .btn {
          border-radius: 3px;
          -webkit-box-shadow: none;
          box-shadow: none;
          border: 1px solid transparent;
        }

        .btn_sign_in {
          background-color: rgba(210, 35, 42, 1.0) !important;
          border-color: rgba(210, 35, 42, 1.0) !important;
          border-radius: 4px !important;
          margin-bottom: 20px;
          padding: 10px;
          font-size: 18px;
          font-weight:700;
        }

    `}</style>
    </div>
  );
}

ForgetPasswordForm.propTypes = {
  submitForm: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default reduxForm({ form: 'forgetpassword' })(ForgetPasswordForm);
