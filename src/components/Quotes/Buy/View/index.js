import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { faAngleDoubleLeft, faInfoCircle, faBuilding, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import { reduxForm } from 'redux-form';
import Router, { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getRFQList, getRFQFromID, rfqStatusActionHandler } from 'containers/Quotes/actions';
import Plain from 'components/Input';
import Tables from 'components/Tables';
import BoxLayout from 'components/Box/Layout';
import BackLink from 'components/BackLink';
import TransactionModal from 'components/Transaction/Modal'
import PageLoader from 'components/Loaders/PageLoader';
import dateformat from 'utils/ftp/dateformat'
import StaticInput from 'components/Transaction/StaticInput'
import ProfileBox from 'components/Transaction/ProfileBox'

export function View(props) {
  const { handleSubmit, submitting, change } = props;

  const router = useRouter();
  const [showQtyCol, setQtyCol] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({})
  const [rejectNote, setRejectNote] = useState(false)
  
  const { rfq_no } = router.query;
  const rfq_id = rfq_no[1];
  const dispatch = useDispatch();
  var quotes = useSelector(state => state.quotes);
  useEffect(() => {
    if (!quotes || !quotes.rfq_data || quotes.length <= 0) {
console.log(rfq_id)
     
      dispatch(getRFQFromID(rfq_id));
    }
  });

  if (quotes !== undefined && quotes.rfq_data && Object.keys(quotes.rfq_data).length > 0) {
    var {
      rfq_data: { ship_to_country, currency, project_name, status, seller, products, note, terms, created_at, buyer_approved_date, ship_to_contact_name, ship_to_contact_mobile, ship_to_contact_email, ship_to: {country_id__name, address_1} },
      initial_data: {
        requester_info: { user_fullname, company_name, user_phone, user_email },
      },
    } = quotes;

    var rfq_date = buyer_approved_date ? dateformat(buyer_approved_date) : 'not approved';

    var role = localStorage.getItem('ftp_role');
    var supplier = seller[0].seller
    var create_data = [];

    products.map(p => {
      
      var fulldate = dateformat(p.eta)

      var d = {
        id: p.part_number,
        brand: p.brand,
        desc: p.description,
        quantity: p.qty ? p.qty : 'Tier Pricing',
        due_date: fulldate,
      };

      create_data.push(d);
    });

    const create_columns = [
      {
        name: 'Part No',
        selector: 'id',
        minWidth: '20px',
        sortable: true,
      },
      {
        name: 'Brand',
        selector: 'brand',
        minWidth: '20px',
        sortable: true,
      },
      {
        name: 'Description',
        selector: 'desc',
        minWidth: '280px',
        sortable: true,
      },
      {
        name: 'Quantity',
        selector: 'quantity',
        minWidth: '20px',
        sortable: true,
      },
      {
        name: 'Due Date',
        selector: 'due_date',
        minWidth: '20px',
        sortable: true,
      },
      {
        name: 'Order Quantity',
        selector: 'desc',
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

    const select_suppliers_box = {
      heading: 'Select Suppliers',
      icon: faMicrochip,
    };

    const select_parts_box = {
      heading: 'Select Parts',
      icon: faMicrochip,
    };

    const box_data = {
      heading: 'RFQ Details',
      icon: faInfoCircle,
    };

    const tx_box_data = {
      heading: 'Transacting Info',
      icon: faInfoCircle,
      compData: [
        terms.map(term=> (
          {
            title: term.type,
            value: term.name
          }
        ))
      ]
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
          value: company_name ? company_name : 'Acme Inc',
        },
        {
          title: 'Business Address',
          value: address_1 ? address_1 : 'Acme Inc',
        },
        {
          title: 'Contact Name',
          value: ship_to_contact_name ? ship_to_contact_name : 'John Doe',
        },
        {
          title: 'Phone Number',
          value: ship_to_contact_mobile ? ship_to_contact_mobile : 'Office +65-9876-8765 Mobile +65-9863-7649',
        },
        {
          title: 'Email Address',
          value: ship_to_contact_email ? ship_to_contact_email : 'James.ong@buyer-123.com',
        }
      ],
    };

    dispatch(change('id', rfq_id));

    const buyerSendRFQ = () => {
      dispatch(change('status', 'buyer_rfq_sent'))
    }

    const managerApproved = v => {
      console.log('dwasdlsakd')
      if(!v) {
        dispatch(change('status', 'buyer_rejected'));
        var md =  {
          title: 'Reject Purchase Order',
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

    const modalAction = (open, value) => {
      setModalOpen(open)
      console.log(value)
      if(value && value === 'note') {
        setRejectNote(true)
      }
    }

    if(submitting) {
      return <PageLoader text={`Submitting`} />
    }

    return (
      <form onSubmit={handleSubmit(rfqStatusActionHandler)}>
        <div className="row">
          <div className="col-md-6">
            <BackLink link="/rfq/buy/list" icon={faAngleDoubleLeft} value=" Back to PR-200210-12345" />
            <h4 className="create_purchase ">{rfq_no[0]}</h4>
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
                (status.buyer === 'Approved' ?
                <button type="button" className="btn btn-success reject_btn" disabled>
                {` ${status.buyer}`}
                </button>
                :
                <React.Fragment>            
                <button type="submit" className="btn btn-success reject_btn">
                {` Approve`}
                </button>
                <button type="button" className="btn btn-danger reject_btn"
                onClick={() => managerApproved(false)}>
                  Reject
                </button>
                </React.Fragment>
                )
              }
              </React.Fragment>
            ) : (
            status.buyer === 'Approved' ?
            <button type="submit" className="btn btn-success reject_btn" onClick={buyerSendRFQ}>
              {` Send RFQ`}
            </button>
            : 
            <button type="button" className="btn btn-success reject_btn" disabled>
            {` ${status.buyer}`}
            </button>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 pr-0">
            <BoxLayout data={box_data}>
              <div className="row">
                <StaticInput md="12" label="Project Name" placeholder={project_name} />
                <StaticInput md="6" label="RFQ Date" placeholder={rfq_date} />
                <StaticInput md="6" label="Currency" placeholder={currency} />
                <StaticInput md="6" label="Ship to Country" placeholder={ship_to_country} />
                <StaticInput md="12" label="Ship to Address" placeholder={address_1} />
              </div>
            </BoxLayout>
          </div>

          <ProfileBox md="6" boxData={profile_data} data={profile_data.compData} />
        </div>

        <div className="clearfix"></div>
        <div className="clearfix"></div>

        <div className="row mb-25">
          <div className="col-md-12">
            <BoxLayout data={select_suppliers_box}>
              <StaticInput md="4" label="Supplier Name" placeholder={supplier} />
            </BoxLayout>

            <BoxLayout data={select_parts_box}>
              <Tables columns={create_columns} data={create_data} />
            </BoxLayout>
          </div>
        </div>

        <div className="clearfix"></div>
        <div className="clearfix"></div>

        <div className="row">
        <ProfileBox md="4" md1="7" md2="5" boxData={tx_box_data} data={tx_box_data.compData[0]} />

          <div className="col-md-8">
            <BoxLayout data={notes_data}>
              <fieldset className="padding_form">
                {note}
              </fieldset>
            </BoxLayout>
          </div>
        </div>
        <TransactionModal open={modalOpen} modaldata={modalData} modalaction={modalAction}/>
      </form>
    );
  }

  return <PageLoader text={`Fetching details for RFQ ID: ${rfq_id}`} />;
}

View.propTypes = {
  t: PropTypes.func,
  columns: PropTypes.object,
  data: PropTypes.object,
};

export default reduxForm({ 
  form: 'view_rfq',
  onSubmitSuccess: (result, dispatch, props) => {
    dispatch(getRFQList())
    Router.push('/rfq/buy/list');
  },
  onSubmitFail: (errors, dispatch, submitError, props) => {
    if (submitError) {
      console.log('submitError: ', submitError);
    }
  },
})(View);
