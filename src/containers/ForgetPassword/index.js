import React from 'react';
import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';
import saga from './saga';
import reducer from './reducer';
import { submitFormHandler } from './actions';
import Layout from 'containers/Layout';
import ForgetPasswordForm from 'components/FTPForms/ForgetPasswordForm';
import { useRouter } from 'next/router';

export function ForgetPassword() {
  useInjectSaga({ key: 'forgetpassword', saga });
  useInjectReducer({ key: 'forgetpassword', reducer });
  const router = useRouter();

  return (
    <Layout>
      <div className="vimeo-wrapper">
        <iframe
          src={ Object.keys(router.query).length > 0 && router.query.isppeuser == 'true' ? "https://player.vimeo.com/video/433884546?autoplay=1&loop=1&autopause=0&muted=1" : 'https://player.vimeo.com/video/372627953?autoplay=1&loop=1&autopause=0&muted=1'}
          frameBorder="0"></iframe>)
        <ForgetPasswordForm submitForm={submitFormHandler} />
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
      `}</style>
    </Layout>
  );
}

export default ForgetPassword;
