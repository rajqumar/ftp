import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';

import Layout from 'containers/Layout';
import Create from 'components/Quotes/Create';
import QuotationsView from 'components/Quotations/Buy/View';
import QuotationsSellView from 'components/Quotations/Sell/View';
import CommonPage from 'components/CommonPage';
import PageLoader from 'components/Loaders/PageLoader';
import saga from './saga';
import reducer from './reducer';
import { useRouter } from 'next/router';
import { getQuotationsList } from './actions';
import dateformat from '/utils/ftp/dateformat';

import TransactionList from 'components/Transaction/List';
import ViewLink from 'components/Transaction/ViewLink';
import StatusButtons from 'components/Transaction/StatusButtons';

export function Quotations() {
  useInjectSaga({ key: 'quotes', saga });
  useInjectReducer({ key: 'quotes', reducer });

  const router = useRouter();
  const path = router.pathname;
  var quotes = useSelector(state => state.quotes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuotationsList());
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

  var quotesRender;

  switch (path) {
    case '/quotations/buy/view/[...qt_no]':
      quotesRender = <QuotationsView columns={create_columns} data={create_data} />;
      break;

    case '/quotations/sell/list': case '/quotations/buy/list':

  const columns = [
    {
      name: 'Quote No.',
      selector: 'id',
      minWidth: '10px',
      sortable: true,
      style: {
        color: '#D2232A',
        cursor: 'pointer !important',
      },
    },
    {
      name: 'Quote Date',
      selector: 'date',
      sortable: true,
      minWidth: '10px',
    },
    {
      name: 'Supplier(s)',
      selector: 'supplier',
      sortable: true,
      minWidth: '300px',
    },
    {
      name: 'Projects',
      selector: 'name',
      sortable: true,
      minWidth: '160px',
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      minWidth: '200px',
    },
  ];

  var linkToRFQ = (qt_no, id) =>  <ViewLink step="quotations" type={path.includes('buy') ? 'buy' : 'sell'} no={qt_no} id={id} />;

  var activeBtn = status => {
    var greenCond = ['Accepted', 'Approved', 'Received', 'Converted']
    var yellowCond = ['Pending', 'Viewed']

    return <StatusButtons greenCond={greenCond} yellowCond={yellowCond} status={status} />
  };

  const data = [];

  if (quotes && quotes.quotations_list && quotes.quotations_list.results && quotes.quotations_list.results.length > 0) {
    if (Object.keys(quotes.quotations_list.results).length > 0) {
      if (quotes.quotations_list.results.length > 0) {
        quotes.quotations_list.results.map(quote => {
          var cdFormat = dateformat(quote.created_at) 
          const quotesData = {
            id: linkToRFQ(quote.qt_no, quote.id),
            date: cdFormat,
            name: quote.project_name,
            supplier: quote.customer,
            status: quote.status && quote.status !== undefined ? activeBtn(path.includes('buy') ? quote.status.buyer : quote.status.seller) : activeBtn('Status'),
          };
          data.push(quotesData);
        });
      }
    }
  }
      quotesRender =
        quotes && quotes.quotations_list !== undefined && Object.keys(quotes.quotations_list).length > 0 ? (
          <TransactionList columns={columns} data={data} />
          ) : (
          <PageLoader text="Fetching Quotations ..." />
        );
      break;

    case '/quotations/sell/view/[...qt_no]':
      quotesRender =
        quotes && quotes.quotations_list !== undefined && Object.keys(quotes.quotations_list).length > 0 ? (
          <QuotationsSellView columns={create_columns} data={create_data} />
        ) : (
          <PageLoader text="Fetching Quotations ..." />
        );
      break;

    default:
      break;
  }

  return (
    <Layout color={path.includes('buy') ? '#FFFFD7' : '#D3EFFF'}>
      <CommonPage
        progress={path.includes('view') ? 'quotation' : false}
        margin={path.includes('view') ? '35px' : '150px'}>
        {quotesRender}
      </CommonPage>
    </Layout>
  );
}

Quotations.propTypes = {};

export default Quotations;
