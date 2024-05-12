import React, { useEffect, useState } from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import H2 from 'components/H2';
import Plain from 'components/Input';
import { reduxForm } from 'redux-form';
import { useSelector } from 'react-redux';
import { InputGroup, InputGroupText } from 'reactstrap';
import { getListOfCountries } from '../RegisterForm/countries';

export function CreateUser(props) {
  const {
    data: { basic_info },
  } = props;

  const [countryData, setCountriesData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [phonePrefix, setPhonePrefix] = useState('+91');
  const countryNames = [];

  useEffect(() => {
    var optionarray = [];
    getListOfCountries().then(country_data => {
      var country_list = []
      var countries_data = []
      Object.values(country_data).map(a=>a.map(ai=> { 
        country_list.push(ai.name) 
        countries_data.push(ai) 
      }))

      setCountriesData(countries_data)

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
                  {co.name}
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

  const userRoles = useSelector(state => {
    if (state && state.manageuser.roles.length > 0) {
      return state.manageuser.roles;
    }
  });

  const roles = [];

  if (userRoles && userRoles.length > 0) {
    userRoles.map(userRole => {
      const role = {
        value: userRole,
        name: userRole,
      };
      roles.push(role);
    });
  }

  const { createUsersHandler, handleSubmit, title, submitting, pristine } = props;
  const onChange = e => {
    if (e.target.type == 'checkbox') {
      // console.log('Checkbox value = ', e.target.checked);
    } else if (e.target.type == 'radio') {
      // console.log('Radio value = ', e.target.value);
    } else if (e.target.type == 'date') {
      // console.log('Date value = ', e.target.value);
    } else {
      // console.log('Input value = ', e.target.value);
    }
  };

  const handleChange = e => {
    if (e.target.type === 'select-one') {
      countryData.filter(country => {
        if (country.name.toLowerCase() === e.target.value) {
          setPhonePrefix(country.phone_prefix);
        }
      });
    } else {
      true;
    }
  };

  return (
    <div className="container mt-9">
      <section className="content">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 reg_form_new">
            <form id="msform" onSubmit={handleSubmit(createUsersHandler)}>
              <center>
                <h5 className="register_main_head">{title}</h5>
              </center>
              <fieldset>
                <div className="fs-title">
                  <H2 data={'Basic Information'} icon={faUser} position="left" dynamicClass="icon_position" />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Plain
                      data={{
                        label: 'First Name',
                        type: 'text',
                        name: 'first_name',
                        id: 'first_name',
                        dynamicClass: 'fl-left',
                        placeholder: basic_info.first_name,
                        validate: ['required'],
                        tabIndex: 1,
                        onChange: onChange,
                      }}
                    />

                    <Plain
                      data={{
                        label: 'Email',
                        type: 'email',
                        name: 'email',
                        id: 'email',
                        dynamicClass: 'fl-left',
                        placeholder: basic_info.email,
                        validate: ['email', 'required'],
                        tabIndex: 3,
                        onChange: onChange,
                      }}
                    />

                    <Plain
                      data={{
                        label: 'Title',
                        type: 'text',
                        name: 'title',
                        id: 'title',
                        placeholder: basic_info.title,
                        dynamicClass: 'fl-left',
                        validate: ['required'],
                        tabIndex: 5,
                        onChange: onChange,
                      }}
                    />

                    <Plain
                      data={{
                        label: 'Password',
                        type: 'password',
                        name: 'password',
                        id: 'password',
                        dynamicClass: 'fl-left',
                        placeholder: 'Password',
                        validate: ['required', 'maxLength8'],
                        tabIndex: 7,
                        onChange: onChange,
                      }}
                    />
                    <label className="fl-left">Task</label>
                    <br />
                    <div className="container-name task">
                      <Plain
                        data={{
                          label: 'Buy',
                          type: 'checkbox',
                          name: 'is_buyer',
                          id: 'is_buyer',
                          dynamicClass: 'fl-left',
                          position: 'check-radio-position',
                          validate: [],
                          tabIndex: 9,
                          onChange: onChange,
                        }}
                      />
                      <Plain
                        data={{
                          label: 'Sell',
                          type: 'checkbox',
                          id: 'is_seller',
                          name: 'is_seller',
                          dynamicClass: 'fl-left',
                          position: 'check-radio-position',
                          validate: [],
                          tabIndex: 10,
                          onChange: onChange,
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <Plain
                      data={{
                        label: 'Last Name',
                        type: 'text',
                        name: 'last_name',
                        id: 'last_name',
                        placeholder: basic_info.last_name,
                        dynamicClass: 'fl-left',
                        validate: ['required'],
                        tabIndex: 2,
                        onChange: onChange,
                      }}
                    />

                    <InputGroup size="sm" className="mbn-20">
                      <InputGroupText
                        style={{
                          fontSize: '12px !important',
                          borderRadius: '4px 0 0 4px',
                          width: '45px',
                          height: '33px',
                          marginTop: '29px',
                        }}
                        className="phonecode">
                        {phonePrefix}
                      </InputGroupText>
                      <Plain
                        data={{
                          label: 'Phone',
                          type: 'number',
                          name: 'phone',
                          id: 'phone',
                          validationPosition: '-46px',
                          dynamicClass: 'fl-left input_new_type',
                          placeholder: basic_info.phone,
                          validate: ['required', 'phoneNumber'],
                          position: 'input_width',
                          tabIndex: 4,
                          onChange: onChange,
                        }}
                      />
                    </InputGroup>
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

                    <Plain
                      data={{
                        label: 'Role',
                        dynamicClass: 'fl-left top-18',
                        dropdownData: roles,
                        onChange: handleChange,
                        type: 'dropdown',
                        tabIndex: 7,
                        defaultOption: 'Select role',
                        name: 'role',
                      }}
                    />

                    <Plain
                      data={{
                        label: 'Confirm Password',
                        type: 'password',
                        id: 'confirm_password',
                        name: 'confirm_password',
                        placeholder: 'Confirm Password',
                        dynamicClass: 'fl-left',
                        validate: ['required', 'maxLength8'],
                        tabIndex: 8,
                        onChange: onChange,
                      }}
                    />
                    <label className="fl-left">Status</label>

                    <div className="container-name">
                      <Plain
                        data={{
                          label: 'Active',
                          type: 'radio',
                          name: 'is_active',
                          dynamicClass: 'fl-left',
                          position: 'check-radio-position',
                          value: 'checked',
                          validate: [],
                          tabIndex: 11,
                          onChange: onChange,
                        }}
                      />
                      <Plain
                        data={{
                          label: 'Inactive',
                          type: 'radio',
                          name: 'is_active',
                          dynamicClass: 'fl-left',
                          position: 'check-radio-position',
                          value: 'unchecked',
                          validate: [],
                          tabIndex: 12,
                          onChange: onChange,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <center>
                  <button
                    type="submit"
                    className="btn btn-success save_changes"
                    tabIndex="13"
                    disabled={pristine || submitting}>
                    {submitting ? 'Creating...' : 'Save changes'}
                  </button>
                </center>
              </fieldset>
            </form>
          </div>
        </div>
      </section>
      <style>{`
          .col-md-offset-3 {
            margin-left: 25%;
          }

          col-md-6 {
            width: 50%;
          }
.top-18
{
  margin-top:5px !important;
}
          .mt-9 {
            margin-top:9%;
          }

          .input_new_type {
            margin-left:-43px;
          }

          .input_width {
            width:79%;
          }

          .mbn-20 {
            margin-bottom:-14px;
          }

          .task {
            margin-left: -28px;
          }

          .content {
            min-height: 250px;
            padding: 15px;
            margin-right: auto;
            margin-left: auto;
            padding-left: 15px;
            padding-right: 15px;
          }

          .reg_form_new {
            background: #fff;
            border: 1px solid #dddcdc;
            border-radius: 5px;
            min-height: 100%;
            box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.07);
          }

          #msform {
            text-align: center;
            position: relative;
            width:100%;
          }

          .register_main_head {
            font-size: 32px;
            font-weight: bold;
            color: #000;
            margin: 25px auto;
          }

          .check-radio-position {
            margin-right: 55px;
          }
          #msform fieldset {
            border: 0 none;
            border-radius: 0px;
            padding: 20px 30px;
            transform: unset !important;
            box-sizing: border-box;
            position: relative !important;
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
            margin-bottom: 20px;
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

          .save_changes {
            background-color: #D2232A;
            border: 1px solid #D2232A;
            margin-top: 25px;
            text-transform: uppercase;
            font-size: 14px;
            color: #fff;
          }

          .fl-left {
            float: left;
            font-size: 16px;
          }

          .checkbox-inline, .radio-inline {
            position: relative;
            display: inline-block;
            padding-left: 40px;
            margin-bottom: 0;
            font-weight: 400;
            vertical-align: middle;
            cursor: pointer;
          }

          .checkbox-inline, .radio-inline {
            position: relative;
            display: inline-block;
            padding-left: 40px;
            margin-bottom: 0;
            font-weight: 400;
            vertical-align: middle;
            cursor: pointer;
          }
          
          label {
            display: inline-block;
            max-width: 100%;
            margin-bottom: 5px;
            font-weight: 700;
          }

          .inline_check_issue {
            height:auto !Important;
            width:auto !important;
          }

          .inline_radio_issue {
              height:auto !Important;
              width:auto !important;
              position: absolute;
              margin-top: 4px;
              margin-left: -20px !important;
          }

          .select2-container--default .select2-selection--single {
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .mb-15 {
            margin-bottom: 15px;
          }

          .select2-container .select2-selection--single {
            box-sizing: border-box;
            cursor: pointer;
            display: block;
            height: 34px;
            user-select: none;
            -webkit-user-select: none;
          }

          .select2-container--default .select2-selection--single, .select2-selection .select2-selection--single {
            border: 1px solid #d2d6de;
            border-radius: 0;
            padding: 6px 12px;
            height: 34px;
          }
          body {
            color: #555;
          }
          .icon_position {
            margin-right: 5px;
          }

          .container-name {
            display: flex;
            float: left;
          }
  `}</style>
    </div>
  );
}

CreateUser.propTypes = {
  data: PropTypes.shape({
    basic_info: PropTypes.object,
  }),
  title: PropTypes.string,
  createUsersHandler: PropTypes.func,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.string,
  pristine: PropTypes.string,
};

export default reduxForm({
  form: 'manageuser',
  initialValues: { is_buyer: false, is_seller: false, is_active: false, country: 'India' },
})(CreateUser);
