import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  faAngleDoubleLeft,
  faInfoCircle,
  faBuilding,
  faMicrochip,
} from '@fortawesome/free-solid-svg-icons';
import { reduxForm } from 'redux-form';
import { toast } from 'react-toastify';

import Router, { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getPOList, getPOView, poStatusActionHandler } from 'containers/PO/actions';
import Plain from 'components/Input';
import Tables from 'components/Tables';
import BackLink from 'components/BackLink';
import BoxLayout from 'components/Box/Layout';
import H6 from 'components/H6';
import PageLoader from 'components/Loaders/PageLoader';
import StaticInput from 'components/Transaction/StaticInput';
import TransactionModal from 'components/Transaction/Modal'
import ProfileBox from 'components/Transaction/ProfileBox'
import dateformat from 'utils/ftp/dateformat'

export function POView(props) {
  const { submitting, handleSubmit, change } = props;
  const router = useRouter();
  const [showQtyCol, setQtyCol] = useState(true);
  const [poConverted, setPoConverted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({})
  const [rejectNote, setRejectNote] = useState(false)

  const { po_no } = router.query;
  const po_id = po_no[1];
  const dispatch = useDispatch();
  var po = useSelector(state => state.po);

  useEffect(() => {
    if (po === undefined || !po.po_view || po.po_view.length <= 0) {
      dispatch(getPOView(po_id));
    }
  });

  if (po !== undefined && po.po_view && Object.keys(po.po_view).length > 0) {
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
      calculation,
      status
    } = po.po_view;

    var role = localStorage.getItem('ftp_role')

    var rfq_date = dateformat(created_at)
    quotation_validity = dateformat(quotation_validity)

    const calculation_data = {
      heading: '',
      icon: faInfoCircle,
      compData: [
        {
          title: 'Subtotal',
          value: calculation && calculation.sub_total ? calculation.sub_total : 'XXXXXXX-XXXXX',
        },
        {
          title: 'VAT Rate',
          value: calculation && calculation.vat_rate ? `${calculation.vat_rate}` : 'XXXXXXX-XXXXX',
        },
        {
          title: 'VAT',
          value: calculation && calculation.vat ? calculation.vat : 'XXXXXXX-XXXXX',
        },
        {
          title: 'Total',
          value: calculation && calculation.total ? calculation.total : 'XXXXXXX-XXXXX',
        },
      ],
    };


    var create_data = [];
    var exProducts = []
    calculation_data.compData.map(cd => exProducts.push({ qty: cd.title, unit_price: cd.value, isRate: cd.title === 'VAT Rate' ? true : false, isbold: true }));

    var allProducts = products.concat(exProducts)

    const boldHead = (up, isbold) => isbold ? <strong>{up}</strong> : `${up}`
    const vatRate = (rate, check) => check ? `${rate} %` : `${currency} ${rate}`
    
    allProducts.map(p => {
      var d = {
        id: p.part_number,
        brand: p.brand,
        desc: p.description,
        part_details: p.details,
        lead_time: p.lead_time,
        quantity: boldHead(p.qty, p.isbold),
        unit_price: vatRate(p.unit_price, p.isRate), 
      };
      create_data.push(d);
    });

    const create_columns = [
      {
        name: 'Manufacturer Part No',
        selector: 'id',
        minWidth: '150px',
        sortable: true,
      },
      {
        name: 'Manufacturer',
        selector: 'brand',
        minWidth: '10px',
        sortable: true,
      },
      {
        name: 'Description',
        selector: 'desc',
        minWidth: '300px',
        sortable: true,
      },
      {
        name: 'Lead Time',
        selector: 'lead_time',
        minWidth: '5px',
        sortable: true,
      },
      {
        name: 'Quantity',
        selector: 'quantity',
        minWidth: '5px',
        sortable: true,
      },
      {
        name: 'Unit Price',
        selector: 'unit_price',
        minWidth: '5px',
        sortable: true,
      },
      {
        name: 'Order Quantity',
        selector: '',
        minWidth: '5px',
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
      heading: 'Purchase Order Details',
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
          title: 'Contact Name',
          value: buyer_info && buyer_info.user_fullname ? buyer_info.user_fullname : 'John Doe',
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

    dispatch(change('id', po_id));

    const managerApproved = v => {
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

    const actionBtns = status.buyer === 'PO Sent' || status.buyer === 'PO Rejected' ? true : false

    if (submitting) {
      return <PageLoader text="Creating PO ..." />;
    }

    return (
      <form onSubmit={handleSubmit(poStatusActionHandler)}>
      
        <div className="row">
          <div className="col-md-6">
          <BackLink link="/po/buy/list" icon={faAngleDoubleLeft} value=" Back to PR-200210-12345" />
            <h4 className="create_purchase">{po_no[0]}</h4>
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
                  !actionBtns ?
                  <React.Fragment>            
                  <button type="submit" className="btn btn-success reject_btn">
                    Approve
                  </button>
                  <button type="button" className="btn btn-danger reject_btn"
                  onClick={() => managerApproved(false)}>
                    Reject
                  </button>
                  </React.Fragment>
                  :
                  <button type="button" className="btn btn-success reject_btn">
                  {`${status.buyer}`}
                  </button>
                  )
              }
              </React.Fragment>
            ) : (
            status.buyer === 'Approved' ?
            <button type="button" className="btn btn-success reject_btn">
              {`${status.buyer}`}
            </button>
            : 
            <button type="button" className="btn btn-success reject_btn">
            {` ${status.buyer}`}
            </button>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 pr-0">
            <BoxLayout data={box_data}>
              <StaticInput md="12" label="Project Name" placeholder={project_name} />
              <StaticInput md="6" label="PO Date" placeholder={rfq_date} />
              <StaticInput md="6" label="Currency" placeholder={currency} />
            </BoxLayout>
          </div>
          <ProfileBox md="6" boxData={profile_data} data={profile_data.compData} />
        </div>

        <div className="clearfix"></div>
        <div className="clearfix"></div>

        <div className="row">
        <ProfileBox md="12" boxData={buyer_profile_data} data={buyer_profile_data.compData} />
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
          <ProfileBox md="4" md1="7" md2="5" boxData={tx_box_data} data={tx_box_data.compData[0]} />

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

  return <PageLoader text={`Fetching details for Purchase Order ID: ${po_id}`} />;
}

POView.propTypes = {
  t: PropTypes.func,
  columns: PropTypes.object,
  data: PropTypes.object,
};

export default reduxForm({
  form: 'create_po',
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
    dispatch(getPOList())
    Router.push('/po/buy/list');
  },
})(POView);
