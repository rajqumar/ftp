import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getListOfCountries } from './countries';
import { toast } from 'react-toastify';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmit] = useState(false);

  const [form, setState] = useState({
    c_name: '',
    c_uen: '',
    c_phone: '',
    c_email: '',
    c_addr1: '',
    c_addr2: '',
    country: '',
    u_fname: '',
    u_lname: '',
    u_email: '',
    u_title: '',
    u_phone: '',
    u_password: '',
    u_con_password: '',
    c_code: '+65',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    if (name == 'country') {
      getListOfCountries()
        .then(data => {
          var code
          Object.values(data).map(a=>a.map(ai=>ai.name.toLowerCase()===value ? code = ai : ''))

          if (code) {
            setState({
              ...form,
              ['c_code']: code.phone_prefix.toString(),
              ['country']: code.name,
            });
            if (code.length) {
              setState({
                ...form,
                ['c_code']: code[0].phone_prefix.toString(),
                ['country']: code[0].name,
              });
            }
          }
        })
        .catch(error => {
          console.log('Error ' + error);
        });
    } else {
      setState({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
    var {
      c_name,
      c_uen,
      c_phone,
      c_email,
      c_addr1,
      c_addr2,
      country,
      u_lname,
      u_email,
      u_fname,
      u_title,
      u_phone,
      u_password,
      c_code,
    } = form;

    var data = {
      u_f_name: u_fname,
      u_l_name: u_lname,
      u_email: u_email,
      password: u_password,
      u_phone: c_code + u_phone,
      u_title: u_title,
      c_name: c_name,
      c_uen: c_uen,
      c_email: c_email,
      c_addr1: c_addr1,
      c_addr2: c_addr2,
      c_phone: c_code + c_phone,
      country: country,
    };

    const api = process.env.API_URL;

    axios
      .post(`${api}/create-company/`, data)
      .then(r => {
        setSubmit(true);
        toast.success(`Saved Successfully !`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 8000,
        });
        return r;
      })
      .catch(e => {
        if (e.response.data.error.status_code == 400 && e.response.data.error.message.email) {
          setSubmit(true);
          toast.error(e.response.data.error.message.email[0], {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 8000,
          });
          return e;
        } else if (e.response.data.error.status_code == 500 && e.response.data.error.message) {
          setSubmit(true);
          toast.error('Email already exists', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 8000,
          });
          return e;
        } else {
          setSubmit(true);
          toast.warn('Some network issue will be getback to you soon', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
          });
          return e;
        }
      });
  };

  const _next = () => setStep(step >= 3 ? 4 : step + 1);

  const _prev = () => setStep(step <= 1 ? 1 : step - 1);

  const previousButton = () => {
    if (step !== 1 && step !== 4) {
      return (
        <button className="btn btn-secondary action-button-previous" type="button" onClick={_prev}>
          <center> Previous </center>

          <style jsx>{`
            .action-button-previous {
              width: 150px;
              background: #d2232a;
              color: #fff;
              border: 0 none;
              cursor: pointer;
              padding: 5px;
              float: right;
              margin: 15px 15px;
              text-align: center !important;
              font-size: 14px;
            }
            .action-button-previous:active {
              box-shadow: none !important;
              background: #d2232a !important;
              border: 1px solid #d2232a !important;
            }
          `}</style>
        </button>
      );
    }
    return null;
  };

  const nextButton = form => {
    if (step === 4 && !submitted) {
      handleSubmit();
    }
    if (step < 4) {
      var title = step == 3 ? 'Send Confirmed Info' : 'Next';
      var titleclass = step == 3 ? 'sendconfirminfo' : '';
      if (
        step == 1 &&
        form.c_name != '' &&
        form.c_uen != '' &&
        form.c_phone != '' &&
        form.c_email != '' &&
        form.c_addr1 != '' &&
        form.c_addr2 != '' &&
        form.country != ''
      ) {
        return (
          <button className={'btn  action-button ' + titleclass} type="button" onClick={_next}>
            {title}
            <style jsx>{`
              .action-button {
                width: 150px;
                background: #d2232a;
                color: #fff;
                border: 0 none;
                cursor: pointer;
                padding: 5px;
                float: right;
                margin: 15px auto;
                font-size: 14px;
              }
              .action-button:active {
                box-shadow: none !important;
                background: #d2232a !important;
                border: 1px solid #d2232a !important;
              }
            `}</style>
          </button>
        );
      }
      if (
        step == 2 &&
        form.u_fname != '' &&
        form.u_email != '' &&
        form.u_password != '' &&
        form.u_title != '' &&
        form.u_lname != '' &&
        form.u_phone != '' &&
        form.u_password == form.u_con_password
      ) {
        return (
          <button className={'btn  action-button ' + titleclass} type="button" onClick={_next}>
            {title}
            <style jsx>{`
              .action-button {
                width: 150px;
                background: #d2232a;
                color: #fff;
                border: 0 none;
                cursor: pointer;
                padding: 5px;
                float: right;
                margin: 15px auto;
                font-size: 14px;
              }
              .action-button:active {
                box-shadow: none !important;
                background: #d2232a !important;
                border: 1px solid #d2232a !important;
              }
            `}</style>
          </button>
        );
      }
      if (
        step == 3 &&
        form.c_name != '' &&
        form.c_uen != '' &&
        form.c_phone != '' &&
        form.c_email != '' &&
        form.c_addr1 != '' &&
        form.c_addr2 != '' &&
        form.country != '' &&
        form.u_fname != '' &&
        form.u_email != '' &&
        form.u_password != '' &&
        form.u_title != '' &&
        form.u_lname != '' &&
        form.u_phone != '' &&
        form.u_password == form.u_con_password
      ) {
        return (
          <button className={'btn  action-button ' + titleclass} type="button" onClick={_next}>
            {title}
            <style jsx>{`
              .action-button {
                width: 150px;
                background: #d2232a;
                color: #fff;
                border: 0 none;
                cursor: pointer;
                padding: 5px;
                float: right;
                margin: 15px auto;
                font-size: 14px;
              }
              .action-button:active {
                box-shadow: none !important;
                background: #d2232a !important;
                border: 1px solid #d2232a !important;
              }
            `}</style>
          </button>
        );
      }
      if (step == 4) {
        return (
          <button className={'btn  action-button ' + titleclass} type="button" onClick={_next}>
            {title}
            <style jsx>{`
              .action-button {
                width: 150px;
                background: #d2232a;
                color: #fff;
                border: 0 none;
                cursor: pointer;
                padding: 5px;
                float: right;
                margin: 15px auto;
                font-size: 14px;
              }
              .action-button:active {
                box-shadow: none !important;
                background: #d2232a !important;
                border: 1px solid #d2232a !important;
              }
            `}</style>
          </button>
        );
      } else {
        return (
          <button className={'btn  action-button ' + titleclass} type="button" onClick={_next} disabled>
            {title}
            <style jsx>{`
              .action-button {
                width: 150px;
                background: #d2232a;
                color: #fff;
                border: 0 none;
                cursor: pointer;
                padding: 5px;
                float: right;
                margin: 15px auto;
                font-size: 14px;
              }
              .action-button:active {
                box-shadow: none !important;
                background: #d2232a !important;
                border: 1px solid #d2232a !important;
              }
            `}</style>
          </button>
        );
      }
    }
    return null;
  };

  return (
    <React.Fragment>
      <h5 className="register_main_head">Register</h5>
      <ul id="progressbar">
        <li className={'active'}>Company Information</li>
        <li className={step >= 2 ? 'active' : ''}>
          Your <br />
          Information
        </li>
        <li className={step >= 3 ? 'active' : ''}>Review</li>
        <li className={step >= 4 ? 'active' : ''}>Verification</li>
      </ul>

      <form id="msform">
        <Step1
          step={step}
          handleChange={handleChange}
          c_name={form.c_name}
          c_uen={form.c_uen}
          c_phone={form.c_phone}
          c_email={form.c_email}
          c_addr1={form.c_addr1}
          c_addr2={form.c_addr2}
          c_code={form.c_code}
          country={form.country}
        />

        <Step2
          step={step}
          handleChange={handleChange}
          u_fname={form.u_fname}
          u_lname={form.u_lname}
          u_email={form.u_email}
          u_title={form.u_title}
          u_phone={form.u_phone}
          u_password={form.u_password}
          c_code={form.c_code}
          u_con_password={form.u_con_password}
        />

        <Step3
          step={step}
          handleChange={handleChange}
          c_name={form.c_name}
          c_uen={form.c_uen}
          c_phone={form.c_phone}
          c_email={form.c_email}
          c_addr1={form.c_addr1}
          c_addr2={form.c_addr2}
          country={form.country}
          u_fname={form.u_fname}
          u_lname={form.u_lname}
          u_email={form.u_email}
          u_title={form.u_title}
          u_phone={form.u_phone}
          u_password={form.u_password}
          u_con_password={form.u_con_password}
          c_code={form.c_code}
        />
        <Step4 step={step} handleChange={handleChange} u_email={form.u_email} />

        {nextButton(form)}
        {previousButton(form)}
      </form>

      <style jsx>{`
        .action-button {
          width: 150px;
          background: #d2232a;
          color: #fff;
          border: 0 none;
          cursor: pointer;
          padding: 5px;
          float: right;
          margin: 15px auto;
        }
        .register_main_head {
          font-size: 32px;
          font-weight: bold;
          margin: 25px auto;
          text-align: center;
        }

        content {
          min-height: 250px;
          padding: 15px;
          margin-right: auto;
          margin-left: auto;
          padding-left: 15px;
          padding-right: 15px;
        }
        #progressbar {
          overflow: hidden;
          counter-reset: step;
        }

        #progressbar li {
          text-align: center;
          list-style-type: none;
          color: rgba(34, 34, 34, 1);
          text-transform: capitalize;
          font-size: 12px;
          width: 24.33%;
          font-weight: 500;
          float: left;
          z-index: 999;
          position: relative;
          letter-spacing: 1px;
        }

        #progressbar li:before {
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

        #progressbar li:after {
          content: '';
          width: 100%;
          height: 2px;
          background: #ccc;
          position: absolute;
          left: -45%;
          top: 7px;
          z-index: -1;
        }

        #progressbar li:first-child:after {
          content: none;
        }

        #progressbar li.active:before,
        #progressbar li.active:after {
          background: #d2232a;
          color: white;
        }

        #msform {
          text-align: center;
          position: relative;
          width: 100%;
        }
        #msform fieldset {
          border: 0 none;
          border-radius: 0px;
          padding: 20px 30px;
          transform: unset !important;
          box-sizing: border-box;
          position: relative !important;
        }
        #msform input,
        #msform textarea {
          display: block;
          width: 100%;
          height: 34px;
          padding: 6px 12px;
          font-size: 14px;
          line-height: 1.42857143;
          color: #555;
          margin-bottom: 20px;
          background-color: #fff;
          background-image: none;
          border: 1px solid #ccc;
          border-radius: 4px;
          -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
          -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
          -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
          transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
        }

        #msform input:focus,
        #msform textarea:focus {
          -moz-box-shadow: none !important;
          -webkit-box-shadow: none !important;
          box-shadow: none !important;
          border: 1px solid #d2232a;
          outline-width: 0;
        }

        #msform .action-button {
          width: 150px;
          background: #d2232a;
          color: #fff;
          border: 0 none;
          cursor: pointer;
          padding: 5px;
          float: right;
          margin: 15px auto;
        }
        #msform .back_to_home {
          width: 150px;
          background: #d2232a;
          color: #fff;
          border: 0 none;
          cursor: pointer;
          padding: 5px;
          margin: 15px auto;
        }
        ::placeholder {
          color: #d0d1d2;
          opacity: 1;
        }

        :-ms-input-placeholder {
          color: #d0d1d2;
        }

        ::-ms-input-placeholder {
          color: #d0d1d2;
        }
        #msform .action-button-previous {
          width: 150px;
          background: #d2232a;
          color: #fff;
          border: 0 none;
          cursor: pointer;
          padding: 5px;
          float: right;
          margin: 15px 15px;
        }
      `}</style>
    </React.Fragment>
  );
};

RegisterForm.propTypes = {
  step: PropTypes.number,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
};

export default RegisterForm;
