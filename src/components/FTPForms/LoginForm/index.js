import React, { useEffect, useState } from 'react';
import { Input, Alert } from 'reactstrap';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';

import Button from 'components/Button';
import Loader from 'components/Loader';
import Plain from 'components/Input';

function LoginForm(props) {
  const { submitForm, handleSubmit, data } = props;

  const { loading, fetched, error, loginData } = data;
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const query = router.query;

  var checked = false;
  var showError = false;
  if (error) {
    showError = true;
  }

  var email = '';
  var rememberme;

  useEffect(() => {
    if (
      window.localStorage.getItem('ftp_token') != null ||
      (loginData && loginData.token && loginData.token.length > 0)
    ) {
      const supplier_id = window.localStorage.getItem('supplier_id');
      const part_id = window.localStorage.getItem('part_id');

      if (supplier_id && part_id) {
        Router.push({ pathname: '/rfq/buy/create', query: { supp_id: supplier_id, part_id: part_id } });
      } else {
        setLoader(true);
        if (Object.keys(query).length > 0 && query.isppeuser === 'true') {
          window.location.assign(`https://www.hellomedicalppe.com/?isuserloggedin=${true}`);
        } else {
          Router.push('/dashboard/manager');
        }
      }
    }

    if (window.localStorage.getItem('rememberme') != null) {
      email = localStorage.getItem('userEmail');
    }
    checked = !checked;
    if (checked == true) {
      window.localStorage.setItem('rememberme', true);
    } else {
      window.localStorage.removeItem('rememberme');
      localStorage.removeItem('userEmail');
    }

    rememberme = () => {
      checked = !checked;
      if (checked == true) {
        window.localStorage.setItem('rememberme', true);
      } else {
        window.localStorage.removeItem('rememberme');
        localStorage.removeItem('userEmail');
      }
    };
  });

  return (
    <div className="login-box">
      {showError ? <Alert color="danger">Invalid Email or Password</Alert> : null}

      <div className="login-box-body">
        <h4 className="login_head">Log In</h4>

        <form onSubmit={handleSubmit(submitForm)}>
          <Plain
            data={{
              type: 'email',
              label: 'Email',
              name: 'email',
              value: email,
              placeholder: 'name@example.com',
              validate: ['required'],
            }}
          />

          <Plain
            data={{
              type: 'password',
              label: 'Password',
              name: 'password',
              placeholder: 'Type a password here',
              validate: ['required'],
            }}
          />

          <div className="row justify-content-center">
            {loading || loader || (fetched && loginData.token === undefined) ? (
              <Loader />
            ) : (
              <div className="col-xs-12 pad_login">
                <Button
                  color="red"
                  value="Login"
                  shape="rect"
                  position="left"
                  className="btn-block"
                  icon={null}
                  dynamicClassName={'btn-primary'}
                />
              </div>
            )}
          </div>
        </form>
        <div className="row">
          <div className="col-md-1">
            <Input type="checkbox" id="rememberMe" name="rememberMe" onChange={rememberme} className="remember" />
          </div>
          <div className="col-md-11 rememberlabel">
            <label>Remember me</label>
          </div>
        </div>
        <p className="ft_pass">
          <a href="/forgetpassword" className="forgot_pwd">
            forgot password?
          </a>
        </p>
        <p className="dont_className">
          {`Don't have an account?`}
          <Link
            href={
              Object.keys(query).length > 0 && query.isppeuser == 'true' ? '/register?isppeuser=true' : '/register'
            }>
            <a className="text-center red_color"> Sign up</a>
          </Link>
        </p>
      </div>
      <style>{`

.login-box {
  width: 360px;
  margin: 12% auto;
  position:relative;
}
.ft_pass {
  margin-bottom: 5px;
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
.btn_sign_in {
  background-color: rgba(210, 35, 42, 1.0) !important;
  border-color: rgba(210, 35, 42, 1.0) !important;
  border-radius: 4px !important;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 18px;
  font-weight:700;
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
.forgot_pwd {
  margin-bottom: 20px;
  color: #333;
  font-size: 16px;
}
.red_color {
color: #d2232a; 
}
.dont_class {
  font-size: 14px;
}
.dont_class a {
  font-size: 14px;
}

.form-position {
  padding-left: 0;
}

.remember {
  margin-left: -6px;
  margin-top: 5px;
}

.rememberlabel {
  margin-left: 25px;
}
`}</style>
    </div>
  );
}

LoginForm.propTypes = {
  submitForm: PropTypes.func,
  handleSubmit: PropTypes.func,
  loginToken: PropTypes.func,
  data: PropTypes.func,
  token: PropTypes.string,
  error: PropTypes.string,
};

export default reduxForm({ form: 'login' })(LoginForm);
