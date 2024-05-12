import React from 'react';
import { faTag, faTruck, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LatestUpdatesIndustryInformation from 'components/Home/LatestUpdatesIndustryInformation';
import { useRouter } from 'next/router';
import CoronaVirusInfo from '../CoronaVirusInfo';

function FTPValueAddedServices() {
  const router = useRouter();
  const path = router.pathname;

  const items = [
    {
      img: '/static/images/berkely.png',
      title: 'Berkley Insurance ASIA',
      para: `Berkley Insurance is committed to the Semicon industry and SMEs and would like to get feedback directly
      through the FTP technology platform.`,
      icon: <FontAwesomeIcon icon={faTag} />,
    },
    {
      img: '/static/images/ofx.png',
      title: 'OFX - Global Money Transfers',
      para: `OFX is a global money transfer specialist bringing together a secure, streamlined digital experience and
      great exchange rates, with dedicated human support from on-the-ground teams 24/7.`,
      iconImage: '/static/images/ofx_icon.png',
    },
    {
      img: '/static/images/gogovan.jpg',
      title: 'GOGOVAN Singapore',
      para: `Berkley Insurance is committed to the Semicon industry and SMEs and would like to get feedback directly
      through the FTP technology platform.`,
      icon: <FontAwesomeIcon icon={faTruck} />,
    },
    {
      img: '/static/images/funding_soc.png',
      title: 'Funding Societies',
      para: `HelloSME and Funding Societies bring next generation SME financing to small and medium-sized businesses
      in Singapore, which has never been made so easy and fast.`,
      icon: <FontAwesomeIcon icon={faEdit} />,
    },
  ];

  return (
    <div className="row">
      {path != '/semiconductor' ? <CoronaVirusInfo /> : ''}
      <div className="col-md-12">
        <div className="ftp_first_block" id="vas">
          <h5 className="about_ftp">FTP Value-Added Services</h5>
          <div className="line"></div>
          <div className="info_add">
            <p>
              FTP Service Providers who are keen to enter the Semicon industry and support SMEs to enjoy and benefit
              from FTP Exclusive Offerings. The HelloSME and Service Provider teams hope to get insightful feedback from
              the SMEs on these FTP Exclusive Offerings that are of value <br />
              to the SMEs as the Semicon industry is facing enormous cost challenges and razor thin margins.
            </p>
          </div>
          {items.map((item, i) => {
            return (
              <div key={i} className="row mt-20 mb-20 pad_imag">
                <div className="col-md-5">
                  <img src={item.img} className="img-responsive" />
                </div>
                <div className="col-md-7">
                  <h5 className="head_tb">
                    {item.icon ? item.icon : <img src={item.iconImage} height="30" width="30" />}
                    &nbsp; {item.title}
                  </h5>
                  <p>{item.para}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="ftp_first_block">
          <div className="row">
            <LatestUpdatesIndustryInformation />
            <div className="col-md-6">
              <h5 className="about_ftp">Introduction To FTP</h5>
              <div className="line"></div>
              <div className="responsive-iframe">
                <iframe
                  src="https://player.vimeo.com/video/376343243?autoplay=1&loop=1&autopause=0&muted=1"
                  frameBorder="0"
                  webkitallowfullscreen="true"
                  mozallowfullscreen="true"
                  allowFullScreen={true}
                  width="400px"
                  height="230px"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
          .ftp_first_block {
            margin-top: 25px;
           }

           .about_ftp {
            text-align: left;
            font-size: 19px;
            font-weight: 600;
            word-break: break-all;
            margin: 0px;
            padding: 10px 0 5px 10px;
            color: #2b2626;
            border-radius: 5px 5px 0 0;
          }

          .line {
            height: 2px;
            width: 100px;
            margin-left: 10px;
            margin-bottom: 10px;
            color: #d31e25;
            background-color: #f14141;
          }

          .info_add {
            padding: 0px 0px 0px 10px;
          }
          
          .pad_imag {
            padding: 0px 10px;
          }

          .mt-20 {
            margin-top: 20px;
          }
          .mb-20 {
              margin-bottom: 20px !important;
          }

          .responsive-iframe {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
          }

          .head_tb {
            color: #333;
            font-size: 21px;
            font-weight: 600;
            margin-top: 0px;
          }
          `}</style>
    </div>
  );
}

export default FTPValueAddedServices;
