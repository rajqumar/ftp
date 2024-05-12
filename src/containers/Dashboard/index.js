import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';

import saga from './saga';
import reducer from './reducer';

import { getDashboardData } from './actions';
import Layout from '../Layout';
import Admin from 'components/Views/Admin';
import { useSelector } from 'react-redux';
import { faCalendarAlt, faChartBar, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export function Dashboard() {
  useInjectSaga({ key: 'dashboard', saga });
  useInjectReducer({ key: 'dashboard', reducer });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDashboardData());
  }, []);

  let seller_statistics;
  let buyer_statistics;
  const dashboardMetadata = useSelector(state => {
    if (state.dashboard != undefined && state.dashboard.data && Object.keys(state.dashboard.data).length > 0) {
      return state.dashboard.data;
    }
  });

  if (dashboardMetadata != undefined) {
    seller_statistics = dashboardMetadata.seller_statistics;
    buyer_statistics = dashboardMetadata.buyer_statistics;
  }

  const sellerData = {
    seller_statistics: {
      heading: 'Seller Statistics',
      icon: '',
      rating: '',
      dropdown: '',
      rightButton: '',
      compData: [
        {
          purchaseNumber: seller_statistics != undefined ? seller_statistics.quotes_sent : '-',
          purchaseRequest: 'Quotes ',
          subtitle: 'Sent',
          id: 2,
          cardLink: '/quotations/sell/list',
        },
        {
          purchaseNumber: seller_statistics != undefined ? seller_statistics.purchase_order : '-',
          purchaseRequest: 'Purchase',
          subtitle: 'Orders',
          id: 3,
          cardLink: '/po/sell/list',
        },
        {
          purchaseNumber: seller_statistics != undefined ? seller_statistics.sales_orders : '-',
          purchaseRequest: 'Sales ',
          subtitle: 'Orders',
          id: 4,
          cardLink: '/so/sell/list',
        },
        {
          purchaseNumber: seller_statistics != undefined ? seller_statistics.rfq_received : '-',
          purchaseRequest: 'RFQs ',
          subtitle: 'Received',
          id: 1,
          cardLink: '/rfq/sell/list',
        },
        {
          purchaseNumber: seller_statistics != undefined ? seller_statistics.delivery_order : '-',
          purchaseRequest: 'Delivery ',
          subtitle: 'Orders',
          id: 5,
          cardLink: '/do/sell/list',
        },
        {
          purchaseNumber: seller_statistics != undefined ? seller_statistics.invoice : '-',
          purchaseRequest: 'Invoices',
          subtitle: 'Outstanding',
          id: 6,
          cardLink: '/invoice/sell/list',
        },
        {
          purchaseNumber: seller_statistics != undefined ? seller_statistics.pending_payment : '-',
          purchaseRequest: 'Pending  ',
          subtitle: 'Payments',
          id: 7,
          cardLink: '',
        },
        {
          purchaseNumber: seller_statistics != undefined ? seller_statistics.pending_acknowledgements : '-',
          purchaseRequest: 'Pending',
          subtitle: 'Acknnowledgements',
          id: 8,
          cardLink: '',
        },
      ],
    },
    seller_datasheet: {
      heading: 'Sales Orders',
      icon: faChartBar,
      rating: '',
      dropdown: [
        { value: '2019', name: '2019' },
        { value: '2018', name: '2018' },
        { value: '2017', name: '2017' },
        { value: '2016', name: '2016' },
        { value: '2015', name: '2015' },
        { value: '2014', name: '2014' },
      ],
      rightButton: '',
      compData: [
        {
          label: 'somethingA',

          values: [
            { x: 'Jan', y: 97 },
            { x: 'Feb', y: 12 },
            { x: 'Mar', y: 91 },
            { x: 'Apr', y: 13 },
            { x: 'May', y: 60 },
            { x: 'Jun', y: 20 },
            { x: 'Jul', y: 48 },
            { x: 'Aug', y: 36 },
            { x: 'Sep', y: 73 },
            { x: 'Oct', y: 91 },
            { x: 'Nov', y: 35 },
            { x: 'Dec', y: 33 },
          ],
        },
      ],
    },

    seller_ratings: {
      heading: 'Seller Rating',
      icon: '',
      rating: '',
      dropdown: '',
      rightButton: '',
      compData: [
        {
          icon: faInfoCircle,
          title: 'Payment',
          rating: 3,
        },
        {
          icon: faInfoCircle,
          title: 'Responsiveness',
          rating: 4,
        },
        {
          icon: faInfoCircle,
          title: 'Shipment',
          rating: 5,
        },
      ],
    },

    seller_yeartodate: {
      heading: 'Year to Date',
      icon: faCalendarAlt,
      rating: '',
      dropdown: [
        { value: '2019', name: '2019' },
        { value: '2018', name: '2018' },
        { value: '2017', name: '2017' },
        { value: '2016', name: '2016' },
        { value: '2015', name: '2015' },
        { value: '2014', name: '2014' },
      ],
      rightButton: '',
      compData: [
        {
          title: 'Quotations Sent',
          id: 1,
          number: 200,
        },
        {
          title: 'RFQ Received',
          id: 2,
          number: 150,
        },
        {
          title: 'Shipments Completed',
          id: 3,
          number: 45,
        },
      ],
    },

    seller_table: {
      heading: '',
      icon: '',
      rating: '',
      dropdown: '',
      rightButton: '',
      compData: {
        columns: [
          {
            name: 'Title',
            selector: 'title',
            sortable: true,
          },
          {
            name: 'Director',
            selector: 'director',
            sortable: true,
          },
          {
            name: 'Year',
            selector: 'year',
            sortable: true,
          },
          {
            name: 'Status',
            selector: 'title',
            sortable: true,
          },
        ],
      },
    },
  };

  var activeBtn = status => (
    <button type="button" className="btn btn-success btn_active">
      {status}
    </button>
  );

  var inactiveBtn = status => (
    <button type="button" className="btn btn-success btn_inactive">
      {status}
    </button>
  );

  const buyer_data = {
    buyer_statistics: {
      heading: 'Buyer Statistics',
      icon: '',
      rating: '',
      dropdown: '',
      rightButton: '',
      compData: [
        {
          purchaseNumber: buyer_statistics != undefined ? buyer_statistics.purchase_request : '-',
          purchaseRequest: 'Purchase ',
          subtitle: 'Requests',
          id: 1,
          cardLink: '',
        },
        {
          purchaseNumber: buyer_statistics != undefined ? buyer_statistics.rfq_sent : '-',
          purchaseRequest: 'RFQ ',
          subtitle: 'Received',
          id: 2,
          cardLink: '/rfq/buy/list',
        },
        {
          purchaseNumber: buyer_statistics != undefined ? buyer_statistics.quotes_accepted : '-',
          purchaseRequest: 'Quotes',
          subtitle: 'Accepted',
          id: 3,
          cardLink: '/quotations/buy/list',
        },
        {
          purchaseNumber: buyer_statistics != undefined ? buyer_statistics.purchase_order : '-',
          purchaseRequest: 'Purchase ',
          subtitle: 'Orders',
          id: 4,
          cardLink: '/po/buy/list',
        },
        {
          purchaseNumber: buyer_statistics != undefined ? buyer_statistics.delivery_order : '-',
          purchaseRequest: 'Delivery ',
          subtitle: 'Orders',
          id: 5,
          cardLink: '/do/buy/list',
        },
        {
          purchaseNumber: buyer_statistics != undefined ? buyer_statistics.invoice : '-',
          purchaseRequest: 'Invoices',
          subtitle: 'Outstanding',
          id: 6,
          cardLink: '/invoice/buy/list',
        },
        {
          purchaseNumber: buyer_statistics != undefined ? buyer_statistics.pending_payment : '-',
          purchaseRequest: 'Pending  ',
          subtitle: 'Payments',
          id: 7,
          cardLink: '',
        },
        {
          purchaseNumber: buyer_statistics != undefined ? buyer_statistics.pending_acknowledgements : '-',
          purchaseRequest: 'Pending',
          subtitle: 'Acknnowledgements',
          id: 8,
          cardLink: '',
        },
      ],
    },

    buyer_datasheet: {
      heading: 'Purchase Orders',
      icon: faChartBar,
      rating: '',
      dropdown: [
        { value: '2019', name: '2019' },
        { value: '2018', name: '2018' },
        { value: '2017', name: '2017' },
        { value: '2016', name: '2016' },
        { value: '2015', name: '2015' },
        { value: '2014', name: '2014' },
      ],
      rightButton: '',
      compData: [
        {
          label: 'somethingA',

          values: [
            { x: 'Jan', y: 57 },
            { x: 'Feb', y: 62 },
            { x: 'Mar', y: 9 },
            { x: 'Apr', y: 3 },
            { x: 'May', y: 66 },
            { x: 'Jun', y: 10 },
            { x: 'Jul', y: 28 },
            { x: 'Aug', y: 56 },
            { x: 'Sep', y: 83 },
            { x: 'Oct', y: 11 },
            { x: 'Nov', y: 75 },
            { x: 'Dec', y: 93 },
          ],
        },
      ],
    },

    buyer_ratings: {
      heading: 'Buyer rating',
      icon: '',
      rating: '',
      dropdown: '',
      rightButton: '',
      compData: [
        {
          icon: faInfoCircle,
          title: 'Payment',
          rating: 2,
        },
        {
          icon: faInfoCircle,
          title: 'Responsiveness',
          rating: 3,
        },
        {
          icon: faInfoCircle,
          title: 'Shipment',
          rating: 5,
        },
      ],
    },

    buyer_yeartodate: {
      heading: 'Year to Date',
      icon: faCalendarAlt,
      rating: '',
      dropdown: [
        { value: '2019', name: '2019' },
        { value: '2018', name: '2018' },
        { value: '2017', name: '2017' },
        { value: '2016', name: '2016' },
        { value: '2015', name: '2015' },
        { value: '2014', name: '2014' },
      ],
      rightButton: '',
      compData: [
        {
          title: 'Quotations Received',
          id: 1,
          number: 200,
        },
        {
          title: 'Purchase Orders',
          id: 2,
          number: 150,
        },
        {
          title: 'Shipments Received',
          id: 3,
          number: 45,
        },
      ],
    },

    buyer_table: {
      heading: '',
      icon: '',
      rating: '',
      dropdown: '',
      rightButton: '',
      compData: {
        columns: [
          {
            name: 'User',
            selector: 'user',
            sortable: true,
          },
          {
            name: 'Role',
            selector: 'role',
            sortable: true,
          },
          {
            name: 'Last Login',
            selector: 'lastlogin',
            sortable: true,
          },
          {
            name: 'Status',
            selector: 'status',
            sortable: true,
          },
        ],
        values: [
          {
            user: 'Rohan Mehta',
            role: 'Admin',
            lastlogin: '2020-05-06 10:12',
            status: activeBtn('Active'),
          },
          {
            user: 'Vijendra Patil',
            role: 'User',
            lastlogin: '2020-05-07 16:22',
            status: activeBtn('Active'),
          },
          {
            user: 'Pranshu Rastogi',
            role: 'User',
            lastlogin: '2020-05-07 20:42',
            status: inactiveBtn('Disable'),
          },
          {
            user: 'Rajkumar Tiwari',
            role: 'User',
            lastlogin: '2020-05-08 11:11',
            status: inactiveBtn('Disable'),
          },
        ],
      },
    },
  };

  return (
    <Layout>
      <Admin buyerData={buyer_data} sellerData={sellerData} />
    </Layout>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
