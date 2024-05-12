import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';

import Layout from 'containers/Layout';
import DOBuyView from 'components/DO/Buy/View';
import DOSellView from 'components/DO/Sell/View';
import CommonPage from 'components/CommonPage';
import PageLoader from 'components/Loaders/PageLoader';
import saga from './saga';
import reducer from './reducer';
import { useRouter } from 'next/router';
import { getDOList } from './actions';
import dateformat from 'utils/ftp/dateformat'

import TransactionList from 'components/Transaction/List';
import ViewLink from 'components/Transaction/ViewLink';
import StatusButtons from 'components/Transaction/StatusButtons';

export function DeliveryOrders() {
  useInjectSaga({ key: 'do', saga });
  useInjectReducer({ key: 'do', reducer });

  const router = useRouter();
  const path = router.pathname;

  var dol = useSelector(state => state.do);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDOList());
  }, []);


  const create_columns = [
    {
      name: 'Part No',
      selector: 'id',
      minWidth: '160px',
      sortable: true,
      cell: row => <input type="text" name="myCountry" placeholder="part no" style={{ marginTop: '20px' }} />,
    },
    {
      name: 'Brand',
      selector: 'brand',
      minWidth: '160px',
      sortable: true,
    },
    {
      name: 'Description',
      selector: 'desc',
      minWidth: '160px',
      sortable: true,
    },
    {
      name: 'Quantity',
      selector: 'quantity',
      minWidth: '160px',
      sortable: true,
    },
    {
      name: 'Due Date',
      selector: 'due_date',
      minWidth: '160px',
      sortable: true,
    },
  ];

  const create_data = [
    {
      brand: 'Texas Instruments',
      desc: 'Text Instrumnets Timer IC operatings temprature:0-70c',
      quantity: '1000',
      due_date: '1 Jan 2020',
    },
  ];

  var doRender;

  switch (path) {
    case '/do/buy/view/[...do_no]':
      doRender = <DOBuyView columns={create_columns} data={create_data} />;
      break;

    case '/do/sell/view/[...do_no]':
      doRender = <DOSellView columns={create_columns} data={create_data} />;
      break;

    case '/do/buy/list': case '/do/sell/list':

  const columns = [
    {
      name: 'DO No.',
      selector: 'id',
      minWidth: '20px',
      sortable: true,
      style: {
        color: '#D2232A',
        cursor: 'pointer !important',
      },
    },
    {
      name: 'Shipment No.',
      selector: 'shipment_no',
      sortable: true,
      minWidth: '30px',
    },
    {
      name: 'PO No.',
      selector: 'po_no',
      sortable: true,
      minWidth: '20px',
      style: {
        color: '#D2232A',
        cursor: 'pointer !important',
      },
    },
    {
      name: 'Ship Date',
      selector: 'date',
      sortable: true,
      minWidth: '20px',
    },
    {
      name: 'Buyer(s)',
      selector: 'customer',
      sortable: true,
      minWidth: '50px',
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      minWidth: '220px',
    },
  ];

  var linkToRFQ = (do_no, id, po_no, po_id, type) =>
  <ViewLink step={type=== 'do' ? 'do' : 'po'} type={path.includes('buy') ? 'buy' : 'sell'} no={do_no || po_no} id={id || po_id} />;

  var activeBtn = status => {
    var greenCond = ['Accepted', 'Approved', 'Received']
    var yellowCond = ['Pending']
    return <StatusButtons greenCond={greenCond} dynamicClass={path.includes('buy') ? false : 'table-button-sell' } yellowCond={yellowCond} status={status} />
  };

  var data = [];

  if (dol && dol.do_list && dol.do_list.results && dol.do_list.results.length > 0) {
    if (Object.keys(dol.do_list.results).length > 0) {
      if (dol.do_list.results.length > 0) {
        dol.do_list.results.map(quote => {
          var cdFormat = dateformat(quote.created_at)

          const dolData = {
            id: linkToRFQ(quote.do_no, quote.id, 0, 0, 'do'),
            shipment_no: quote.shipment_no,
            do_no: quote.do_no,
            date: cdFormat,
            customer: quote.customer,
            po_no: linkToRFQ(0, 0, quote.po_no, quote.po_id, 'po'),
            status: quote.status && quote.status !== undefined ? activeBtn(path.includes('buy') ? quote.status.buyer : quote.status.seller) : activeBtn('Status'),
          };
          data.push(dolData);
        });
      }
    }
  }
      doRender =
        dol && dol.do_list !== undefined && Object.keys(dol.do_list).length > 0 ? (
          <TransactionList columns={columns} data={data} />
        ) : (
          <PageLoader text="Fetching Delivery Orders ..." />
        );
      break;

    default:
      doRender = <PageLoader text="PAGE NOT FOUND ..." />;
      break;
  }

  return (
    <Layout color={path.includes('buy') ? '#FFFFD7' : '#D3EFFF'}>
      <CommonPage progress={path.includes('view') ? 'do' : false} margin={path.includes('view') ? '35px' : '150px'}>
        {doRender}
      </CommonPage>
    </Layout>
  );
}

DeliveryOrders.propTypes = {};

export default DeliveryOrders;
