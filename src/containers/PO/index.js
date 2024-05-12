import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';

import Layout from 'containers/Layout';
import POSellView from 'components/PO/Sell/View';
import POView from 'components/PO/Buy/View';
import CommonPage from 'components/CommonPage';
import PageLoader from 'components/Loaders/PageLoader';
import saga from './saga';
import reducer from './reducer';
import ViewLink from 'components/Transaction/ViewLink';
import StatusButtons from 'components/Transaction/StatusButtons';
import TransactionList from 'components/Transaction/List';
import dateformat from 'utils/ftp/dateformat'
import { useRouter } from 'next/router';
import { getPOList } from './actions';

export function PO() {
  useInjectSaga({ key: 'po', saga });
  useInjectReducer({ key: 'po', reducer });

  const router = useRouter();
  const path = router.pathname;

  var po = useSelector(state => state.po);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPOList());
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

  var poRender;
  if (path.includes('view')) {
    poRender = path.includes('buy') ? <POView columns={create_columns} data={create_data} /> : <POSellView columns={create_columns} data={create_data} />;
  } else if(path.includes('list')) {

  const columns = [
    {
      name: 'PO No.',
      selector: 'id',
      minWidth: '20px',
      sortable: true,
      style: {
        color: '#D2232A',
        cursor: 'pointer !important',
      },
    },
    {
      name: 'PO Date',
      selector: 'date',
      sortable: true,
      minWidth: '20px',
    },
    {
      name: 'Supplier(s)',
      selector: 'seller',
      sortable: true,
      minWidth: '260px',
    },
    {
      name: 'PO Amount',
      selector: 'amount',
      sortable: true,
      minWidth: '20px',
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      minWidth: '200px',
    },
  ];

  var linkToRFQ = (po_no, id) => <ViewLink step="po" type={path.includes('buy') ? 'buy' : 'sell'} no={po_no} id={id} />;

  var activeBtn = status => {
    var greenCond = ['Accepted', 'Sent', 'Approved', 'Received']
    var yellowCond = ['Pending', 'Converted']

    return <StatusButtons greenCond={greenCond} yellowCond={yellowCond} status={status} />
  };

  var data = [];

  if (po && po.po_list && po.po_list.results && po.po_list.results.length > 0) {
    if (Object.keys(po.po_list.results).length > 0) {
      if (po.po_list.results.length > 0) {
        po.po_list.results.map(p => {
          var cdFormat = dateformat(p.created_at) 
          const poData = {
            id: linkToRFQ(p.po_no, p.id),
            date: cdFormat,
            eta: p.eta,
            seller: p.seller,
            amount: `${p.currency} ${p.amount}`,
            status: p.status && p.status !== undefined ? activeBtn(path.includes('buy') ? p.status.buyer : p.status.seller) : activeBtn('Status'),
          };
          data.push(poData);
        });
      }
    }
  }

    poRender =
      po && po.po_list !== undefined && Object.keys(po.po_list).length > 0 ? (
        <TransactionList columns={columns} data={data} />
      ) : (
        <PageLoader text="Fetching Purchase Orders ..." />
      );
  }

  return (
    <Layout color={path.includes('buy') ? '#FFFFD7' : '#D3EFFF'}>
      <CommonPage progress={path.includes('view') ? 'po' : false} margin={path.includes('view') ? '35px' : '150px'}>
        {poRender}
      </CommonPage>
    </Layout>
  );
}

PO.propTypes = {};

export default PO;
