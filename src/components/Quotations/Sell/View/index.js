import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  faAngleDoubleLeft,
  faInfoCircle,
  faBuilding,
  faMicrochip,
} from '@fortawesome/free-solid-svg-icons';
import { reduxForm } from 'redux-form';
import Router, { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { getQuotationsList, getQuotationDetails, quotationStatusActionHandler } from 'containers/Quotations/actions';
import Plain from 'components/Input';
import Tables from 'components/Tables';
import BackLink from 'components/BackLink';
import BoxLayout from '../../../Box/Layout';
import H6 from 'components/H6';
import PageLoader from 'components/Loaders/PageLoader';
import TransactionModal from 'components/Transaction/Modal'
import StaticInput from 'components/Transaction/StaticInput'
import dateformat from 'utils/ftp/dateformat'

export function QuotationsSellView(props) {
  const { submitting, handleSubmit, change } = props;
  const router = useRouter();
  const [showQtyCol, setQtyCol] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({})
  const [poConverted, setPoConverted] = useState(false);
  const [rejectNote, setRejectNote] = useState(false)

  const { qt_no } = router.query;
  const qt_id = qt_no[1];
  const dispatch = useDispatch();
  var quotes = useSelector(state => state.quotes);
  var role = localStorage.getItem('ftp_role')
  var user = localStorage.getItem('current_user')

  useEffect(() => {
    if (quotes === undefined || !quotes.quotation_details || quotes.quotation_details.length <= 0) {
      dispatch(getQuotationDetails(qt_id));
    }
  });

  if (quotes !== undefined && quotes.quotation_details && Object.keys(quotes.quotation_details).length > 0) {
    var {
      id,
      products,
      created_at,
      quotation_validity,
      currency,
      note,
      project_name,
      terms,
      buyer_info,
      seller_info,
      status
    } = quotes.quotation_details;

    var rfq_date = dateformat(created_at)
    var quotation_date = dateformat(quotation_validity)

    var rowsLoop = data => (
      <ul style={{ listStyle: 'none', marginLeft: '-40px' }}>
        {data.map(d => (
          <li style={{ marginTop: '5px', marginBottom: '7px' }}>{d}</li>
        ))}
      </ul>
    );

    var create_data = [];
    products.map(p => {
      var d = {
        id: p.part_number,
        brand: p.brand,
        desc: p.description,
        part_details: p.details,
        lead_time: rowsLoop(p.details.map(pd => pd.lead_time)),
        quantity: rowsLoop(p.details.map(pd => `${pd.qty_to} - ${pd.qty_from}`)),
        moq: rowsLoop(p.details.map(pd => pd.moq)),
        unit_price: rowsLoop(p.details.map(pd => pd.unit_price)),
        remark: rowsLoop(p.details.map(pd => pd.remark)),
      };
      create_data.push(d);
    });

    const create_columns = [
      {
        name: 'Manufacturer Part No',
        selector: 'id',
        minWidth: '80px',
        sortable: true,
      },
      {
        name: 'Manufacturer',
        selector: 'brand',
        minWidth: '60px',
        sortable: true,
      },
      {
        name: 'Description',
        selector: 'desc',
        minWidth: '100px',
        sortable: true,
      },
      {
        name: 'Lead Time',
        selector: 'lead_time',
        minWidth: '20px',
        sortable: true,
      },
      {
        name: 'Unit Price',
        selector: 'unit_price',
        minWidth: '20px',
        sortable: true,
      },
      {
        name: 'Quantity',
        selector: 'quantity',
        minWidth: '20px',
        sortable: true,
      },
      {
        name: 'MOQ',
        selector: 'moq',
        minWidth: '20px',
        sortable: true,
      },
      {
        name: 'Remark',
        selector: 'remark',
        minWidth: '20px',
        sortable: true,
      },
      {
        name: 'Order Quantity',
        selector: '',
        minWidth: '20px',
        sortable: true,
        omit: showQtyCol,
        cell: row => (
          <Plain
            data={{
              type: 'text',
              name: 'quantity',
            }}
          />
        ),
      },
    ];

    const select_parts_box = {
      heading: 'Parts Details',
      icon: faMicrochip,
    };

    const box_data = {
      heading: 'Quotation Details',
      icon: faInfoCircle,
    };    

    const tx_box_data = {
      heading: 'Transacting Info',
      icon: faInfoCircle,
      compData: [
        terms.map(term=> (
          {
            title: Object.keys(term)[0],
            value: Object.values(term)[0].name
          }
        ))
      ]
    };

    const notes_data = {
      heading: 'Notes',
      icon: faInfoCircle,
    };

    const profile_data = {
      heading: 'Supplier Info',
      icon: faBuilding,
      allignment: 'vertical',
      rating: 4,
      compData: [
        {
          title: 'Company name',
          value: seller_info && seller_info.company_name ? seller_info.company_name : 'Acme Inc',
        },
        {
          title: 'Business Address',
          value: seller_info && seller_info.address_1 ? seller_info.address_1 : 'Somewhere in Singapore',
        },
        {
          title: 'Contact Name',
          value: seller_info && seller_info.user_fullname ? seller_info.user_fullname : 'John Doe',
        },
        {
          title: 'Phone Number',
          value: seller_info && seller_info.user_phone ? seller_info.user_phone : '90283793920',
        },
        {
          title: 'Email Address',
          value: seller_info && seller_info.user_email ? seller_info.user_email : 'john@doe.com',
        },
        {
          title: 'Country',
          value: seller_info && seller_info.country_name ? seller_info.country_name : 'Singapore',
        },
      ],
    };

    const buyer_profile_data = {
      heading: 'Buyer Info',
      icon: faBuilding,
      allignment: 'vertical',
      rating: 4,
      compData: [
        {
          title: 'Buyer ID',
          value: buyer_info && buyer_info.id ? buyer_info.id : 'XXXXXXX-XXXXX',
        },
        {
          title: 'Business Address',
          value: buyer_info && buyer_info.address_1 ? buyer_info.address_1 : 'Somewhere in Singapore',
        },
        {
          title: 'Phone Number',
          value: buyer_info && buyer_info.phone ? buyer_info.phone : '90283793920',
        },
        {
          title: 'Email Address',
          value: buyer_info && buyer_info.email ? buyer_info.email : 'john@doe.com',
        },
        {
          title: 'Country',
          value: buyer_info && buyer_info.country_name ? buyer_info.country_name : 'Singapore',
        },
        {
          title: 'Ship to Contact',
          value: buyer_info && buyer_info.ship_to_contact_name ? buyer_info.ship_to_contact_name : 'Mr. John Wick',
        },
        {
          title: 'Ship to Mobile',
          value: buyer_info && buyer_info.ship_to_contact_mobile ? buyer_info.ship_to_contact_mobile : '900029093123',
        },
        {
          title: 'Ship to Email',
          value: buyer_info && buyer_info.ship_to_contact_email ? buyer_info.ship_to_contact_email : 'john@rece.com',
        },
      ],
    };

    const convertInitiate = e => {
      e.preventDefault();
      setQtyCol(false);
      setPoConverted(true);

      dispatch(change('quotation_id', id));
      dispatch(change('note', note));
      dispatch(change('product_id', products[0].details[0].id));
    };

    const convertPO = e => {
      e.preventDefault();
      console.log('initiate convert to po');
    };

    dispatch(change('id', qt_id));

    const managerRejected = v => {
      if(!v) {
        dispatch(change('status', 'seller_rejected'));
        var md =  {
          title: 'Reject Quotation',
          paragraph: 'Please let your team know the reason for rejection.',
          btnColor: 'red_btn',
          btnTitle: 'Reject',
          formLabel: 'Reason for Rejection',
          formName: 'note',
        }
        setModalOpen(true)
        setModalData(md)
      }
    }

    const managerApproved = () => {
      dispatch(change('status', 'seller_approved'));
    }

    const modalAction = (open, value) => {
      setModalOpen(open)
      console.log(value)
      if(value && value === 'note') {
        setRejectNote(true)
      }
    }

    if (submitting) {
      return <PageLoader text="Submitting ..." />;
    }

    return (
      <form onSubmit={handleSubmit(quotationStatusActionHandler)}>

        <div className="row">
          <div className="col-md-6">
          <BackLink link="/quotations/sell/list" icon={faAngleDoubleLeft} value=" Back to PR-200210-12345" />

            <h4 className="create_purchase">{qt_no[0]}</h4>
          </div>
          <div className="col-md-6">
          {role === 'Procurement Manager' ? (
              <React.Fragment>
              {
                rejectNote ? 
                <button type="submit" className="btn btn-success reject_btn">
                {` Save`}
                </button>
                :
                  (
                    status.seller === 'Pending Approval' ?
                    <React.Fragment> 
                    <button type="submit" className="btn btn-success reject_btn" onClick={() => managerApproved(true)}>
                    {` Approve`}
                    </button>
                    <button type="button" className="btn btn-danger reject_btn"
                    onClick={() => managerRejected(false)}>
                      Reject
                    </button>
                    </React.Fragment>
                    : 
                    <button type="button" className="btn btn-success reject_btn" disabled>
                      {` ${status.seller}`}
                    </button>
                  )
                }
              </React.Fragment>
            ) : (
            status.buyer === 'Approved' ?
            <button type="submit" className="btn btn-success reject_btn" onClick={buyerSendRFQ}>
              {` Send RFQ`}
            </button>
            : 
            <button type="button" className="btn btn-success reject_btn">
              {` ${user === 'buyer' ? status.buyer : status.seller}`}
            </button>
            )}
        </div>
        </div>

        <div className="row">
          <div className="col-md-6 pr-0">
            <BoxLayout data={box_data}>
              <div className="row">
                <StaticInput md="12" label="Project Name" placeholder={project_name} />
                <StaticInput md="6" label="Quote Date" placeholder={rfq_date} />
                <StaticInput md="6" label="Currency" placeholder={currency} />
                <StaticInput md="6" label="Quotation Validity" placeholder={quotation_date} />
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
        </div>

        <div className="clearfix"></div>
        <div className="clearfix"></div>

        <div className="row">
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
        </div>

        <div className="row mb-25">
          <div className="col-md-12">
            <BoxLayout data={select_parts_box}>
              <Tables columns={create_columns} data={create_data} />
            </BoxLayout>
          </div>
        </div>

        <div className="clearfix"></div>
        <div className="clearfix"></div>

        <div className="row">
          <div className="col-md-4">
            <BoxLayout data={tx_box_data}>
              {tx_box_data.compData[0].map((d, i) => (
                <React.Fragment>
                  <div className="col-md-7">
                    <H6 data={d.title} />
                  </div>
                  <div className="col-md-5">
                    <p className="buyer_para"> {d.value}</p>
                  </div>
                </React.Fragment>
              ))}
            </BoxLayout>
          </div>
          <div className="col-md-8">
            <BoxLayout data={notes_data}>
              <fieldset className="padding_form">{note}</fieldset>
            </BoxLayout>
          </div>
        </div>
        <TransactionModal open={modalOpen} modaldata={modalData} modalaction={modalAction}/>
      </form>
    );
  }

  return <PageLoader text={`Fetching details for Quotation ID: ${qt_id}`} />;
}

QuotationsSellView.propTypes = {
  t: PropTypes.func,
  columns: PropTypes.object,
  data: PropTypes.object,
};

export default reduxForm({
  form: 'sell_view',
  onSubmitSuccess: (result, dispatch, props) => {
    toast.success('Reference Stored on Blockchain!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(getQuotationsList())
    Router.push('/quotations/sell/list');
  },
})(QuotationsSellView);
