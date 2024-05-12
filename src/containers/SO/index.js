import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';

import Layout from 'containers/Layout';
import SOSellView from 'components/SO/Sell/View';
import CommonPage from 'components/CommonPage';
import PageLoader from 'components/Loaders/PageLoader';

import TransactionList from 'components/Transaction/List';
import ViewLink from 'components/Transaction/ViewLink';
import StatusButtons from 'components/Transaction/StatusButtons';
import dateformat from 'utils/ftp/dateformat'

import saga from './saga';
import reducer from './reducer';
import { useRouter } from 'next/router';
import { getSOList } from './actions';

export function SalesOrder() {
  useInjectSaga({ key: 'so', saga });
  useInjectReducer({ key: 'so', reducer });

  const router = useRouter();
  const path = router.pathname;

  var so = useSelector(state => state.so);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSOList());
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

  var soRender;

  switch (path) {
    case '/so/sell/view/[...so_no]':
      soRender = <SOSellView columns={create_columns} data={create_data} />;
      break;

    case '/so/buy/list':
      soRender = (
        <img
          src="https://image.freepik.com/free-vector/404-error-with-character-error-design-template-website_114341-24.jpg"
          style={{ paddingLeft: '250px' }}
        />
      );
      break;

    case '/so/sell/list':

  const columns = [
    {
      name: 'SO No.',
      selector: 'id',
      minWidth: '160px',
      sortable: true,
      style: {
        color: '#D2232A',
        cursor: 'pointer !important',
      },
    },
    {
      name: 'SO Date',
      selector: 'date',
      sortable: true,
      minWidth: '140px',
    },
    {
      name: 'PO No.',
      selector: 'po_no',
      sortable: true,
      minWidth: '160px',
      style: {
        color: '#D2232A',
        cursor: 'pointer !important',
      },
    },
    {
      name: 'Buyer(s)',
      selector: 'customer',
      sortable: true,
      minWidth: '160px',
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      minWidth: '120px',
    },
  ];

  var linkToRFQ = (so_no, id, po_no, po_id, type) => 
  <ViewLink step={type=== 'so' ? 'so' : 'po'} type={path.includes('buy') ? 'buy' : 'sell'} no={so_no || po_no} id={id || po_id} />;

  var activeBtn = status => {
    var greenCond = ['Accepted', 'Approved', 'Received']
    var yellowCond = ['Pending', 'Converted']
    return <StatusButtons greenCond={greenCond} yellowCond={yellowCond} status={status} />
  };

  const data = [];

  if (so && so.so_list && so.so_list.results && so.so_list.results.length > 0) {
    if (Object.keys(so.so_list.results).length > 0) {
      if (so.so_list.results.length > 0) {
        so.so_list.results.map(quote => {
          var cdFormat = dateformat(quote.created_at)

          const soData = {
            id: linkToRFQ(quote.so_no, quote.id, 0, 0, 'so'),
            so_no: quote.so_no,
            date: cdFormat,
            customer: quote.customer,
            po_no: linkToRFQ(0, 0, quote.po_no, quote.po_id, 'po'),
            status: quote.status && quote.status !== undefined ? activeBtn(path.includes('buy') ? quote.status.buyer : quote.status.seller) : activeBtn('Status'),
          };
          data.push(soData);
        });
      }
    }
  }
      soRender =
        so && so.so_list !== undefined && Object.keys(so.so_list).length > 0 ? (
          <TransactionList columns={columns} data={data} />
        ) : (
          <PageLoader text="Fetching Sales Orders ..." />
        );
      break;

    default:
      soRender = <PageLoader text="PAGE NOT FOUND ..." />;
      break;
  }

  return (
    <Layout color={path.includes('buy') ? 'white' : '#D3EFFF'}>
      <CommonPage progress={path.includes('view') ? 'po' : false} margin={path.includes('view') ? '35px' : '150px'}>
        {soRender}
      </CommonPage>
    </Layout>
  );
}

SalesOrder.propTypes = {};

export default SalesOrder;
