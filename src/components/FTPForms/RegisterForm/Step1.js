import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getListOfCountries } from './countries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, InputGroupText, Input } from 'reactstrap';

function Step1(props) {
  const { step, handleChange, c_name, c_uen, c_phone, c_email, c_addr1, c_addr2, c_code, country } = props;
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    var optionarray = [];
    getListOfCountries()
      .then(country_data => {
        var country_list = []
        Object.values(country_data).map(a=>a.map(ai=>country_list.push(ai.name)))

        country_list.filter((item, index) => {
          if (country != '' && item == country) {
            optionarray.push(
              <option key={index} value={item.toLowerCase()} selected className="capitalCountry">
                {item.toLowerCase()}
              </option>
            );
          } else {
            optionarray.push(
              Object.keys(country_data).map(k => (
                <optgroup label={k}>
                  { country_data[k].map((co, index) => (
                  <option key={index} value={co.name.toLowerCase()} className="capitalCountry">
                    {co.name.toLowerCase()}
                  </option>
                  ))
                  }
                </optgroup>
              )
            ))
          }
        });
        setCountries(optionarray[0]);
        return optionarray;
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }, []);

  if (step !== 1) {
    return null;
  }

  return (
    <React.Fragment>
      <fieldset>
        <h2 className="fs-title">
          <FontAwesomeIcon icon={faBuilding} />
          &nbsp;Company Information
        </h2>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name" className="fl-left">
                Company Name
              </label>
              <input
                type="text"
                className="form-control"
                id="c_name"
                name="c_name"
                value={c_name}
                placeholder="Acme Inc"
                onChange={handleChange}
                tabIndex="1"
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
                id="c_email"
                name="c_email"
                value={c_email}
                placeholder="enquiries@example.com"
                tabIndex="3"
                onChange={handleChange}
                required
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
                placeholder="Address 1"
                tabIndex="5"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="c_addr2"
                name="c_addr2"
                value={c_addr2}
                placeholder="Address 2"
                tabIndex="7"
                onChange={handleChange}
                required
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
                placeholder="201987654E"
                tabIndex="2"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="fl-left">
                Location
              </label>
              <select
                className="form-control select2"
                id="country"
                name="country"
                onChange={handleChange}
                tabIndex="6"
                required>
                <option value="default">Select Location</option>
                {countries}
              </select>
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
                  className="input_group_new"
                  style={{ height: '34px' }}
                  id="c_phone"
                  name="c_phone"
                  value={c_phone}
                  placeholder=" 6789 1234"
                  tabIndex="4"
                  onChange={handleChange}
                  required
                />
              </InputGroup>
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
          .input_group_new
          {
            height:34px !important;
          }
          .phonecode
           {
               border-radius: 0px;
            width: 45px !important;
            height: 34px !important;
            margin-top: 29px !important;
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
.fl-left {
  float: left;
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: 700;
}
select#country {
  text-transform: capitalize;
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
.error{
  font-size: 12px;
  float: left;
  color: red;
  margin-top: 5px;
  margin-bottom: 10px;
}
 input,  textarea {
 display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
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
.fs-title {
  font-size: 21px;
  text-transform: capitalize;
  color: #333;
  letter-spacing: 1px;
  text-align: left;
  margin-top: 0px;
  margin-bottom:20px;
  font-weight: bold;
  display: flex;
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

}
      `}</style>
    </React.Fragment>
  );
}

Step1.propTypes = {
  step: PropTypes.number,
  handleChange: PropTypes.func,
  c_name: PropTypes.string,
  c_uen: PropTypes.string,
  c_phone: PropTypes.string,
  c_email: PropTypes.string,
  c_addr1: PropTypes.string,
  c_addr2: PropTypes.string,
  country: PropTypes.string,
  c_code: PropTypes.string,
};

export default Step1;
