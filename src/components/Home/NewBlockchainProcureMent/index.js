import React from 'react';

function NewBlockchainProcureMent() {
  return (
    <div className="ftp_lst_block mt-30">
      <div className="row">
        <div className="col-md-6">
          <h5 className="about_ftp_clear"> What is Business Continuity? </h5>
          <ul className="list_man">
            <p className="reverse_para">
              What is business continuity? Find out why business continuity is important to you and how you can make
              your organization more resilient with business continuity management. For more information on how to
              improve your organizational resilience through business continuity visit{' '}
            </p>
          </ul>
        </div>
        <div className="col-md-6">
          <div className="responsive-iframe">
            <iframe
              src="https://www.youtube.com/embed/hciSIFsbdJs?autoplay=1&loop=1&autopause=0&muted=1"
              frameBorder="0"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              width="400px"
              height="230px"
              allowFullScreen></iframe>
          </div>
        </div>
      </div>
      <style>
        {`

        .mt-30 {
          margin-top: 30px;
        }
        .ftp_lst_block {
          margin-top: 10px;
        }
        .responsive-iframe {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
      }
        .about_ftp_clear {
          text-align: left;
          font-size: 19px;
          font-weight: 600;
          word-break: break-word;
          margin: 0px;
          padding: 0px 0 5px 10px;
          color: #2b2626;
          border-radius: 5px 5px 0 0;
      }
      .list_man {
        list-style: none;
        margin-left: -40px;
        margin-bottom: 0px;
    }
    .reverse_para {
      padding-left: 8px;
      text-align: justify;
      font-size: 14px;
 
  }
                
                `}
      </style>
    </div>
  );
}

export default NewBlockchainProcureMent;
