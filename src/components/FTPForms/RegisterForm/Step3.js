import React from 'react';
import PropTypes from 'prop-types';
import { faBuilding, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Step3(props) {
  const {
    step,
    c_name,
    c_uen,
    c_phone,
    c_email,
    c_addr1,
    c_addr2,
    country,
    u_fname,
    u_lname,
    u_email,
    u_title,
    u_phone,
    c_code,
  } = props;
  if (step !== 3) {
    return null;
  }

  return (
    <React.Fragment>
      <fieldset className="col-md-12">
        <h2 className="fs-title">
          <FontAwesomeIcon icon={faBuilding} />
          &nbsp; Company Information
        </h2>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name" className="fl-left">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="c_name"
                name="c_name"
                value={c_name}
                placeholder="Shrishailya Deshmukh"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="Email" className="fl-left">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="c_email"
                name="c_email"
                value={c_email}
                placeholder="shri@hellosme.com"
                disabled
              />
            </div>

            <div className="form-group">
              <label htmlFor="Address" className="fl-left">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="c_addr1"
                name="c_addr1"
                value={c_addr1}
                placeholder="Scared world,Singapore"
                disabled
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="c_addr2"
                name="c_addr2"
                value={c_addr2}
                placeholder="Scared world,Singapore"
                disabled
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="uen" className="fl-left">
                UEN
              </label>
              <input
                type="text"
                className="form-control"
                id="c_uen"
                name="c_uen"
                value={c_uen}
                placeholder="201898924E"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="fl-left">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="c_phone"
                name="c_phone"
                value={c_code.toString() + ' ' + c_phone}
                placeholder="6567891234"
                disabled
              />
            </div>

            <div className="form-group">
              <label htmlFor="Country" className="fl-left">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                value={country}
                placeholder="Singapore"
                disabled
              />
            </div>
          </div>
        </div>
        <h2 className="fs-title mt-20">
          <FontAwesomeIcon icon={faUser} />
          &nbsp; Your Information
        </h2>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name" className="fl-left">
                First name
              </label>
              <input
                type="text"
                className="form-control"
                id="u_fname"
                name="u_fname"
                value={u_fname}
                placeholder="Shrishailya Deshmukh"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="Email" className="fl-left">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="u_email"
                name="u_email"
                value={u_email}
                placeholder="shri@hellosme.com"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="Title" className="fl-left">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="u_title"
                name="u_title"
                value={u_title}
                placeholder="Director"
                disabled
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name" className="fl-left">
                Last name
              </label>
              <input
                type="text"
                className="form-control"
                id="u_lname"
                name="u_lname"
                value={u_lname}
                placeholder="Deshmukh"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="fl-left">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="u_phone"
                name="u_phone"
                value={c_code.toString() + ' ' + u_phone}
                placeholder="65131241241"
                disabled
              />
            </div>
          </div>
        </div>

        <p className="regi_view">
          {`By registering, you agree to HelloSME's`}
          <a href="#" className="red_color">
            &nbsp;Terms of use
          </a>
          &nbsp; and
          <a href="#" className="red_color">
            &nbsp; Privacy Policy
          </a>
        </p>
      </fieldset>
      <style jsx>{`
      .regi_view {
        text-align: left;
        color: #333;
        font-size: 14px;
    }
      .red_color {
        color: #d2232a;
    }
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
          .fs-title {
            font-size: 21px;
            text-transform: capitalize;
            color: #333;
            letter-spacing: 1px;
            text-align: left;
            margin-top: 0px;
            margin-bottom:10px;
            font-weight: bold;
            display: flex;
          }
.fl-left {
  float: left;
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: 700;
}
 fieldset {
  border: 0 none;
  border-radius: 0px;
  padding: 20px 30px;
transform:unset !important;
  box-sizing: border-box;
  position: relative !important;
}

 fieldset:not(:first-of-type) {
  display: none;
}

 input,  textarea {
 display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
margin-bottom:20px;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}

 input:focus,  textarea:focus {
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  border: 1px solid #d2232a;
  outline-width: 0;
 
}

 .action-button {
    width: 150px;
  background: #d2232a;
  color: #fff;
  border: 0 none;
  cursor: pointer;
  padding: 5px;
float:right;
  margin: 15px auto;
}
 .back_to_home
{
  width: 150px;
  background: #d2232a;
  color: #fff;
  border: 0 none;
  cursor: pointer;
  padding: 5px;
  margin: 15px auto;
}
 .action-button-previous {
  
width: 150px;
  background: #d2232a;
  color: #fff;
  border: 0 none;
  cursor: pointer;
  padding: 5px;
float:right;
  margin: 15px 15px;
}
#msform input, #msform textarea {
  display: block;
   width: 100%;
   height: 34px;
   padding: 6px 12px;
   font-size: 14px;
   line-height: 1.42857143;
   color: #555;
margin-bottom:20px;
   background-color: #fff;
   background-image: none;
   border: 1px solid #ccc;
   border-radius: 4px;
   -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
   box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
   -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
   -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
   transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}

#msform input:focus, #msform textarea:focus {
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
 float:right;
   margin: 15px auto;
}
#msform .back_to_home
{
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
 float:right;
   margin: 15px 15px;
}
.mt-20
{
  margin-top:20px;
}
}
      `}</style>
    </React.Fragment>
  );
}

Step3.propTypes = {
  step: PropTypes.number,
  handleChange: PropTypes.func,
  c_name: PropTypes.string,
  c_uen: PropTypes.string,
  c_phone: PropTypes.string,
  c_email: PropTypes.string,
  c_addr1: PropTypes.string,
  c_addr2: PropTypes.string,
  country: PropTypes.string,
  u_fname: PropTypes.string,
  u_lname: PropTypes.string,
  u_password: PropTypes.string,
  u_con_password: PropTypes.string,
  u_email: PropTypes.string,
  u_title: PropTypes.string,
  u_phone: PropTypes.string,
  c_code: PropTypes.string,
};

export default Step3;
