import React, { useEffect, useState } from 'react';
import { reduxForm } from 'redux-form';
import Plain from 'components/Input';
import PropTypes from 'prop-types';
import H2 from 'components/H2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, InputGroupText } from 'reactstrap';
import { getListOfCountries } from '../../FTPForms/RegisterForm/countries';

export function ProfileView(props) {
  const {
    profile: { data },
    updateProfileHandler,
    handleSubmit,
  } = props;
  const countryNames = [];

  const [countryData, setCountriesData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [phonePrefix, setPhonePrefix] = useState('+91');

  useEffect(() => {
    getListOfCountries()
      .then(country_list => {
        setCountriesData(country_list);
        country_list.map(item => {
          if (item.name != 'India') {
            const country = {
              value: item.name,
              name: item.name,
            };
            countryNames.push(country);
          }
        });
        setCountries(countryNames);
      })
      .catch(error => {
        console.log('Error ' + error);
      });
  }, []);

  const onChange = e => {
    if (e.target.type == 'select-one') {
      countryData.filter(country => {
        if (country.name === e.target.value) {
          setPhonePrefix(country.phone_prefix);
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(updateProfileHandler)}>
      <h5 className="register_main_head">My Profile</h5>
      <fieldset>
        <div className="fs-title">
          <FontAwesomeIcon icon={faBuilding} className="icon_position" />
          <H2 data={'Company Information'} />
        </div>
        <div className="row">
          <div className="col-md-6">
            <Plain
              data={{
                label: 'Company Name',
                type: 'text',
                name: 'c_name',
                id: 'name',
                placeholder: data.company_details.company_name,
                validate: ['required'],
                tabIndex: 1,
                onChange: onChange,
              }}
            />

            <Plain
              data={{
                label: 'Email',
                type: 'email',
                name: 'c_email',
                id: 'email',
                placeholder: data.company_details.email,
                onChange: onChange,
                tabIndex: 3,
                isDisabled: true,
              }}
            />
            <Plain
              data={{
                label: 'Address',
                type: 'text',
                name: 'c_addr1',
                id: 'addr1',
                placeholder: data.company_details.address_1,
                validate: ['required'],
                tabIndex: 5,
                onChange: onChange,
              }}
            />
            <Plain
              data={{
                type: 'text',
                name: 'c_addr2',
                id: 'addr2',
                placeholder: data.company_details.address_2,
                validate: ['required'],
                tabIndex: 7,
                onChange: onChange,
              }}
            />
          </div>
          <div className="col-md-6">
            <Plain
              data={{
                label: 'UEN',
                type: 'text',
                name: 'c_uen',
                id: 'uen',
                placeholder: data.company_details.UEN,
                validate: ['required'],
                tabIndex: 2,
                onChange: onChange,
              }}
            />
            <InputGroup size="sm" className="mbn-20">
              <InputGroupText
                style={{
                  fontSize: '12px !important',
                  borderRadius: '4px 0px 0px 4px',
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
                  name: 'c_phone',
                  id: 'phone',
                  validationPosition: '-46px',
                  dynamicClass: 'input_new_type',
                  position: 'input_width',
                  placeholder: data.company_details.phone,
                  validate: ['required', 'phoneNumber'],
                  tabIndex: 4,
                  onChange: onChange,
                }}
              />
            </InputGroup>

            <Plain
              data={{
                label: 'Location',
                type: 'dropdown',
                name: 'country',
                id: 'country',
                tabIndex: 6,
                defaultOption: 'India',
                dropdownData: countries,
                onChange: onChange,
              }}
            />
          </div>
        </div>

        <div className="fs-title">
          <FontAwesomeIcon icon={faUser} className="icon_position" />
          <H2 data={'Your Information'} />
        </div>

        <div className="row">
          <div className="col-md-6">
            <Plain
              data={{
                label: 'First Name',
                type: 'text',
                name: 'u_f_name',
                id: 'name',
                placeholder: data.first_name,
                validate: ['required'],
                tabIndex: 8,
                onChange: onChange,
              }}
            />
            <Plain
              data={{
                label: 'Title',
                type: 'text',
                name: 'u_title',
                id: 'title',
                placeholder: data.title,
                validate: ['required'],
                tabIndex: 10,
                onChange: onChange,
              }}
            />
            <Plain
              data={{
                label: 'Phone',
                type: 'number',
                name: 'u_phone',
                id: 'phone1',
                placeholder: data.phone,
                validate: ['required', 'phoneNumber'],
                tabIndex: 11,
                onChange: onChange,
              }}
            />
          </div>

          <div className="col-md-6">
            <Plain
              data={{
                label: 'Last Name',
                type: 'text',
                name: 'u_l_name',
                id: 'name',
                placeholder: data.last_name,
                validate: ['required'],
                tabIndex: 9,
                onChange: onChange,
              }}
            />
            <Plain
              data={{
                label: 'Email',
                type: 'email',
                name: 'u_email',
                id: 'email1',
                placeholder: data.email,
                validate: [],
                onChange: onChange,
                isDisabled: true,
              }}
            />
            <Plain
              data={{
                label: 'New Password',
                type: 'password',
                name: 'password',
                id: 'password',
                placeholder: 'Leave blank if unchanged',
                validate: ['maxLength8'],
                tabIndex: 12,
                onChange: onChange,
              }}
            />
            <Plain
              data={{
                label: 'Confirm Password',
                type: 'password',
                name: 'password1',
                id: 'password1',
                placeholder: 'Leave blank if unchanged',
                validate: ['maxLength8'],
                tabIndex: 13,
                onChange: onChange,
              }}
            />
          </div>
        </div>

        <center>
          <button type="submit" className="btn btn-success save_changes" tabIndex="14">
            Save changes
          </button>
        </center>
        <style>{`
                .content {
                    min-height: 250px;
                    padding: 15px;
                    margin-right: auto;
                    margin-left: auto;
                    padding-left: 15px;
                    padding-right: 15px;
                }
                .input_new_type
                {
                  margin-left:-43px;
                }
                .input_width
                {
                  width:81%;
                }
                .captialCountry{
                  text-transform: capitalize
                }
                .mbn-20
                {
                  margin-bottom:-15px;
                }
                .reg_form_new {
                  background: #fff;
                  border: 1px solid #dddcdc;
                  border-radius: 5px;
                  min-height: 100%;
                  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.07);
                  margin-top: 14%;
                  margin-bottom: 3%;
                }
                .col-md-offset-3 {
                  margin-left: 25%;
                }
                .col-md-6 {
                  width: 50%;
              }
                .icon_position {
                    margin-right:8px
                }
              option.capitalCountry {
                text-transform: capitalize;
            }
              #msform {
                text-align: center;
                    position: relative;
                    width:100%;
                }
                .register_main_head {
                  font-size: 32px !important;
                  font-weight: bold !important;
                  margin: 25px auto !important;
                  color: #000 !important;
                  text-align: center !important;
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
              letter-spacing: 1px;
              text-align: left;
              margin-top: 10px;
              font-weight: bold;
              display: flex;
          }
            .fl-left {
              float: left;
            font-size: 15px;
            font-weight: 800;
          }
          label {
              display: inline-block;
              max-width: 100%;
              margin-bottom: 5px;
              font-weight: 700;
          }

        .save_changes {
            background-color: #D2232A;
            border: 1px solid #D2232A;
            margin: 25px 0px;
            text-transform: uppercase;
            font-size: 14px;
            color: #fff;
          }
        .wrapper {
          height: 50%;
          position: relative;
          overflow-x: hidden;
          overflow-y: auto;
        }
          `}</style>
      </fieldset>
    </form>
  );
}

ProfileView.propTypes = {
  t: PropTypes.func,
  profile: PropTypes.object,
  updateProfileHandler: PropTypes.func,
  handleSubmit: PropTypes.func,
  getProfileData: PropTypes.func,
  data: PropTypes.object,
  onGetShowcases: PropTypes.func,
};

export default reduxForm({ form: 'profile_form', initialValues: { country: 'India' } })(ProfileView);
