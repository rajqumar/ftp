import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { currentUserRole } from './actions';
import Breadcrumb from 'components/Header/Breadcrumb';
import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';
import saga from './saga';
import reducer from './reducer';

function Layout({ children, color }) {
  useInjectSaga({ key: 'layout', saga });
  useInjectReducer({ key: 'layout', reducer });

  const router = useRouter();
  const path = router.pathname;
  const [isLoggedIn, setToken] = useState(true);
  const minHeight = path === '/login' ? '0px' : '800px';

  useEffect(() => {
    const currentDate = new Date();
    let token = window.localStorage.getItem('ftp_token');
    let token_expiry = window.localStorage.getItem('ftp_token_expiry');
    const token_expiry_date = new Date(token_expiry);

    if (token_expiry_date != null && currentDate >= token_expiry_date) {
      window.localStorage.removeItem('ftp_token');
      window.localStorage.getItem('ftp_token_expiry');
    }

    if (path.includes('buy')) {
      window.localStorage.setItem('current_user', 'buyer');
    } else if (path.includes('sell')) {
      window.localStorage.setItem('current_user', 'seller');
    } else {
      window.localStorage.setItem('current_user', '');
    }
    var loginStatus = token && token.length > 0 ? true : false;
    setToken(loginStatus);
  });

  if (
    !isLoggedIn &&
    path !== '/login' &&
    path !== '/register' &&
    !children
  ) {
    router.push('/');
  } else {
    return (
      <div className="wrapper">
        <Header isLoggedIn={isLoggedIn} currentUserRole={currentUserRole} />
        {path !== '/' && path !== '/search' && path !== '/semiconductor' ? <Breadcrumb /> : null}
        <main style={{ backgroundColor: color, minHeight: minHeight }}>{children}</main>

        <Footer />
        <style jsx>{`
          .wrapper {
            height: 50%;
            position: relative;
            overflow-x: hidden;
            overflow-y: auto;
          }
        `}</style>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
