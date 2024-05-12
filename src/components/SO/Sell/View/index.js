import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
import { getSOList, getSOView, createDOHandler } from 'containers/SO/actions';
import Plain from 'components/Input';
import Tables from 'components/Tables';
import BackLink from 'components/BackLink';
import BoxLayout from 'components/Box/Layout';
import H6 from 'components/H6';
import dateformat from 'utils/ftp/dateformat'
import PageLoader from 'components/Loaders/PageLoader';
import StaticInput from 'components/Transaction/StaticInput'
import ProfileBox from 'components/Transaction/ProfileBox'
import { toast } from 'react-toastify';

export function SOSellView(props) {
  const { submitting, handleSubmit, change } = props;
  const router = useRouter();
  const [showQtyCol, setQtyCol] = useState(true);
  const [poConverted, setPoConverted] = useState(false);

  const { so_no } = router.query;
  const so_id = so_no[1];
  const dispatch = useDispatch();
  var so = useSelector(state => state.so);

  useEffect(() => {
    if (so === undefined || !so.so_view || so.so_view.length <= 0) {
      dispatch(getSOView(so_id));
    }
  });

  if (so !== undefined && so.so_view && Object.keys(so.so_view).length > 0) {
    var {
      id,
      products,
      created_at,
      quotation_validity,
      currency,
      project_name,
      terms,
      buyer_info,
      seller_info,
      status,
      calculation,
      po_no
    } = so.so_view;

    var product_id = products[0].id;
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

    var create_data = [];
    var exProducts = []

    calculation_data.compData.map(cd => exProducts.push({ qty: cd.title, unit_price: cd.value, isRate: cd.title === 'VAT Rate' ? true : false, isbold: true }));

    var allProducts = products.concat(exProducts)
    const boldHead = (up, isbold) => isbold ? <strong>{up}</strong> : `${up}`
    const vatRate = (rate, check) => check ? `${rate} %` : `${currency} ${rate}`

    allProducts.map(p => {
      var ship_date = ''
      if(p.ship_date) {
        ship_date = new Date(p.ship_date);

        ship_date = `${ship_date.getUTCFullYear()}-${String(ship_date.getUTCMonth() + 1).padStart(2, '0')}-${String(
          ship_date.getUTCDate()
        ).padStart(2, '0')}`
      }

      var d = {
        id: p.part_number,
        brand: p.brand,
        desc: p.description,
        ship_date: ship_date ? ship_date : '',
        quantity: boldHead(p.qty, p.isbold),
        unit_price: vatRate(p.unit_price, p.isRate), 
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
        name: 'Ship Date',
        selector: 'ship_date',
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

    const info_columns = [
      {
        name: 'PO No.',
        selector: 'po_no',
        minWidth: '80px',
        sortable: true,
      },
      {
        name: 'Shipment No',
        selector: '',
        minWidth: '120px',
        sortable: true,
        style: {
          paddingTop: '20px'
        },
        cell: (row, i) => (
          <Plain
            data={{
              type: 'text',
              name: 'shipment_no',
            }}
          />
        ),
      },
      {
        name: 'Invoice',
        selector: '',
        minWidth: '120px',
        sortable: true,
        cell: (row, i) => (
          <React.Fragment>
          <Plain
            data={{
              type: 'file',
              name: 'invoice',
            }}
          />
          </React.Fragment>
        ),
      },
    ];

    const info_data = [{
      po_no: po_no,
      shipment_no: '',
      invoice: '',
    }];

    const select_parts_box = {
      heading: 'Parts Details',
      icon: faMicrochip,
    };

    const box_data = {
      heading: 'SO Details',
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

    const convertInitiate = e => {
      e.preventDefault();
      setQtyCol(false);
      setPoConverted(true);

      dispatch(change('sales_order_id', id));
      dispatch(change('product_id', product_id));
    };

    const convertPO = e => {
      e.preventDefault();
      console.log('initiate convert to po');
    };

    if (submitting) {

      return <PageLoader text="Creating Sales Order to Delivery Order ..." />;
    }

    return (
      <form encType="multipart/form-data" onSubmit={handleSubmit(createDOHandler)}>
        <div className="row">
          <div className="col-md-6">
          <BackLink link="/so/sell/list" icon={faAngleDoubleLeft} value=" Back to PR-200210-12345" />

            <h4 className="create_purchase pl-so_id">{so_no[0]}</h4>
          </div>
          <div className="col-md-6">
            {poConverted ? (
              <React.Fragment>
                <button className="btn btn-success fr edit_case" type="button">
                  <FontAwesomeIcon icon={faEdit} width="16" />
                </button>
                <button type="submit" className="btn btn-danger reject_btn">
                  {` Save`}
                </button>
              </React.Fragment>
            ) : (
              status.seller === 'Converted to DO' ?
              <button type="button" className="btn btn-success reject_btn">
              {`${status.seller}`}
              </button>
              :
              <React.Fragment>
                <button
                  type="button"
                  className="btn btn-success purchase_save"
                  onClick={showQtyCol ? convertInitiate : convertPO}>
                  <FontAwesomeIcon icon={faCheck} width="16" />
                  {`    CONVERT TO DO`}
                </button>
              </React.Fragment>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 pr-0">
            <BoxLayout data={box_data}>
              <StaticInput md="12" label="Project Name" placeholder={project_name} />
              <StaticInput md="6" label="SO Date" placeholder={rfq_date} />
              <StaticInput md="6" label="Currency" placeholder={currency} />
            </BoxLayout>
          </div>

          <ProfileBox md="6" boxData={buyer_profile_data} data={buyer_profile_data.compData} />
        </div>

        <div className="clearfix"></div>
        <div className="clearfix"></div>

        <div className="row mb-25">
          <div className="col-md-12">
            <BoxLayout data={select_parts_box}>
              {
                status.seller === 'Converted to DO' ?
                '' :
                <Tables columns={info_columns} data={info_data} />
              }
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
              <fieldset className="padding_form">tk ip 4m lt tx bx</fieldset>
            </BoxLayout>
          </div>
        </div>
      </form>
    );
  }

  return <PageLoader text={`Fetching details for Sales Order ID: ${so_id}`} />;
}

SOSellView.propTypes = {
  t: PropTypes.func,
  columns: PropTypes.object,
  data: PropTypes.object,
};

export default reduxForm({
  form: 'create_do',
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
    dispatch(getSOList())
    Router.push('/so/sell/list');
  },
})(SOSellView);
