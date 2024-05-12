import React from 'react';
import Layout from 'containers/Layout';

export default function ThankYou() {
  return (
    <Layout>
      <center>
        <div className="card">
          <div
            style={{
              borderRadius: '200px',
              height: '100px',
              background: '#f1b70236',
              margin: '0 auto',
              width: '100px',
            }}>
            <img src="/static/images/thank_you.png" className="img-responsive im_thank" />
          </div>
          <h1 className="thankyou_head">Thank You</h1>
          <p className="thankyou_para">
            We have received your purchase request,
            <br /> we will get back to you shortly.
          </p>
        </div>
      </center>
      <style>{`
            .card {
                background: white;
                padding: 40px;
                border-radius: 4px;
                box-shadow: 0 2px 3px #C8D0D8;
                display: inline-block;
                margin: 130px auto;
            }

            .img-responsive {
                display: block;
                max-width: 100%;
                height: auto;
            }

            .im_thank{
                margin-top:15px;
            }

            .thankyou_head {
                color: #d31e25;
                font-weight: 900;
                font-size: 40px;
                margin-bottom: 10px;
            }

            .thankyou_para {
                color: #404F5E;
                font-size:20px;
                margin: 0;
            }
            `}</style>
    </Layout>
  );
}
