import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';
import TransactionList from 'components/Transaction/List';
import ViewLink from 'components/Transaction/ViewLink';
import StatusButtons from 'components/Transaction/StatusButtons';
import Layout from 'containers/Layout';
import InvBuyView from 'components/Invoice/Buy/View';
import InvSellView from 'components/Invoice/Sell/View';
import CommonPage from 'components/CommonPage';
import PageLoader from 'components/Loaders/PageLoader';
import dateformat from 'utils/ftp/dateformat'
import saga from './saga';
import reducer from './reducer';
import { useRouter } from 'next/router';
import { getInvoiceList } from './actions';

export function Invoice() {
  useInjectSaga({ key: 'invoice', saga });
  useInjectReducer({ key: 'invoice', reducer });

  const router = useRouter();
  const dispatch = useDispatch();

  const path = router.pathname;
  var invoice = useSelector(state => state.invoice);

  const [progress, setProgress] = useState('inv')

  useEffect(() => {
    dispatch(getInvoiceList());
  }, []);

  var invRender;

  switch (path) {
    case '/invoice/buy/view/[...invoice_no]':
      invRender = <InvBuyView setProgress={setProgress} />;
      break;

    case '/invoice/sell/view/[...invoice_no]':
      invRender = <InvSellView setProgress={setProgress} />;
      break;

    case '/invoice/buy/list': case '/invoice/sell/list':

  const columns = [
    {
      name: 'Invoice No.',
      selector: 'id',
      minWidth: '160px',
      sortable: true,
      style: {
        color: '#D2232A',
        cursor: 'pointer !important',
      },
    },
    {
      name: 'DO No.',
      selector: 'do_no',
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
      name: 'Ship Date',
      selector: 'date',
      sortable: true,
      minWidth: '160px',
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

  var linkToInvoice = (invoice_no, id, po_no, po_id, type) => <ViewLink step={type=== 'invoice' ? 'invoice' : 'po'} type={path.includes('buy') ? 'buy' : 'sell'} no={invoice_no || po_no} id={id || po_id} />;

  var activeBtn = status => {
    var greenCond = ['Accepted', 'Approved', 'Received', 'Acknowledged']
    var yellowCond = ['Pending']

    return <StatusButtons greenCond={greenCond} yellowCond={yellowCond} status={status} />
  };

  const data = [];

  if (invoice && invoice.invoice_list && invoice.invoice_list.results && invoice.invoice_list.results.length > 0) {
    if (Object.keys(invoice.invoice_list.results).length > 0) {
      if (invoice.invoice_list.results.length > 0) {
        invoice.invoice_list.results.map(inv => {
          var cdFormat = dateformat(inv.created_at)

          const invoiceData = {
            id: linkToInvoice(inv.inv_no, inv.id, 0, 0, 'invoice'),
            do_no: inv.do_no,
            po_no: linkToInvoice(0, 0, inv.po_no, inv.po_id, 'po'),
            date: cdFormat,
            shipment_no: inv.shipment_no,
            customer: inv.customer,
            status: inv.status && inv.status !== undefined ? activeBtn(path.includes('buy') ? inv.status.buyer : inv.status.seller) : activeBtn('Status'),
          };
          data.push(invoiceData);
        });
      }
    }
  }

      invRender =
        invoice && invoice.invoice_list !== undefined && Object.keys(invoice.invoice_list).length > 0 ? (
          <TransactionList columns={columns} data={data} />
        ) : (
          <PageLoader text="Fetching Invoices ..." />
        );
      break;

    default:
      invRender = <PageLoader text="PAGE NOT FOUND ..." />;
      break;
  }

  return (
    <Layout color={path.includes('buy') ? '#FFFFD7' : '#D3EFFF'}>
      <CommonPage progress={path.includes('view') ? progress : false} margin={path.includes('view') ? '35px' : '150px'}>
        {invRender}
      </CommonPage>
    </Layout>
  );
}

Invoice.propTypes = {};

export default Invoice;
