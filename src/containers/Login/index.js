import React, { memo } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';

import saga from './saga';
import PropTypes from 'prop-types';

import reducer from './reducer';
import { submitFormHandler } from './actions';

import { loginToken } from './selectors';

import Layout from 'containers/Layout';
import LoginForm from 'components/FTPForms/LoginForm';
import { useRouter } from 'next/router';

export function Login({ loginToken }) {
  useInjectSaga({ key: 'token', saga });
  useInjectReducer({ key: 'token', reducer });
  const router = useRouter();
  return (
    <Layout>
      <div className="vimeo-wrapper">
        <iframe
          src={ Object.keys(router.query).length > 0 && router.query.isppeuser == 'true' ? "https://player.vimeo.com/video/433884546?autoplay=1&loop=1&autopause=0&muted=1" : 'https://player.vimeo.com/video/372627953?autoplay=1&loop=1&autopause=0&muted=1'}
          frameBorder="0"></iframe>)
        <LoginForm submitForm={submitFormHandler} data={loginToken} />
      </div>
      <style>{`
      
      .vimeo-wrapper iframe {
        width: 100vw;
        height: 56.25vw;
        min-height: 100vh;
        min-width: 177.77vh;
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        }
        ::placeholder {
          color: #d0d1d2;
          opacity: 1;
        }
        
        :-ms-input-placeholder {
          color: #d0d1d2;
        }
        
        ::-ms-input-placeholder {
          color: #d0d1d2;
        }

        .ppe_login {
          background-image: url('/static/images/imgpsh_fullsize_anim.jpeg');
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
        }
      `}</style>
    </Layout>
  );
}

const mapStateToProps = createStructuredSelector({
  loginToken: loginToken(),
});

Login.propTypes = {
  loginToken: PropTypes.func,
};

const withConnect = connect(mapStateToProps, null);
export default compose(withConnect, memo)(Login);
