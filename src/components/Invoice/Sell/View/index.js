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
import { useDispatch, useSelector } from 'react-redux';
import BackLink from 'components/BackLink'
import { toast } from 'react-toastify';
import dateformat from 'utils/ftp/dateformat'

import { getInvoiceList, getInvoiceView, invStatusActionHandler } from 'containers/Invoice/actions';
import Plain from 'components/Input';
import StaticInput from 'components/Transaction/StaticInput'
import Tables from 'components/Tables';
import BoxLayout from '../../../Box/Layout';
import H6 from 'components/H6';
import PageLoader from 'components/Loaders/PageLoader';
import ProfileBox from 'components/Transaction/ProfileBox'

export function InvSellView(props) {
  const { submitting, handleSubmit, change, setProgress } = props;
  const router = useRouter();

  const { invoice_no } = router.query;
  const invoice_id = invoice_no[1];
  const dispatch = useDispatch();
  var invoice = useSelector(state => state.invoice);

  useEffect(() => {
    if (invoice === undefined || invoice.invoice_view === undefined || invoice.invoice_view.length <= 0) {
      dispatch(getInvoiceView(invoice_id));
    }
  });

  if (invoice !== undefined && invoice.invoice_view && Object.keys(invoice.invoice_view).length > 0) {
    var {
      id,
      products,
      created_at,
      currency,
      project_name,
      terms,
      buyer_info,
      po_no,
      shipment_no,
      invoice,
      inv_no,
      payment_receipt,
      payment_uploaded_at,
      calculation,
      status,
    } = invoice.invoice_view;

    if(status.seller === 'Acknowledge') {
      setProgress('paid')
    } else if(status.seller === 'Acknowledged') {
      setProgress('acknow')
    }

    const note = 'Static notes';

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
    var rfq_date = dateformat(created_at)

    var viewInvoice = (invoice_no, invoice) => (
      <React.Fragment>
      <p style={{marginTop: '10px'}}>{invoice_no}</p>
        <a href={invoice} target="_blank">
          File
        </a>
      </React.Fragment>
    );

    var create_data = [];
    var info_data = [];
    var info = {
      po_no: po_no,
      shipment_no: shipment_no,
      invoice: viewInvoice(inv_no, invoice),
      payment: payment_receipt ? viewInvoice(`Upload Date: ${dateformat(payment_uploaded_at)}`, payment_receipt) : '',
    };
    info_data.push(info);

    var exProducts = []
    calculation_data.compData.map(cd => exProducts.push({ qty: cd.title, unit_price: cd.value, isRate: cd.title === 'VAT Rate' ? true : false, isbold: true }));

    var allProducts = products.concat(exProducts)
    const boldHead = (up, isbold) => isbold ? <strong>{up}</strong> : `${up}`
    const vatRate = (rate, check) => check ? `${rate} %` : `${currency} ${rate}`

    allProducts.map(p => {
      var ship_date = ''
      if(p.ship_date) {
        ship_date = dateformat(p.ship_date);
      }

      var d = {
        id: p.part_number,
        brand: p.brand,
        desc: p.description,
        ship_date: ship_date,
        lead_time: p.lead_time,
        quantity: boldHead(p.qty, p.isbold),
        unit_price: vatRate(p.unit_price, p.isRate),  
      };
      create_data.push(d);
    });

    const info_columns = [
      {
        name: 'PO No.',
        selector: 'po_no',
        minWidth: '80px',
        sortable: true,
      },
      {
        name: 'Shipment No.',
        selector: 'shipment_no',
        minWidth: '80px',
        sortable: true,
      },
      {
        name: 'View Invoice',
        selector: 'invoice',
        minWidth: '80px',
        sortable: true,
      },
      {
        name: 'View Payment',
        selector: 'payment',
        minWidth: '80px',
        sortable: true,
      },
    ];

    const create_columns = [
      {
        name: 'Part No',
        selector: 'id',
        minWidth: '80px',
        sortable: true,
      },
      {
        name: 'Brand',
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
        name: 'Ship Date',
        selector: 'ship_date',
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
        name: 'Quantity',
        selector: 'quantity',
        minWidth: '20px',
        sortable: true,
      },
      {
        name: 'Unit Price',
        selector: 'unit_price',
        minWidth: '20px',
        sortable: true,
      },
    ];

    const select_parts_box = {
      heading: 'Parts Details',
      icon: faMicrochip,
    };

    const box_data = {
      heading: 'Invoice Details',
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

    const managerApproved = v => {
        dispatch(change('id', invoice_id));
        dispatch(change('status', 'acknowledged'));
    }

    if (submitting) {
      return <PageLoader text="Aknowledge ..." />;
    }

    return (
      <form onSubmit={handleSubmit(invStatusActionHandler)}>

        <div className="row">
          <div className="col-md-6">
          <BackLink link="/invoice/sell/list" icon={faAngleDoubleLeft} value=" Back to PR-200210-12345" />

            <h4 className="create_purchase">{invoice_no[0]}</h4>
          </div>
          <div className="col-md-6">
            {
              status.seller === 'Acknowledge' ?
              <button type="submit" className="btn btn-success reject_btn"
              onClick={() => managerApproved(true)}>
                Acknowledge
              </button> :
              <button type="button" className="btn btn-success reject_btn">
              {`${status.seller}`}
             </button>
            }
          </div>
        </div>

        <div className="row">
        <div className="col-md-6 pr-0">

<BoxLayout data={box_data}>
  <div className="row">
    <StaticInput md="12" label="Project Name" placeholder={project_name} />
    <StaticInput md="6" label="Invoice Date" placeholder={rfq_date} />
    <StaticInput md="6" label="Currency" placeholder={currency} />
    <StaticInput md="12" label="Ship to Country" placeholder={buyer_info.country} />
    <StaticInput md="12" label="Ship to Address" placeholder={buyer_info.address_1} />
  </div>
</BoxLayout>

</div>
<ProfileBox md="6" boxData={buyer_profile_data} data={buyer_profile_data.compData} />

        </div>

        <div className="clearfix"></div>
        <div className="clearfix"></div>
        <div className="row mb-25">
          <div className="col-md-12">
            <BoxLayout data={select_parts_box}>
              <Tables columns={info_columns} data={info_data} />
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
      </form>
    );
  }

  return <invoice_no text={`Fetching details for Delivery Order ID: ${invoice_id}`} />;
}

InvSellView.propTypes = {
  t: PropTypes.func,
  columns: PropTypes.object,
  data: PropTypes.object,
};

export default reduxForm({
  form: 'invoice_sell_form',
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
    dispatch(getInvoiceList())
    Router.push('/invoice/sell/list');
  },
})(InvSellView);
