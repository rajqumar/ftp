import React, { useEffect } from 'react';
import Layout from 'containers/Layout';
import RegisterForm from 'components/FTPForms/RegisterForm';
import Router from 'next/router';
import { useRouter } from 'next/router';

export function Register() {
  const router = useRouter();

  useEffect(() => {
    if (window.localStorage.getItem('ftp_token') != null) {
      const supplier_id = window.localStorage.getItem('supplier_id');
      const part_id = window.localStorage.getItem('part_id');

      if (supplier_id && part_id) {
        Router.push({ pathname: '/rfq/buy/create', query: { supp_id: supplier_id, part_id: part_id } });
      } else {
        if (Object.keys(router.query).length > 0 && router.query.isppeuser === 'true') {
          window.location.assign(`https://www.hellomedicalppe.com/?isuserloggedin=${true}`);
        } else {
          Router.push('/dashboard/manager');
        }
      }
    }
  });

  return (
    <Layout>
      <div className="vimeo-wrapper">
        <iframe
          src={
            Object.keys(router.query).length > 0 && router.query.isppeuser == 'true'
              ? 'https://player.vimeo.com/video/433884546?autoplay=1&loop=1&autopause=0&muted=1'
              : 'https://player.vimeo.com/video/372627953?autoplay=1&loop=1&autopause=0&muted=1'
          }
          frameBorder="0"
          className="reg_video"></iframe>
        <div className="container mt-5">
          <section className="content">
            <div className="row">
              <div className="col-md-6 col-md-offset-3 reg_form_new">
                <RegisterForm />
              </div>
            </div>
          </section>
        </div>
      </div>
      <style jsx>{`
        .content {
          min-height: 250px;
          padding: 50px 15px 15px 15px !important;
          margin-right: auto;
          margin-left: auto;
        }
        .mt-30 {
          margin-top: 30px;
        }
        .mt-5 {
          margin-top: 5%;
        }
        .reg_form_new {
          background: #fff;
          border: 1px solid #dddcdc;
          border-radius: 5px;
          margin: 30px auto;
          padding: 20px;
          min-height: 100%;
          margin-top: 51px !important;
          box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.07);
        }
        .vimeo-wrapper iframe {
          width: 100vw;
          height: 56.25vw;
          min-height: 100vh;
          min-width: 177.77vh;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .reg_video {
          position: fixed !important;
          top: 50% !important;
          min-width: 100% !important;
          min-height: 100% !important;
          width: 200vh !important;
          z-index: -100 !important;
          -webkit-transform: translateX(-50%) translateY(-50%) !important;
          transform: translateX(-50%) translateY(-50%) !important;
          background-size: cover !important;
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

export default Register;
