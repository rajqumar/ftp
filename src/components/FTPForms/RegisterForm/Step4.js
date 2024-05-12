import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
function Step4(props) {
  const { step, u_email } = props;

  if (step !== 4) {
    return null;
  }

  const supplier_id = window.localStorage.getItem('supplier_id');
  const part_id = window.localStorage.getItem('part_id');

  return (
    <React.Fragment>
      <fieldset className="col-md-12">
        <h2 className="fs_title_last">
          <FontAwesomeIcon icon={faCheck} /> Thank you
        </h2>
        <p className="thank_msg">
          {supplier_id && part_id
            ? `You can now login via email (${u_email})`
            : `Entrusted by the FTP community, the team will do some checks on your submitted information and will contact
          you via email (${u_email}) in the next 2 working days`}
        </p>

        <center>
          {supplier_id && part_id ? (
            <Link href="/login">
              <button type="button" className="btn btn-primary back_to_home">
                Back to Login
              </button>
            </Link>
          ) : (
            <Link href="/">
              <button type="button" className="btn btn-primary back_to_home">
                Back to Home
              </button>
            </Link>
          )}
        </center>
      </fieldset>
      <style jsx>{`

 .fs_title_last {
  font-size: 21px;
  text-transform: capitalize;
  color: #333;
  margin-bottom: 20px;
  letter-spacing: 1px;
  text-align: center;
  font-weight: bold;
  text-align:center;
}
 .thank_msg 
 {
  margin: 0 auto;
  font-size: 14px;
  max-width: 99%;
  color: #000;
  text-align: center;
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
.fs-title {
  font-size: 21px;
  text-transform: capitalize;
  color: #333;
  margin-bottom: 20px;
  letter-spacing: 1px;
  text-align: left;
  font-weight: bold;
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
}
      `}</style>
    </React.Fragment>
  );
}

Step4.propTypes = {
  step: PropTypes.number,
  handleChange: PropTypes.func,
  u_email: PropTypes.string,
};

export default Step4;
