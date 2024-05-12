import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faInfoCircle,
  faBuilding,
  faMicrochip,
  faTimes,
  faPlusCircle,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { reduxForm } from "redux-form";
import Router, { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import StaticInput from 'components/Transaction/StaticInput'

import {
  getRFQList,
  getRFQFromID,
  createQuotationSeller,
  rfqStatusActionHandler,
} from "containers/Quotes/actions";
import Plain from "components/Input";
import BoxLayout from "components/Box/Layout";
import BackLink from 'components/BackLink';
import H6 from "components/H6";
import PageLoader from "components/Loaders/PageLoader";

export function SellView(props) {
  const { submitting, handleSubmit, change } = props;
  const router = useRouter();
  const { rfq_no } = router.query;
  const rfq_id = rfq_no[1];
  const dispatch = useDispatch();
  var quotes = useSelector((state) => state.quotes);
  const [showQtyCol, setQtyCol] = useState(true);
  const [poConverted, setPoConverted] = useState(false);
  const [reject, setSellerReject] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (
      quotes === undefined ||
      !quotes.rfq_data ||
      quotes.rfq_data.length <= 0
    ) {
      dispatch(getRFQFromID(rfq_id));
    }
  });

  const handleAddRow = idx => {
    var crows = [...rows]
    var values = Object.values(crows[0][idx])[0]
    var product_key = Object.keys(crows[0][idx])[0]

    const item2 = {
      lead_time: `${product_key}_lead_time_${values.length + 1}`,
      unit_price: `${product_key}_unit_price_${values.length + 1}`,
      quantity: `${product_key}_quantity_${values.length + 1}`,
      product: values[0].product,
      moq: `${product_key}_moq_${values.length + 1}`,
      remark: `${product_key}_remark_${values.length + 1}`,
    };
    Object.values(crows[0][idx])[0].push(item2)
    setRows(crows)
  };

  const handleRemoveSpecificRow = (idx) => async () => {
    var crows = [...rows];
    var values = Object.values(crows[0][idx])[0]
    values.splice(idx, 1);
    setRows(crows);
  };

  if (
    quotes !== undefined &&
    quotes.rfq_data &&
    Object.keys(quotes.rfq_data).length > 0
  ) {
    var {
      currency,
      project_name,
      ship_to,
      status,
      seller,
      products,
      note,
      created_at,
      buyer_approved_date,
      id,
      terms,
      ship_to_contact_name,
      ship_to_contact_mobile,
      ship_to_contact_email,
      ship_to: { address_1 },
      ship_to_country,
    } = quotes.rfq_data;

    var { address_2, buyer } = quotes.rfq_data.buyer_info[0]

    var obj = [];
    products.map((product, key) => {
      obj.push({
        [product.id]: [
          {
            product: product,
            lead_time: `${product.id}_lead_time_1`,
            unit_price: `${product.id}_unit_price_1`,
            quantity: `${product.id}_quantity_1`,
            moq: `${product.id}_moq_1`,
            remark: `${product.id}_remark_1`,
          },
        ],
      });
      if (products.length === key + 1 && rows.length !== products.length) {
        setRows((rows) => [...rows, obj]);
      }
    });

    seller = seller[0];
    var currency_id = quotes.initial_data.currency_list.map((c) =>
      c.symbol === currency ? c.id : false
    );
    var post_terms = [];
    terms.map((term) => post_terms.push(term.id));

    var dd = buyer_approved_date ? new Date(buyer_approved_date) : null;
    var date = dd ? `${dd.getUTCFullYear()}-${String(dd.getUTCMonth() + 1).padStart(2, '0')}-${String(
      dd.getUTCDate()
    ).padStart(2, '0')}` : '';

    var create_data = [];
    products.map((p) => {
      var d = {
        id: p.part_number,
        brand: p.brand,
        desc: p.description,
        quantity: p.qty,
        due_date: p.eta,
      };

      create_data.push(d);
    });

    const select_parts_box = {
      heading: "Parts Details",
      icon: faMicrochip,
    };

    const box_data = {
      heading: "Quote Details",
      icon: faInfoCircle,
    };

    const tx_box_data = {
      heading: 'Transacting Info',
      icon: faInfoCircle,
      compData: [
        {
          title: 'Payment Term',
          value: terms[0] && terms[0].name && terms[0].name ? terms[0].name : 'XXXXXXX-XXXXX',
        },
        {
          title: 'Conveyance',
          value: terms[1] && terms[1].name && terms[1].name ? terms[1].name : 'XXXXXXX-XXXXX',
        },
        {
          title: 'Incoterm',
          value: terms[2] && terms[2].name && terms[2].name ? terms[2].name : 'XXXXXXX-XXXXX',
        },
        {
          title: 'Shipping',
          value: terms[0] && terms[0].name && terms[0].name ? terms[0].name : 'XXXXXXX-XXXXX',
        },
      ],
    };

    const notes_data = {
      heading: "Notes",
      icon: faInfoCircle,
    };

    const buyer_profile_data = {
      heading: "Buyer Info",
      rating: 3,
      icon: faBuilding,
      allignment: "vertical",
      compData: [
        {
          title: "Company name",
          value: buyer ? buyer : "Acme Inc",
        },
        {
          title: "Business Address",
          value: address_1 && address_2 ? address_1 + ' ' + address_2 : 'Singapore Road, Highway, Block',
        },
        {
          title: "Contact Name",
          value:
            ship_to_contact_name
              ? ship_to_contact_name
              : "John Doe",
        },
        {
          title: "Phone Number",
          value:
          ship_to_contact_mobile ? ship_to_contact_mobile
              : "9092398348",
        },
        {
          title: "Email Address",
          value:
          ship_to_contact_email ? ship_to_contact_email
              : "john@doe.com",
        },
      ],
    };

    const convertInitiate = (e) => {
      e.preventDefault();

      setQtyCol(false);
      setPoConverted(true);
    };

    const convertPO = (e) => {
      e.preventDefault();
    };

    const profile_data = {
      heading: "Supplier Info",
      rating: 4,
      icon: faBuilding,
      allignment: "vertical",
      compData: [
        {
          title: "Company name",
          value: seller && seller.seller ? seller.seller : "Acme Inc",
        },
        {
          title: "Business Address",
          value:
            seller && seller.address_1
              ? seller.address_1
              : "Somewhere in Singapore",
        },
        {
          title: "Contact Name",
          value: "James Ong",
        },
        {
          title: "Phone Number",
          value: "Office +65-9876-8765 Mobile +65-9863-7649",
        },
        {
          title: "Email Address",
          value: "James.ong@buyer-123.com",
        },
        {
          title: "Country",
          value: seller && seller.country ? seller.country : "Singapore",
        },
      ],
    };

    const onChange = () => {
      dispatch(change("ship_to", ship_to));
      dispatch(change("note", note));
      dispatch(change("rfq_id", id));
      dispatch(change("currency_id", currency_id[0]));
      dispatch(change("terms", post_terms));
      dispatch(change("products", products));
      dispatch(change("quotation_validity", created_at));
    };
    if (submitting) {
      toast.success('Reference Stored on Blockchain!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return <PageLoader text="Creating Quotation ..." />;
    }

    const sellerRejectAction = () => {
      setSellerReject(true);
      dispatch(change("id", rfq_id));
      dispatch(change("status", "seller_rejected"));
    };

    return (
      <form
        onSubmit={handleSubmit(
          reject ? rfqStatusActionHandler : createQuotationSeller
        )}
      >
        <div className="row">
          <div className="col-md-6">
          <BackLink link="/rfq/sell/list" icon={faAngleDoubleLeft} value=" Back to PR-200210-12345" />
          <h4 className="create_purchase">{rfq_no[0]}</h4>
          </div>

          <div className="col-md-6">
            {poConverted ? (
              <React.Fragment>
                <button type="submit" className="btn btn-danger reject_btn">
                  {` Save`}
                </button>
              </React.Fragment>
            ) : status.seller === "Converted To Quotation" ? (
              <button
                type="button"
                className="btn btn-success reject_btn"
                disabled
              >
                {` ${status.seller}`}
              </button>
            ) : (
              <React.Fragment>
                <button
                  type="button"
                  className="btn btn-success purchase_save"
                  onClick={showQtyCol ? convertInitiate : convertPO}
                >
                  {status ? "CONVERT TO QUOTATION" : "STATUS"}
                </button>

                <button
                  type="submit"
                  className="btn btn-danger reject_btn"
                  onClick={sellerRejectAction}
                >
                  <FontAwesomeIcon icon={faTimes} width="16" />
                  {` Reject`}
                </button>
              </React.Fragment>
            )}
          </div>

          <div className="col-md-6 pr-0">
            <BoxLayout data={box_data}>
              <div className="row">
                <StaticInput md="12" label="Project Name" placeholder={project_name} />
                <StaticInput md="6" label="RFQ Date" placeholder={date} />
                <StaticInput md="6" label="Currency" placeholder={currency} />
                <StaticInput md="12" label="Ship to Country" placeholder={ship_to_country} />
                <StaticInput md="12" label="Ship to Address" placeholder={address_1} />
              </div>
            </BoxLayout>
          </div>

          <div className="col-md-6">
            <BoxLayout data={profile_data}>
              {profile_data.compData.map((d, i) => (
                <React.Fragment>
                  <div className="col-md-4">
                    <H6 data={d.title} />
                  </div>
                  <div className="col-md-8">
                    <p className="buyer_para"> {d.value}</p>
                  </div>
                </React.Fragment>
              ))}
            </BoxLayout>
          </div>

          <div className="col-md-12">
            <BoxLayout data={buyer_profile_data}>
              {buyer_profile_data.compData.map((d, i) => (
                <React.Fragment>
                  <div className="col-md-4">
                    <H6 data={d.title} />
                  </div>
                  <div className="col-md-8">
                    <p className="buyer_para"> {d.value}</p>
                  </div>
                </React.Fragment>
              ))}
            </BoxLayout>
          </div>

          <div className="clearfix"></div>

          <div className="col-md-12">
            <BoxLayout data={select_parts_box}>
              <div class="table-responsive">
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Manufacturer Part No</th>
                      <th>Manufacturer</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Due Date</th>
                      {poConverted ? (
                        <React.Fragment>
                          <th>Lead Time (weeks)</th>
                          <th>Unit Price</th>
                          <th>Quantity</th>
                          <th>MOQ</th>
                          <th>Remark</th>
                          <th />
                        </React.Fragment>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {rows && rows[0] && rows[0].length > 0
                      ? rows[0].map((item, idx) => (
                          
                          <tr key={idx}>
                            <td>
                              {Object.values(item)[0].map(
                                (obj, i) => i === 0 ? obj.product.part_number : ''
                              )}
                            </td>
                            <td>
                              {Object.values(item)[0].map(
                                (obj, i) => i === 0 ? obj.product.seller : ''
                              )}
                            </td>
                            <td>
                              {Object.values(item)[0].map(
                                (obj, i) => i === 0 ? obj.product.description : ''
                              )}
                            </td>
                            <td>
                              {Object.values(item)[0].map(
                                (obj, i) => i === 0 ? (obj.product.qty ? obj.product.qty : 'Tier Pricing') : ''
                              )}
                            </td>
                            <td>
                              {Object.values(item)[0].map(
                                (obj, i) => i === 0 && obj.product.eta ? `${new Date(obj.product.eta).getUTCFullYear()}-${String(new Date(obj.product.eta).getUTCMonth() + 1).padStart(2, '0')}-${String(
                                  new Date(obj.product.eta).getUTCDate()
                                ).padStart(2, '0')}` : ''
                              )}
                            </td>

                            {poConverted ? (
                              <React.Fragment>
                                <td>
                                  <ul className="table-ul">
                                    {Object.values(item).map((obj) =>
                                      obj.map((ob) => (
                                        <li>
                                          <Plain
                                            data={{
                                              type: "text",
                                              name: ob.lead_time,
                                              validate: ['rangeFormat']
                                            }}
                                          />
                                        </li>
                                      ))
                                    )}
                                  </ul>
                                </td>

                                <td>
                                  <ul className="table-ul">
                                    {Object.values(item).map((obj) =>
                                      obj.map((ob) => (
                                        <li>
                                          <Plain
                                            data={{
                                              type: "text",
                                              name: ob.unit_price,
                                            }}
                                          />
                                        </li>
                                      ))
                                    )}
                                  </ul>
                                </td>

                                <td>
                                  <ul className="table-ul">
                                    {Object.values(item).map((obj) =>
                                      obj.map((ob) => (
                                        <li>
                                          <Plain
                                            data={{
                                              type: "text",
                                              name: ob.quantity,
                                            }}
                                          />
                                        </li>
                                      ))
                                    )}
                                  </ul>
                                </td>

                                <td>
                                  <ul className="table-ul">
                                    {Object.values(item).map((obj) =>
                                      obj.map((ob) => (
                                        <li>
                                          <Plain
                                            data={{
                                              type: "text",
                                              name: ob.moq,
                                            }}
                                          />
                                        </li>
                                      ))
                                    )}
                                  </ul>
                                </td>

                                <td>
                                  <ul className="table-ul">
                                    {Object.values(item).map((obj) =>
                                      obj.map((ob) => (
                                        <li>
                                          <Plain
                                            data={{
                                              type: "text",
                                              name: ob.remark,
                                            }}
                                          />
                                        </li>
                                      ))
                                    )}
                                  </ul>
                                </td>

                                <td>
                                  <React.Fragment>
                                    <button
                                      type="button"
                                      className="btn btn-success"
                                      style={{marginBottom: '7px'}}
                                      onClick={()=>handleAddRow(idx)}
                                    >
                                      <FontAwesomeIcon
                                        icon={faPlusCircle}
                                        width="12"
                                      />
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={handleRemoveSpecificRow(idx)}
                                    >
                                      <FontAwesomeIcon
                                        icon={faMinusCircle}
                                        width="12"
                                      />
                                    </button>
                                  </React.Fragment>
                                </td>
                              </React.Fragment>
                            ) : null}
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </table>
              </div>
            </BoxLayout>
          </div>

          <div className="clearfix"></div>
          <div className="clearfix"></div>

          <div className="col-md-4">
            <BoxLayout data={tx_box_data}>
              <div className="col-md-6" style={{marginTop: '10px'}}>
                <H6 data="Additional VAT" />
              </div>
              <div className="col-md-6">
                <Plain
                  data={{
                    label: "",
                    type: "text",
                    name: "vat",
                    id: "vat",
                    onChange: onChange,
                  }}
                />
              </div>
              {tx_box_data.compData.map((d, i) => (
                <React.Fragment>
                  <div className="col-md-6">
                    <H6 data={d.title} />
                  </div>
                  <div className="col-md-6">
                    <p className="buyer_para"> {d.value}</p>
                  </div>
                </React.Fragment>
              ))}
            </BoxLayout>
          </div>
          <div className="col-md-8">
            <BoxLayout data={notes_data}>
              <fieldset className="padding_form">
                {note}
              </fieldset>
            </BoxLayout>
          </div>
        </div>
      </form>
    );
  }

  return <PageLoader text={`Fetching details for RFQ ID: ${rfq_id}`} />;
}

SellView.propTypes = {
  t: PropTypes.func,
  columns: PropTypes.object,
  data: PropTypes.object,
};

export default reduxForm({
  form: "seller_rfq",
  onSubmitSuccess: (result, dispatch, props) => {
    dispatch(getRFQList());
    Router.push("/rfq/sell/list");
  },
})(SellView);
