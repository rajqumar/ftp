import React from 'react';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';

function Breadcrumb({ router }) {
  var path = router.pathname;
  const { rfq_no, qt_no, po_no, so_no, do_no, invoice_no } = router.query;
  var rfq = rfq_no && rfq_no[0] ? rfq_no[0] : 'RFQ-NO-1234567';
  var qt = qt_no && qt_no[0] ? qt_no[0] : 'QT-NO-1234567';
  var po = po_no && po_no[0] ? po_no[0] : 'PO-NO-1234567';
  var so = so_no && so_no[0] ? so_no[0] : 'SO-NO-1234567';
  var dol = do_no && do_no[0] ? do_no[0] : 'DO-NO-1234567';
  var inv = invoice_no && invoice_no[0] ? invoice_no[0] : 'INV-NO-1234567';

  if (path.includes('rfq/buy/view')) {
    path = `/RFQ/Buy/View/${rfq}`;
  } else if (path.includes('rfq/sell/view')) {
    path = `/RFQ/Sell/View/${rfq}`;
  } else if (path.includes('rfq/buy/create')) {
    path = `/RFQ/Buy/Create`;
  } else if (path.includes('rfq/buy/list')) {
    path = `/RFQ/Buy/List`;
  } else if (path.includes('rfq/sell/list')) {
    path = `/RFQ/Sell/List`;
  } else if (path.includes('quotations/buy/view')) {
    path = `/Quotations/Buy/View/${qt}`;
  } else if (path.includes('quotations/sell/view')) {
    path = `/Quotations/Sell/View/${qt}`;
  } else if (path.includes('po/buy/view')) {
    path = `/Purchase Orders/Buy/View/${po}`;
  } else if (path.includes('po/sell/view')) {
    path = `/Purchase Orders/Sell/View/${po}`;
  } else if (path.includes('so/sell/view')) {
    path = `/Sales Orders/Sell/View/${so}`;
  } else if (path.includes('do/buy/view')) {
    path = `/Delivery Orders/Buy/View/${dol}`;
  } else if (path.includes('do/sell/view')) {
    path = `/Delivery Orders/Sell/View/${dol}`;
  } else if (path.includes('invoice/buy/view')) {
    path = `/Invoice/Buy/View/${inv}`;
  } else if (path.includes('invoice/sell/view')) {
    path = `/Invoice/Sell/View/${inv}`;
  } 

  path = path.split('/');
  var count = path.length;

  var links = path.map((p, i) => (
    <React.Fragment key={i}>
      <li>
        <a href={router.pathname} className="text_bred">
          &nbsp;{p} {i < count - 1 && i !== count - 1 ? ' /' : ''}
        </a>
      </li>
      <style jsx>{`
        .text_bred {
          text-decoration: none !important;
          text-transform: capitalize;
          color: #fff !important;
        }
      `}</style>
    </React.Fragment>
  ));

  return (
    <section className="breadcrumb_top">
      <div className="container">
        <ol className="breadcrumb">
          <li>
            <a href="/">Home </a>
          </li>
          {links}
        </ol>
      </div>

      <style jsx>{`
        .breadcrumb_top {
          background-color: rgba(210, 35, 42, 1);
          margin-top: 85px;
          position: fixed;
          width: 100%;
          z-index: 1000;
        }

        .breadcrumb {
          background-color: transparent !important;
          padding: 10px 15px !important;
          margin-bottom: 0px !important;
        }

        .breadcrumb li a {
          text-decoration: none !important;
          color: #fff !important;
        }
      `}</style>
    </section>
  );
}

Breadcrumb.propTypes = {
  router: PropTypes.object,
};

export default withRouter(Breadcrumb);
