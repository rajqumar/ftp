import React, { useEffect, useState } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import HeaderMenu from './HeaderMenu';
import {
  faSearch,
  faUser,
  faUserPlus,
  faChartBar,
  faFilePowerpoint,
  faFile,
  faMicrochip,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';
import Toggle from 'components/Toggle';
import { useRouter } from 'next/router';

function Header(props) {
  const { isLoggedIn, currentUserRole } = props;

  const [isMedicalSiteUser, setisMedicalSiteUser] = useState(false);

  useEffect(() => {
    if (router.query.healthcare === 'true' && router.query.category !== 'null') {
      localStorage.setItem('isMedicalUser', true);
    }

    if (router.query.healthcare === 'true' && router.query.category === 'null') {
      localStorage.setItem('isMedicalUser', false);
    }
    const isMedicalUser = localStorage.getItem('isMedicalUser');
    setisMedicalSiteUser(isMedicalUser);
  });

  const router = useRouter();
  const path = router.pathname;
  const query = router.query;

  const menuLoggedIn = [
    {
      name: 'SEARCH',
      icon: faMicrochip,
      submenu: [
        {
          name: 'PARTS',
          url: '/search?searchvalue=n',
          seller: true,
          buyer: true,
        },
        {
          name: 'SUPPLIERS',
          url: '/search?searchvalue=n',
          seller: true,
          buyer: true,
        },
      ],
    },
    {
      name: 'DASHBOARD',
      icon: faChartBar,
      submenu: [
        {
          name: 'MANAGER',
          url: '/dashboard/manager',
          seller: true,
          buyer: true,
        },
        {
          name: 'BUY',
          url: '/dashboard/buyer',
          seller: true,
          buyer: true,
        },
        {
          name: 'SELL',
          url: '/dashboard/seller',
          seller: true,
          buyer: true,
        },
      ],
    },
    {
      name: 'QUOTES',
      icon: faFile,
      submenu: [
        {
          name: 'PURCHASE REQUESTS',
          url: '',
          seller: false,
          buyer: true,
        },
        {
          name: 'REQUEST FOR QUOTATION',
          url: ['/rfq/buy/list', '/rfq/sell/list'],
          seller: true,
          buyer: true,
        },
        {
          name: 'QUOTATIONS',
          url: ['/quotations/buy/list', '/quotations/sell/list'],
          seller: true,
          buyer: true,
        },
      ],
    },
    {
      name: 'ORDERS',
      icon: faFilePowerpoint,
      submenu: [
        {
          name: 'PURCHASE ORDERS',
          url: ['/po/buy/list', '/po/sell/list'],
          seller: true,
          buyer: true,
        },
        {
          name: 'SALES ORDERS',
          url: ['/so/buy/list', '/so/sell/list'],
          seller: true,
          buyer: false,
        },
        {
          name: 'DELIVERY ORDERS',
          url: ['/do/buy/list', '/do/sell/list'],
          seller: true,
          buyer: true,
        },
      ],
    },
    {
      name: 'PAYMENTS',
      icon: faCreditCard,
      submenu: [
        {
          name: 'INVOICE',
          url: ['/invoice/buy/list', '/invoice/sell/list'],
          seller: true,
          buyer: true,
        },
        {
          name: 'PAYMENT',
          url: '',
          seller: true,
          buyer: true,
        },
        {
          name: 'ACKNOWLEDGEMENT',
          url: '',
          seller: true,
          buyer: true,
        },
      ],
    },
    {
      name: 'MY ACCOUNT',
      icon: faUser,
      submenu: [
        {
          name: 'MY PROFILE',
          url: '/profile',
          seller: true,
          buyer: true,
        },
        {
          name: 'MANAGE USERS',
          url: '/manage',
          seller: true,
          buyer: true,
        },
        {
          name: 'INTEGRATE ERP',
          url: '/integrateERP',
          seller: true,
          buyer: true,
        },
      ],
    },
  ];

  const menuLoggedOut = [
    {
      name: 'New to ftp',
      icon: '',
      submenu: [
        {
          name: 'About Us',
          url: '',
          seller: true,
          buyer: true,
        },
        {
          name: 'FTP Core & Advisory Teams',
          url: '',
          seller: true,
          buyer: true,
        },
        {
          name: 'What is FTP',
          url: '',
          seller: true,
          buyer: true,
        },
        {
          name: 'FTP Features & Benefits',
          url: '',
          seller: true,
          buyer: true,
        },
        {
          name: 'FTP Membership Plan',
          url: '',
          seller: true,
          buyer: true,
        },
        {
          name: 'SMEs’ FAQ',
          url: '',
          seller: true,
          buyer: true,
        },
      ],
    },
    {
      name: 'Value-Added Services',
      icon: '',
      submenu: [
        {
          name: 'Berkley Insurance ASIA - Marine',
          url: '',
          seller: true,
          buyer: true,
        },
        {
          name: 'OFX - Global Money Transfers',
          url: '',
          seller: true,
          buyer: true,
        },
        {
          name: 'GOGOVAN Singapore – Last Mile Fulfilment',
          url: '',
          seller: true,
          buyer: true,
        },
        {
          name: 'Funding Societies – SME Financing',
          url: '',
          seller: true,
          buyer: true,
        },
        {
          name: 'FTP Discounting Solution',
          url: '',
          seller: true,
          buyer: true,
        },
      ],
    },
    {
      name: 'Regional Markets',
      icon: '',
      submenu: [
        {
          name: 'Asean',
          url: 'https://ftp-lite-node.hellosme.com',
          seller: true,
          buyer: true,
        },
        {
          name: 'Greater China',
          url: '',
          seller: true,
          buyer: true,
        },
        {
          name: 'India',
          url: '',
          seller: true,
          buyer: true,
        },
        {
          name: 'Japan',
          url: '',
          seller: true,
          buyer: true,
        },
        {
          name: 'Korea',
          url: '',
          seller: true,
          buyer: true,
        },
      ],
    },
    { name: 'Search Parts / suppliers', icon: faSearch, url: '/' },
    { name: 'Login', icon: faUser, url: '/login' },
    { name: 'Register', icon: faUserPlus, url: '/register' },
  ];

  return (
    <header className="main-header fixed-headbar">
      <Navbar expand="md final_nav">
        <div className="container">
          <NavbarBrand
            href={
              (query.isppeuser && query.isppeuser == 'true') || isMedicalSiteUser === 'true'
                ? 'https://www.hellomedicalppe.com/'
                : '/'
            }
            className="mr-auto">
            <span className="logo_navbrand">
              <p className="logo_head">
                <img src="/static/images/logo_fav.png" height="30" width="30" />
                FTP
              </p>
              <p className="logo_subhead">
                Powered by <span className="yellow_color">Hello</span>
                <span className="red_logo">SME</span>
              </p>
            </span>
          </NavbarBrand>
          <HeaderMenu menuItems={isLoggedIn ? menuLoggedIn : menuLoggedOut} isLoggedIn={isLoggedIn} />
          {(isLoggedIn && path === '/dashboard/buyer') || path === '/dashboard/seller' ? (
            <Toggle currentUserRole={currentUserRole} />
          ) : null}
        </div>
      </Navbar>

      <style jsx>{`
        .logo_head {
          color: #d31e25;
          font-size: 30px;
          font-weight: 700;
          margin: 0px;
        }
        .red_logo {
          color: #d31e25;
        }

        .yellow_color {
          color: #f1b702;
        }

        .logo_subhead {
          color: #333;
          font-size: 14px;
          margin-bottom: 10px;
        }
        .logo_navbrand {
          float: left;
          height: 30px;
          width: 215px;
          padding: 10px 15px;
          font-size: 18px;
          line-height: 15px;
          padding-bottom: 41px !important;
        }
        .main-header {
          position: relative;
          max-height: 100px;
          z-index: 1030;
        }
        .navbar-collapse {
          width: auto;
          border-top: 0;
          -webkit-box-shadow: none;
          box-shadow: none;
        }
        .dummytoggle {
          float: right !important;
          right: 0 !important;
          position: absolute;
        }
        .navbar-nav {
          float: left;
          margin: 0;
        }
        .buy_sell_toggle {
          margin-top: 15%;
        }
        .nav li {
          position: relative;
          display: block;
        }
        .btn-toggle.btn-lg.active {
          transition: background-color 0.25s;
        }
        .btn-toggle.btn-lg {
          margin: 0 5rem;
          padding: 0;
          position: relative;
          border: none;
          height: 2.5rem;
          width: 4rem;
          border-radius: 2.5rem;
        }
        .btn-toggle.active {
          background-color: #fff5d7;
        }
        .btn-toggle.active {
          transition: background-color 0.25s;
        }
        .btn.active,
        .btn:active {
          background-image: none;
          outline: 0;
          -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
          box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
        }
        .btn-toggle {
          margin: 0 4rem;
          padding: 0;
          position: relative;
          border: none;
          height: 1.5rem;
          width: 3rem;
          border-radius: 1.5rem;
          color: #6b7381;
          border: 1px solid #cbc6c6 !Important;
          background: #d1edff;
        }
        .btn {
          border-radius: 3px;
          -webkit-box-shadow: none;
          box-shadow: none;
          border: 1px solid transparent;
        }
        .btn.active .btn:active {
          background-image: none;
          outline: 0;
          -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
          box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
        }
        .btn-toggle {
          margin: 0 4rem;
          padding: 0;
          position: relative;
          border: none;
          height: 1.5rem;
          width: 3rem;
          border-radius: 1.5rem;
          color: #6b7381;
          border: 1px solid #cbc6c6 !Important;
          background: #d1edff;
        }
        .btn-toggle.btn-lg.active .handle {
          transition: left 0.25s;
        }
        .btn-toggle.btn-lg:before,
        .btn-toggle.btn-lg:after {
          line-height: 2.5rem;
          width: 5rem;
          text-align: center;
          font-weight: 600;
          font-size: 14px;
          color: #000;
          text-transform: uppercase;
          letter-spacing: 0px;
          position: absolute;
          bottom: 0;
        }
        .btn-toggle.btn-lg .handle {
          position: absolute;
          width: 22px;
          border: 1px solid #e1e0e0;
          height: 22px;
          border-radius: 1.875rem;
          background: #fff;
          transition: left 0.25s;
        }
        .btn-toggle.active .handle {
          left: 1.6875rem;
          transition: left 0.25s;
        }
        .btn-toggle .handle {
          position: absolute;
          top: 0;
          left: 0;
          width: 1.125rem;
          height: 1.125rem;
          border-radius: 1.125rem;
          background: #fff;
          transition: left 0.25s;
        }
        .btn-toggle.btn-lg.active:after {
          opacity: 1;
        }
        .btn-toggle.btn-lg:after {
          content: 'Sell';
          right: -5rem;
          opacity: 0.5;
        }
        .btn-toggle.btn-lg:before,
        .btn-toggle.btn-lg:after {
          line-height: 2.5rem;
          width: 5rem;
          text-align: center;
          font-weight: 600;
          font-size: 14px;
          color: #000;
          text-transform: uppercase;
          letter-spacing: 0px;
          position: absolute;
          bottom: 0;
        }
        .final_nav ul li a {
          color: #262626;
          font-weight: 600;
          line-height: 45px;
        }
        .navbar-nav > li {
          float: left;
        }
        .btn-toggle:after {
          content: 'On';
          right: -4rem;
          opacity: 0.5;
        }
        .btn-toggle:before .btn-toggle:after {
          line-height: 1.5rem;
          width: 4rem;
          text-align: center;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          position: absolute;
          bottom: 0;
          transition: opacity 0.25s;
        }
        .btn-toggle.btn-lg.active:after {
          opacity: 1;
        }
        .btn-toggle.btn-lg:after {
          content: 'Sell';
          right: -5rem;
          opacity: 0.5;
        }

        .btn-toggle.active:after {
        }

        .btn-toggle:after {
          content: 'On';
          right: -4rem;
          opacity: 0.5;
        }

        .btn-toggle.btn-lg.active:before {
          opacity: 1;
        }
        .btn-toggle.btn-lg:before {
          content: 'BUY';
          left: -5rem;
        }

        .btn-toggle.active:before {
          opacity: 0.5;
        }

        .btn-toggle:before {
          content: 'Off';
          left: -4rem;
        }
        .btn-toggle:before,
        .btn-toggle:after {
          line-height: 1.5rem;
          width: 4rem;
          text-align: center;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          position: absolute;
          bottom: 0;
          transition: opacity 0.25s;
          color: #6b7381;
        }

        .Toggles {
          margin-top: 50px;
        }

        .toggleHolder {
          text-align: center;
        }

        .toggleHolder h3,
        .toggleHolder p {
          text-align: center;
          margin: 5px;
          color: rgba(0, 0, 0, 0.8);
        }

        .toggleWrapper {
          width: 100%;
        }

        .toggleWrapper .toggleLabel {
          width: 50px;
          display: inline-block;
        }

        .toggleWrapper .toggleLabel p {
          color: rgba(0, 0, 0, 0.5);
          overflow: hidden;
          transition: all 0.3s ease-in-out;
        }

        .toggleWrapper .toggleLabel.active p {
          color: rgba(0, 0, 0, 0.8);
        }

        .toggle {
          display: inline-block;
          width: 50px;
          height: 25px;
          border-radius: 100px;
          position: relative;
          margin: auto;
          overflow: hidden;
          border: solid 1px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease-in-out;
          cursor: pointer;
        }

        .toggle.active {
          border: solid 1px #00cf67;
        }

        .toggle .inside {
          width: 75%;
          height: 100%;
          border-radius: 100px;
          background: rgba(0, 0, 0, 0.3);
          position: absolute;
          left: -25%;
          transition: all 0.3s ease-in-out;
        }

        .toggle.active .inside {
          left: 50%;
          background: #00cf67;
        }
        .logo_navbrand {
          float: left;
          height: 30px;
          width: 215px;
          padding: 10px 15px;
          font-size: 18px;
          line-height: 15px;
        }
        .fixed-headbar {
          padding-bottom: 12px !important;
          margin-left: 0 !important;
          box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.35) !important;
          position: fixed !important;
          top: 40px !important;
          background-color: #fff !important;
          position: fixed !important;
          top: 0 !important;
          width: 100% !important;
          z-index: 1002 !important;
        }
      `}</style>
    </header>
  );
}

Header.propTypes = {
  data: PropTypes.array,
  isLoggedIn: PropTypes.bool,
  currentUserRole: PropTypes.object,
};

export default Header;
