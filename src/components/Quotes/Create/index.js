import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { useDispatch } from 'react-redux';
import { faAngleDoubleLeft, faInfoCircle, faBuilding, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import PageLoader from 'components/Loaders/PageLoader';
import Plain from 'components/Input';
import SearchInput from 'components/Input/SearchInput';
import BackLink from 'components/BackLink';
import H6 from 'components/H6';
import BoxLayout from 'components/Box/Layout';
import axios from 'axios';
import Router from 'next/router';
import MyDocument from '/pages/_document';
import { InputGroup, InputGroupText } from 'reactstrap';

import { toast } from 'react-toastify';

import { getRFQList } from 'containers/Quotes/actions';

let isHealthCategoryProduct = false;
export function Create(props) {
  const { initialData, createRFQHandler, handleSubmit, submitting, pristine, change, suppliers } = props;

  const [rows, setRows] = useState([
    {
      part_name: `part_no_1`,
      supplier_name: `supplier_1`,
      brand: `brand_1`,
      desc: `desc_1`,
      is_tier: `is_tier_1`,
      quantity: `quantity_1`,
    },
  ]);

  const [brand, setBrand] = useState([]);
  const [desc, setDesc] = useState([]);
  const [parts, setParts] = useState([]);
  const [defaultPart, setDefaultPart] = useState('');
  const [supplierParts, setSupplierParts] = useState([]);
  const [supplierName, setCurrentSupplier] = useState('');
  const [isTierPrice, setTierPrice] = useState([false]);
  const [prevProject, setPrevProject] = useState(false);
  const [countryData, setCountriesData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [phonePrefix, setPhonePrefix] = useState('+91');

  var suggestions = [];
  suppliers.map(sup => sup.id === suggestions.push({ value: sup.id, label: sup.name, description: sup.description }));
  suggestions = [...new Map(suggestions.map(item => [item['label'], item])).values()];

  const dispatch = useDispatch();
  var { requester_info, projects, country_list, ship_address, currency_list, term_list } = initialData.initial_data;

  useEffect(() => {
    Object.keys(Router.query).length > 0 && Router.query.supp_id ? onSupplierChange(Router.query.supp_id) : '';
    var country = [];
    var countries_data = [];
    var optionarray = [];

    Object.values(country_list).map(a =>
      a.map(ai => {
        country.push(ai.name);
        countries_data.push(ai);
      })
    );

    setCountriesData(countries_data);

    country.filter((item, index) => {
      if (country != '' && item == country) {
        optionarray.push(
          <option key={index} value={item.toLowerCase()} selected className="capitalCountry">
            {item.toLowerCase()}
          </option>
        );
      } else {
        optionarray.push(
          Object.keys(country_list).map((k, cntl) => (
            <optgroup label={k} key={cntl}>
              {country_list[k].map((co, index) => (
                <option key={index} value={co.id} className="capitalCountry">
                  {co.name}
                </option>
              ))}
            </optgroup>
          ))
        );
      }
    });
    setCountries(optionarray[0]);
  }, []);

  const onSupplierChange = v => {
    let url;

    if (v.value) {
      dispatch(change('supplier_id', v.value));
      url = `https://ftp-api.hellosme.com/api/products/?search=&seller_id=${v.value}`;
    } else {
      dispatch(change('supplier_id', v));
      url = `https://ftp-api.hellosme.com/api/products/?search=&seller_id=${v}`;
    }

    setCurrentSupplier(v.desc);
    axios.get(url).then(parts => {
      if (parts && parts.data && parts.data.success.data && parts.data.success.data.search_result) {
        var seller_parts = parts.data.success.data.search_result;
        var partsArray = [];
        var allPartsDetails = [];

        Object.keys(seller_parts).map(part => {
          Object.keys(seller_parts[part]).map(pl => {
            var singlePart = seller_parts[part][pl];
            singlePart.map(sp => {
              if (sp.id == Router.query.part_id) {
                setDefaultPart(sp.part_number);
              }
              allPartsDetails.push(sp);
              partsArray.push({ value: sp.id, name: sp.part_number });
            });
          });
        });
        setSupplierParts(allPartsDetails);
        if (Router.query && Object.keys(Router.query).length > 0 && Router.query.part_id) {
          partsChange(0, Router.query.part_id, allPartsDetails);
        }
        setParts(partsArray);
      }
    });
  };

  const partsChange = (idx, e, allPartsDetails) => {
    const supplierPartsDetail = allPartsDetails.length > 0 ? allPartsDetails : supplierParts;
    supplierPartsDetail.map(sp => {
      var val =
        e != undefined && Object.keys(e).length > 0 && e.target != undefined && e.target.value ? e.target.value : e;

      if (sp.id === val) {
        sp.category != 'Integrated Circuits' ? (isHealthCategoryProduct = true) : (isHealthCategoryProduct = false);
        brand.splice(idx, 1);
        desc.splice(idx, 1);
        setBrand([...brand, sp.brand]);
        setDesc([...desc, sp.description]);
      }
    });
  };

  const tierPricingChange = idx => () => {
    isTierPrice[idx] = !isTierPrice[idx];
    var itp = false;
    setTierPrice(isTierPrice => [...isTierPrice, itp]);
  };

  const handleAddRow = () => {
    const item = {
      part_name: `part_no_${rows.length + 1}`,
      supplier_name: `supplier_${rows.length + 1}`,
      brand: `brand_${rows.length + 1}`,
      desc: `desc_${rows.length + 1}`,
      is_tier: `is_tier_${rows.length + 1}`,
      quantity: `quantity_${rows.length + 1}`,
    };
    setRows(rows => [...rows, item]);
    setTierPrice(isTierPrice => [...isTierPrice, false]);
  };

  const handleRemoveSpecificRow = idx => async () => {
    var crows = [...rows];
    crows.splice(idx, 1);
    var itp = [...isTierPrice];
    itp.splice(idx, 1);
    setRows(crows);
    setTierPrice(itp);
  };

  const handleCountryChange = e => {
    const { value, type } = e.target
    if (type === 'select-one') {
      countryData.filter(country => {
        if (country.id === value) {
          dispatch(change('ship_to_country', value));
          setPhonePrefix(country.phone_prefix);
        }
      });
    } else {
      true;
    }
  };

  ship_address = ship_address.map(c => ({ name: c.address_1, value: c.id }));
  currency_list = currency_list.map(c => ({ value: c.id, name: c.symbol }));

  console.log('TERMS=>', term_list)

  const termsRender = {
    conveyance: [
      {
        value: '63d5ab28-8a97-474e-ac15-3a9f9bb6ea7b',
        name: 'Air',
      },
    ],
    incoterm: [
      {
        value: '4195a8f6-a600-455f-b242-cc39a6a95fa2',
        name: 'CIF',
      },
    ],
    payment_term: [
      {
        value: 'a75af402-93d7-4679-aa37-cf70ec5b569d',
        name: 'PIA',
      },
    ],
    shipping: [
      {
        value: 'f517c4ab-3cc9-4a7f-a647-c0e87758f1b3',
        name: 'DSL',
      },
    ],
  };

  const onChange = () => true;
  const handleChange = () => true;

  const box_data = {
    heading: 'RFQ Details',
    icon: faInfoCircle,
  };

  const select_suppliers_box = {
    heading: 'Select Suppliers',
    icon: faMicrochip,
  };

  const select_parts_box = {
    heading: 'Select Parts',
    icon: faMicrochip,
  };

  const tx_box_data = {
    heading: 'Transaction Info',
    icon: faInfoCircle,
  };

  const notes_data = {
    heading: 'Notes',
    icon: faInfoCircle,
  };

  const profile_data = {
    heading: 'Buyer Info',
    icon: faBuilding,
    allignment: 'vertical',
    compData: [
      {
        title: 'Company name',
        value: requester_info.company_name,
      },
      {
        title: 'Business Address',
        value: '168, Factory Road, Depot Heights 181588 Singapore',
      },
      {
        title: 'Contact Name',
        value: requester_info.user_fullname,
      },
      {
        title: 'Phone Number',
        value: requester_info.user_phone,
      },
      {
        title: 'Email Address',
        value: requester_info.user_email,
      },
    ],
  };

  const handleProjectChange = e =>
    e.target.value && e.target.value.length > 0 ? setPrevProject(e.target.value) : setPrevProject(false);

  if (submitting) {
    return <PageLoader text="Creating RFQ ..." />;
  }

  const instance = new MyDocument();
  instance.TawkToinit('5eb93ff18ee2956d73a00191');

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(createRFQHandler)}>
        <div className="row">
          <div className="col-md-6">
            <BackLink link="/rfq/buy/list" icon={faAngleDoubleLeft} value=" Back" />
            <h4 className="create_purchase ">Create RFQ</h4>
          </div>
          <div className="col-md-6">
              <button type="submit" className="btn btn-success purchase_save">
                Save
              </button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 pr-0">
            <BoxLayout data={box_data}>
              <div className="row">
                <div className="col-md-12">
                  {projects && projects.length > 0 && !prevProject ? (
                    <React.Fragment>
                      <Plain
                        data={{
                          label: 'Select from existing projects',
                          name: 'project_name',
                          dropdownData: projects,
                          type: 'dropdown',
                          onChange: handleProjectChange,
                        }}
                      />

                      <p className="create_head">Create a new project</p>
                      <hr />
                    </React.Fragment>
                  ) : (
                    ''
                  )}

                  <Plain
                    data={{
                      label: 'Project Name',
                      type: 'text',
                      value: prevProject,
                      name: 'project_name',
                      id: 'project_name',
                      placeholder: prevProject,
                      validate: [],
                      onChange: handleProjectChange,
                    }}
                  />
                </div>

                <div className="col-md-12">
                  <Plain
                    data={{
                      label: 'Currency',
                      name: 'currency_id',
                      dropdownData: currency_list,
                      onChange: handleChange,
                      type: 'dropdown',
                      validate: ['required'],
                    }}
                  />
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="email" className="fl-left">
                      Ship to Country
                    </label>
                    <select
                      className="form-control select2"
                      id="ship_to_country"
                      name="ship_to_country"
                      onChange={handleCountryChange}
                      tabIndex="6"
                      required>
                      <option value="default">Select Country</option>

                      {countries}
                    </select>
                  </div>
                </div>

                <div className="col-md-12">
                  <Plain
                    data={{
                      label: 'Ship to Address',
                      name: 'ship_to',
                      dropdownData: ship_address,
                      type: 'dropdown',
                      validate: ['required'],
                    }}
                  />
                </div>
              </div>
            </BoxLayout>
          </div>
          <div className="col-md-6">
            <BoxLayout data={profile_data}>
              {profile_data.compData.map((d, i) => (
                <React.Fragment key={i}>
                  <div className="col-md-4">
                    <H6 data={d.title} />
                  </div>
                  <div className="col-md-8">
                    <p className="buyer_para"> {d.value}</p>
                  </div>
                </React.Fragment>
              ))}
              <div className="col-md-12">
                <Plain
                  data={{
                    label: 'Ship to Email',
                    type: 'email',
                    name: 'ship_to_contact_email',
                    id: 'ship_to_contact_email',
                    validate: ['email', 'required'],
                    placeholder: '',
                    onChange: onChange,
                  }}
                />
              </div>

              <div className="col-md-12">
                <InputGroup size="lg">
                  <InputGroupText
                    style={{
                      fontSize: '12px !important',
                      borderRadius: '4px 0 0 4px',
                      width: '45px',
                      height: '33px',
                      marginTop: '31px',
                      position: 'absolute',
                    }}
                    className="phonecode">
                    {phonePrefix}
                  </InputGroupText>
                  <Plain
                    data={{
                      label: 'Ship to Mobile',
                      position: 'fullw',
                      inputClass: 'mgl15',
                      type: 'number',
                      name: 'ship_to_contact_mobile',
                      id: 'ship_to_contact_mobile',
                      validate: ['required', 'phoneNumber'],
                      placeholder: '',
                      onChange: onChange,
                    }}
                  />
                </InputGroup>

              </div>

              <div className="col-md-12">
                <Plain
                  data={{
                    label: 'Ship to Name',
                    type: 'text',
                    name: 'ship_to_contact_name',
                    id: 'ship_to_contact_name',
                    validate: ['required'],
                    placeholder: '',
                    onChange: onChange,
                  }}
                />
              </div>
            </BoxLayout>
          </div>
        </div>

        <div className="clearfix"></div>
        <div className="clearfix"></div>

        <div className="row mb-25">
          <div className="col-md-12">
            <BoxLayout data={select_suppliers_box}>
              <div className="col-md-4">
                <SearchInput
                  label=""
                  onSupplierChange={onSupplierChange}
                  name="supplier_name"
                  suggestions={suggestions}
                />
              </div>
              <div className="col-md-6">{supplierName}</div>
            </BoxLayout>

            <BoxLayout data={select_parts_box}>
              <div className="table-responsive">
                <table id="example1" className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Part No</th>
                      <th>Brand</th>
                      <th>Description</th>
                      <th>Tier Pricing</th>
                      <th>Quantity</th>
                      <th>Due Date</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length > 0
                      ? rows.map((item, idx) => (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>
                              <Plain
                                data={{
                                  label: '',
                                  name: item.part_name,
                                  dropdownData:
                                    parts && parts.length > 0
                                      ? parts
                                      : [{ value: 'PRODUCT-ID-XYZ', name: 'PRODUCT-ID-XYZ' }],
                                  defaultOption: defaultPart,
                                  onChange: e => partsChange(idx, e, []),
                                  type: 'dropdown',
                                  validate:
                                    Object.keys(Router.query).length > 0 && Router.query.supp_id ? [] : ['required'],
                                }}
                              />
                            </td>
                            <td>{brand[idx] ? brand[idx] : 'Brand Details'}</td>
                            <td>
                              <p className="mb-0">
                                {desc[idx] ? desc[idx] : 'Selected products details will be shown here'}
                              </p>
                            </td>
                            <td>
                              <Plain
                                data={{
                                  label: '',
                                  type: 'checkbox',
                                  name: item.is_tier,
                                  id: item.is_tier,
                                  dynamicClass: 'fl-left',
                                  position: 'check-radio-position',
                                  onChange: tierPricingChange(idx),
                                }}
                              />
                            </td>
                            <td>
                              {isTierPrice[idx] ? (
                                'Tier Price'
                              ) : (
                                <Plain
                                  data={{
                                    label: '',
                                    type: 'number',
                                    name: item.quantity,
                                    id: item.quantity,
                                    placeholder: '1000',
                                    validate: ['required'],
                                    onChange: onChange,
                                  }}
                                />
                              )}
                            </td>
                            <td>
                              <Plain
                                data={{
                                  label: '',
                                  type: 'date',
                                  name: 'due_date',
                                  id: 'due_date',
                                  placeholder: '',
                                  validate: ['required'],
                                  onChange: onChange,
                                }}
                              />
                            </td>
                            <td>
                              <button
                                className="btn btn-outline-danger btn-sm"
                                type="button"
                                onClick={handleRemoveSpecificRow(idx)}>
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))
                      : ''}
                  </tbody>
                </table>
                <button type="button" onClick={handleAddRow} className="btn btn-success btn-sm">
                  Add Products
                </button>
              </div>
            </BoxLayout>
          </div>
        </div>

        <div className="clearfix"></div>
        <div className="clearfix"></div>

        <div className="row">
          <div className="col-md-4">
            <BoxLayout data={tx_box_data}>
              <div className="check_trans">
                <p className="tick_info">To tick the check boxes below for more info:</p>

                <Plain
                  data={{
                    label: 'Conveyance',
                    name: 'conveyance',
                    dropdownData: termsRender.conveyance,
                    type: 'dropdown',
                    validate: ['required'],
                  }}
                />

                <Plain
                  data={{
                    label: 'Incoterm',
                    name: 'incoterm',
                    dropdownData: termsRender.incoterm,
                    type: 'dropdown',
                    validate: ['required'],
                  }}
                />

                <Plain
                  data={{
                    label: 'Payment Term',
                    name: 'payment_term',
                    dropdownData: termsRender.payment_term,
                    type: 'dropdown',
                    validate: ['required'],
                  }}
                />

                <Plain
                  data={{
                    label: 'Shipping',
                    name: 'shipping',
                    dropdownData: termsRender.shipping,
                    type: 'dropdown',
                    validate: ['required'],
                  }}
                />
              </div>
            </BoxLayout>
          </div>
          <div className="col-md-8">
            <BoxLayout data={notes_data}>
              <fieldset className="padding_form">
                <Plain
                  data={{
                    label: '',
                    name: 'note',
                    type: 'textarea',
                    validate: ['required'],
                  }}
                />
              </fieldset>
            </BoxLayout>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}

Create.propTypes = {
  t: PropTypes.func,
  getProfileData: PropTypes.func,
  columns: PropTypes.object,
  data: PropTypes.object,
  onGetShowcases: PropTypes.func,
  initialData: PropTypes.object,
  createRFQHandler: PropTypes.func,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  change: PropTypes.func,
  suppliers: PropTypes.object,
};

export default reduxForm({
  form: 'create_rfq',
  onSubmitSuccess: (result, dispatch) => {
    toast.success('Reference Stored on Blockchain!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(getRFQList());
    isHealthCategoryProduct ? Router.push('/rfq/buy/thankyou') : Router.push('/rfq/buy/list');
  },
  onSubmitFail: (errors, dispatch, submitError) => {
    if (submitError) {
      console.log('submitError: ', submitError);
    }
  },
})(Create);
