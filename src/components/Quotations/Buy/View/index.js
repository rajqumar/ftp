import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleLeft,
  faInfoCircle,
  faBuilding,
  faMicrochip,
  faCheck,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { reduxForm } from 'redux-form';
import Router, { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  getQuotationDetails,
  createPOHandler,
  quotationStatusActionHandler,
  getQuotationsList,
} from 'containers/Quotations/actions';
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

export function QuotationsView(props) {
  const { submitting, handleSubmit, change } = props;
  const router = useRouter();
  const [showQtyCol, setQtyCol] = useState(true);
  const [poConverted, setPoConverted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({})
  const [rejectNote, setRejectNote] = useState(false)

  const { qt_no } = router.query;
  const qt_id = qt_no[1];
  const dispatch = useDispatch();
  var quotes = useSelector(state => state.quotes);

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
      status,
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
    
    var quantityInput = id => (
        <Plain
          data={{
            type: 'text',
            name: `quantity_${id}`,
          }}
        />
    )

    var create_data = [];
    products.map((p, i) => {
      var d = {
        id: p.part_number,
        brand: p.brand,
        desc: p.description,
        part_details: p.details,
        lead_time: rowsLoop(p.details.map(pd => pd.lead_time)),
        quantity: rowsLoop(p.details.map(pd => `${pd.qty_to} - ${pd.qty_from}`)),
        order_quantity: quantityInput(p.part_number),
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
        name: 'Unit Price',
        selector: 'unit_price',
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
        name: 'Order Quantity',
        selector: 'order_quantity',
        minWidth: '5px',
        sortable: true,
        omit: showQtyCol,
        style: {
          marginTop: '20px'
        }
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

      dispatch(change('quotation_id', id));
      dispatch(change('note', note));
      dispatch(change('inproducts', products));
    };
    var role = localStorage.getItem('ftp_role')

    const convertPO = e => {
      e.preventDefault();
      console.log('initiate convert to po');
    };

    const modalAction = (open, value) => {
      setModalOpen(open)
      console.log(value)
      if(value && value === 'note') {
        setRejectNote(true)
      }
    }

    if (submitting) {
      return <PageLoader text="Creating Purchase Order..." />;
    }

    var handler = rejectNote ? quotationStatusActionHandler : createPOHandler 
    return (
      <form onSubmit={handleSubmit(handler)}>
        
        <div className="row">
          <div className="col-md-6">
          <div className="head_quo">
            <Link href="/quotations/buy/list">
              <p className="red_name tl">
                <FontAwesomeIcon icon={faAngleDoubleLeft} width="16" /> Back to PR-200210-12345{' '}
              </p>
            </Link>
          </div>
            <h4 className="create_purchase ">{qt_no[0]}</h4>
          </div>
          <div className="col-md-6">
            {
              role === 'Procurement Manager' ?
              <button type="button" className="btn btn-success reject_btn">
              {` ${status.buyer}`}
              </button> :
            poConverted || rejectNote ? (
              <React.Fragment>
                <button className="btn btn-success fr edit_case" type="button">
                  <FontAwesomeIcon icon={faEdit} width="16" />
                </button>
                <button type="submit" className="btn btn-danger reject_btn">
                  {` Save`}
                </button>
              </React.Fragment>
            ) : (
              status.buyer === 'Viewed' ?
              <React.Fragment>
                <button
                  type="button"
                  className="btn btn-success purchase_save"
                  onClick={showQtyCol ? convertInitiate : convertPO}>
                  <FontAwesomeIcon icon={faCheck} width="16" />
                       &nbsp; CONVERT TO PO
                </button>

              </React.Fragment> :
              <button type="button" className="btn btn-success reject_btn">
              {` ${status.buyer}`}
            </button>
            )
          }

          </div>
        </div>

        <div className="row">
          <div className="col-md-6 pr-0">
            <BoxLayout data={box_data}>
                <StaticInput md="12" label="Project Name" placeholder={project_name} />
                <StaticInput md="6" label="Quote Date" placeholder={rfq_date} />
                <StaticInput md="6" label="Currency" placeholder={currency} />
                <StaticInput md="12" label="Quotation Validity" placeholder={quotation_date} />
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

  return <PageLoader text={`Fetching details for Quotation ID: ${qt_id}`} />;
}

QuotationsView.propTypes = {
  t: PropTypes.func,
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
    dispatch(getQuotationsList())
    Router.push('/quotations/buy/list');
  },
})(QuotationsView);
