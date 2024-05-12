import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleLeft,
  faInfoCircle,
  faBuilding,
  faMicrochip,
  faTimes,
  faCheck,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { reduxForm, change } from 'redux-form';
import Router, { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getPOList, getPOView, createSOHandler, poStatusActionHandler } from 'containers/PO/actions';
import BackLink from 'components/BackLink'
import { toast } from 'react-toastify';

import Plain from 'components/Input';
import Tables from 'components/Tables';
import BoxLayout from '../../../Box/Layout';
import H6 from 'components/H6';
import PageLoader from 'components/Loaders/PageLoader';
import TransactionModal from 'components/Transaction/Modal'
import StaticInput from 'components/Transaction/StaticInput'
import ProfileBox from 'components/Transaction/ProfileBox'
import dateformat from 'utils/ftp/dateformat'

export function POSellView(props) {
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
          value: calculation && calculation.vat_rate ? calculation.vat_rate : 'XXXXXXX-XXXXX',
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

    var shipDateInput = id => (
      id && id !== undefined ?
      <Plain
        data={{
          type: 'date',
          name: `ship_date_${id}`,
        }}
      /> : ''
    )

    var create_data = [];
    var exProducts = []
    calculation_data.compData.map(cd => exProducts.push({ unit_price: cd.title, qty: cd.title !== 'VAT Rate' ? `${currency} ${cd.value}` : `${cd.value} %`, isbold: true }));

    var allProducts = products.concat(exProducts)
    const boldHead = (up, isbold) => isbold ? <strong>{up}</strong> : `${currency} ${up}`

    allProducts.map(p => {
      var d = {
        id: p.part_number,
        brand: p.brand,
        desc: p.description,
        part_details: p.details,
        lead_time: p.lead_time,
        quantity: p.qty,
        moq: p.moq,
        unit_price: boldHead(p.unit_price, p.isbold),
        ship_date: shipDateInput(p.id),
        remark: p.remark,
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
        minWidth: '200px',
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
        name: 'Ship Date',
        selector: 'ship_date',
        minWidth: '190px',
        sortable: true,
        omit: showQtyCol,
        style: {
          marginTop: '25px'
        }
      },
    ];

    const select_parts_box = {
      heading: 'Parts Details',
      icon: faMicrochip,
    };

    const box_data = {
      heading: 'PO Details',
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

    const convertInitiate = e => {
      e.preventDefault();
      setQtyCol(false);
      setPoConverted(true);

      dispatch(change('purchase_order_id', id));
      dispatch(change('products', products));
    };

    const convertPO = e => {
      e.preventDefault();
      console.log('initiate convert to po');
    };

    const managerRejected = v => {
      if(!v) {
        dispatch(change('id', po_id));
        dispatch(change('status', 'seller_rejected'));
        var md =  {
          title: 'Reject Sales Order',
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

    if (submitting) {
      return <PageLoader text="Creating Purchase Order to Sales Order ..." />;
    }

    var handler = rejectNote ? poStatusActionHandler : createSOHandler 
    var actionBtns = status.seller === 'PO Rejected' || status.seller === 'Converted To SO' ? false : true
    return (
      <form onSubmit={handleSubmit(handler)}>

        <div className="row">
          <div className="col-md-6">
          <BackLink link="/po/sell/list" icon={faAngleDoubleLeft} value=" Back to PR-200210-12345" />

            <h4 className="create_purchase">{po_no[0]}</h4>
          </div>
          <div className="col-md-6">
            {poConverted ||rejectNote ? (
              <React.Fragment>
                <button className="btn btn-success fr edit_case" type="button">
                  <FontAwesomeIcon icon={faEdit} width="16" />
                </button>
                <button type="submit" className="btn btn-danger reject_btn">
                  {` Save`}
                </button>
              </React.Fragment>
            ) : (
              actionBtns ?
              <React.Fragment>
                <button
                  type="button"
                  className="btn btn-success purchase_save"
                  onClick={showQtyCol ? convertInitiate : convertPO}>
                  <FontAwesomeIcon icon={faCheck} width="16" />
                  {
                    ' CONVERT TO SO'
                  }
                </button>

                <button 
                type="button" 
                className="btn btn-danger reject_btn"
                onClick={() => managerRejected(false)}
                >
                  Reject
                </button>
              </React.Fragment> :
              <button type="button" className="btn btn-success reject_btn">
              {`${status.seller}`}
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

POSellView.propTypes = {
  t: PropTypes.func,
  columns: PropTypes.object,
  data: PropTypes.object,
};

export default reduxForm({
  form: 'create_so',
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
    Router.push('/po/sell/list');
  },
})(POSellView);
