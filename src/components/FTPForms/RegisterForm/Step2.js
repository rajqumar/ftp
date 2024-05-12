import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, InputGroupText, Input } from 'reactstrap';

const Title = [{ title: 'Developer' }, { title: 'Designer' }, { title: 'Manager' }, { title: 'User' }];
function Step2(props) {
  const { step, handleChange, u_fname, u_lname, u_email, u_title, u_phone, u_password, u_con_password, c_code } = props;

  if (step !== 2) {
    return null;
  }
  const showoption = () => {
    var optionarray = [];
    Title.filter((item, index) => {
      if (u_title != '' && item.title == u_title)
        optionarray.push(
          <option key={index} value={item.title} selected>
            {item.title}
          </option>
        );
      else
        optionarray.push(
          <option key={index} value={item.title}>
            {item.title}
          </option>
        );
    });
    return optionarray;
  };
  return (
    <React.Fragment>
      <fieldset className="col-md-12">
        <h2 className="fs-title">
          <FontAwesomeIcon icon={faUser} />
          &nbsp; Your Information
        </h2>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="u_fname" className="fl-left">
                First name
              </label>
              <input
                type="text"
                className="form-control"
                id="u_fname"
                name="u_fname"
                placeholder="John "
                value={u_fname}
                tabIndex="1"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="fl-left">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="u_email"
                name="u_email"
                placeholder="name@example.com"
                value={u_email}
                autoComplete="off"
                tabIndex="3"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Password" className="fl-left">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="u_password"
                name="u_password"
                placeholder="password"
                value={u_password}
                tabIndex="5"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Title" className="fl-left">
                Title
              </label>
              <select className="form-control select2" id="u_title" name="u_title" tabIndex="7" onChange={handleChange}>
                <option value="default">Select Title</option>
                {showoption()}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="u_lname" className="fl-left">
                Last name
              </label>
              <input
                type="text"
                className="form-control"
                id="u_lname"
                name="u_lname"
                placeholder="Applessed"
                value={u_lname}
                tabIndex="2"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="fl-left">
                Phone
              </label>
              <InputGroup size="sm">
                <InputGroupText
                  style={{ fontSize: '12px !important', borderRadius: '4px 0px 0px 4px', width: '45px', height: '34px' }}
                  className="phonecode">
                  {c_code}
                </InputGroupText>
                <Input
                  type="number"
                  className="form-control"
                  style={{ height: '34px' }}
                 id="u_phone"
                  name="u_phone"
                  value={u_phone}
                  placeholder=" 6789 1234"
                  tabIndex="4"
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </div>

            <div className="form-group">
              <label htmlFor="Password" className="fl-left"    style={{ marginTop: '5px' }}>
                Confirm password
              </label>
              <input
                type="password"
                className="form-control"
                id="u_con_password"
                name="u_con_password"
                placeholder="password"
                value={u_con_password}
                tabIndex="6"
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
      </fieldset>
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
}
      `}</style>
    </React.Fragment>
  );
}

Step2.propTypes = {
  step: PropTypes.number,
  handleChange: PropTypes.func,
  u_fname: PropTypes.string,
  u_lname: PropTypes.string,
  u_email: PropTypes.string,
  u_title: PropTypes.string,
  u_phone: PropTypes.string,
  u_password: PropTypes.string,
  u_con_password: PropTypes.string,
  c_code: PropTypes.string,
};

export default Step2;
