import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';

import Layout from 'containers/Layout';

import TransactionList from 'components/Transaction/List';
import ViewLink from 'components/Transaction/ViewLink';
import StatusButtons from 'components/Transaction/StatusButtons';

import Create from 'components/Quotes/Create';
import View from 'components/Quotes/Buy/View';
import SellView from 'components/Quotes/Sell/View';
import CommonPage from 'components/CommonPage';
import PageLoader from 'components/Loaders/PageLoader';
import dateformat from '../../utils/ftp/dateformat';

import saga from './saga';
import reducer from './reducer';

import { useRouter } from 'next/router';
import { getRFQList, getRFQInitialData, getSuppliers, createRFQHandler } from './actions';

export function Quotes() {
  useInjectSaga({ key: 'quotes', saga });
  useInjectReducer({ key: 'quotes', reducer });

  const dispatch = useDispatch();
  const router = useRouter();

  const path = router.pathname;
  var quotes = useSelector(state => state.quotes);

  useEffect(() => {
    dispatch(getRFQList());
    dispatch(getRFQInitialData());
    dispatch(getSuppliers());
  }, []);


  var quotesRender;
  if (path.includes('view')) {
    quotesRender = path.includes('buy') ? <View /> : <SellView />;
  } else if (path.includes('create')) {
    quotesRender =
      quotes &&
      quotes.initial_data !== undefined &&
      Object.keys(quotes.initial_data).length > 0 &&
      quotes.suppliers != undefined &&
      Object.keys(quotes.suppliers).length > 0 ? (
        <Create
          initialData={quotes}
          suppliers={quotes.suppliers.results.length > 0 ? quotes.suppliers.results : ''}
          createRFQHandler={createRFQHandler}
        />
      ) : (
        <PageLoader text="Fetching RFQ Data ..." />
      );
  } else if (path.includes('list')) {

  const columns = [
    {
      name: 'RFQ No.',
      selector: 'id',
      sortable: true,
      minWidth: '10px',
      style: {
        color: '#D2232A',
        cursor: 'pointer !important',
      },
    },
    {
      name: 'RFQ Date',
      selector: 'date',
      sortable: true,
      minWidth: '10px',
    },
    {
      name: 'Project Name',
      selector: 'name',
      sortable: true,
      minWidth: '10px',
    },
    {
      name: 'Supplier(s)',
      selector: 'supplier',
      sortable: true,
      minWidth: '230px',
    },
    {
      name: 'Due Date',
      selector: 'due_date',
      sortable: true,
      minWidth: '5px',
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      minWidth: '230px'
    },
  ];

  var linkToRFQ = (rfq_no, id) => <ViewLink step="rfq" type={path.includes('buy') ? 'buy' : 'sell'} no={rfq_no} id={id} />;

  var activeBtn = status => {
    var greenCond = ['Accepted', 'Approved', 'Received', 'Quote Sent'];
    var yellowCond = ['Pending', 'Progress', 'Converted'];

    return <StatusButtons greenCond={greenCond} dynamicClass={path.includes('buy') ? false : 'table-button-sell' } yellowCond={yellowCond} status={status} />
  };

  var data = [];

  if (quotes && quotes.data && quotes.data.results && quotes.data.results.length > 0) {
    if (Object.keys(quotes.data.results).length > 0) {
      if (quotes.data.results.length > 0) {
        quotes.data.results.map(quote => {
          var ddFormat = dateformat(quote.due_date[0]);
          var cdFormat = quote.created_at ? dateformat(quote.created_at) : dateformat(quote.rfq_date);

          const quotesData = {
            id: linkToRFQ(quote.rfq_no, quote.id),
            rfq_id: quote.rfq_no,
            date: cdFormat,
            name: quote.project_name,
            lastlogin: cdFormat,
            supplier: quote.seller && quote.seller[0] ? quote.seller[0]  : quote.customer,
            due_date: ddFormat,
              status:
                quote.status && path.includes('buy') ? activeBtn(quote.status.buyer) : activeBtn(quote.status.seller),
          };
          data.push(quotesData);
        });
      }
    }
  }
    quotesRender =
      quotes && quotes.data !== undefined && Object.keys(quotes.data).length > 0 ? (
        <TransactionList columns={columns} data={data} createButton={true} />
      ) : (
        <PageLoader text="Fetching RFQ List ..." />
      );
  }

  return (
    <Layout color="#FFFFD7">
      <CommonPage progress={path.includes('view') ? true : false} margin={path.includes('view') ? '35px' : '150px'}>
      {quotesRender}
      </CommonPage>
    </Layout>
  );
}

Quotes.propTypes = {};

export default Quotes;
