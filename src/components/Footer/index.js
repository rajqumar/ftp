import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  var social = [
    { name: faFacebook, url: 'https://www.facebook.com/' },
    { name: faLinkedin, url: 'https://www.linkedin.com/company/hellosme/about/' },
  ];

  var social_media = social.map((s, i) => (
    <React.Fragment key={i}>
      <li>
        <a href={s.url} className="social-icon">
          <span className="brand_icons">
            <FontAwesomeIcon icon={s.name} />
          </span>
        </a>
      </li>
      <style jsx>{`
        .brand_icons {
          padding: 3px 5px;
          -o-transition: 0.5s;
          -ms-transition: 0.5s;
          -moz-transition: 0.5s;
          -webkit-transition: 0.5s;
          transition: 0.5s;
          background-color: #fff;
          color: #333;
          border-radius: 2px;
          margin-right: 10px;
        }

        .social-icon {
          color: #fff;
          list-style-type: none;
        }
      `}</style>
    </React.Fragment>
  ));

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <img src="/static/images/logo.png" className="footer_logo img-responsive" />
            <div className="row">
              <div className="col-md-4">
                <p className="footer_addreess">
                  6A Shenton way
                  <br /> OUE Downtown Gallery #04-08
                  <br /> Singapore 068815
                </p>
              </div>
              <div className="col-md-4">
                <p className="footer_phone">
                  <FontAwesomeIcon icon={faPhone} /> +65 6429 1044
                </p>
                <div className="footer-social-icons">
                  <ul className="social-icons">{social_media}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row b_foot">
          <div className="col-md-6">
            <p className="copy_right">
              Copyright &copy; 2020 &nbsp;
              <a href="#" className="color_gray">
                Hellosme Pte Ltd.
              </a>{' '}
              All rights reserved.
            </p>
          </div>
          <div className="col-md-6">
            <ul className="footer_list">
              <li>Privacy Policy</li>
              <li>Terms Of Use</li>
            </ul>
          </div>
        </div>
      </div>
      <style jsx>{`
        .content-wrapper,
        .main-footer {
          -webkit-transition: -webkit-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
          -moz-transition: -moz-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
          -o-transition: -o-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
          transition: transform 0.3s ease-in-out, margin 0.3s ease-in-out;
          margin-left: 230px;
          z-index: 820;
        }

        .main-footer {
          margin-left: 0;
          background: rgba(19, 0, 0, 1);
          padding: 30px 0px 10px 0;
          color: #fff;
          border-top: 1px solid rgba(34, 34, 34, 1);
          position: relative;
        }

        .footer_logo {
          margin-bottom: 20px;
        }

        .footer_addreess {
          color: rgba(204, 204, 204, 1);
          font-size: 14px;
        }

        .footer_phone {
          font-size: 14px;
        }

        .footer-social-icons {
          width: 350px;
          display: block;
          margin: 0 auto;
        }

        ul.social-icons {
          margin-top: 10px;
          margin-left: -40px;
          display: flex;
          list-style: none;
        }

        .social-icons li {
          vertical-align: top;
          display: inline;
          margin-right: 20px;
          pheight: 100px;
        }

        .social-icons a {
          color: #fff;
          text-decoration: none;
        }

        .b_foot {
          margin-top: 20px;
          border-top: 1px solid #f4eeee29;
          padding-top: 10px;
        }

        .copy_right {
          color: rgba(204, 204, 204, 1);
        }

        .color_gray {
          color: rgba(204, 204, 204, 1);
        }

        .footer_list li {
          float: right;
          display: flex;
          font-size: 14px;
          list-style: none;
          padding: 0px 10px;
          color: rgba(204, 204, 204, 1);
        }
      `}</style>
    </footer>
  );
}

export default Footer;
