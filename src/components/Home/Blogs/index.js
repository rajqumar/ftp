import React from 'react';
import Link from 'next/link';

export function Blogs() {
  const items = [
    {
      img: '/static/images/profit.png',
      link: `https://www.xero.com/blog/2020/02/business-continuity-planning-and-reinforcing-stability-during-uncertain-times/`,
      title: 'Business continuity in uncertain times',
      className: 'bottom_div_ad',
    },
    {
      img: '/static/images/cloud.png',
      link: `https://www.xero.com/sg/resources/small-business-guides/business-management/mobile-office/`,
      title: 'Running a business without an office',
      className: 'bottom_div_ad1',
    },
    {
      img: '/static/images/phone (1).png',
      link: `https://www.xero.com/sg/resources/small-business-guides/cloud-accounting/mobile-accounting-app/`,
      title: 'Do I need a mobile accounting app?',
      className: 'bottom_div_ad2',
    },
  ];

  return (
    <div>
      <div className="block_img mt-50">
        <div className="row">
          {items.map((item, i) => {
            return (
              <div key={i} className="col-md-4">
                <div className={item.className}>
                  <p className="pt-20">
                    <img src={item.img} height="40" width="40" />
                  </p>
                  <a className="a-tag" href={item.link} rel="noopener noreferrer">
                    <h5 className="bottom_ad_head">{item.title}</h5>
                  </a>

                  <Link href={item.link} prefetch={false}>
                    <a className="a-tag" target="_blank">
                      <p className="pb-20">Read the blog</p>
                    </a>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        .col-md-4 {
          width: 33.33333333%;
        }
    
        .mt-30 {
          margin-top: 30px;
        }

        .mt-50 {
            margin-top: 50px;
        }

        .bottom_div_ad {
          line-height: 300px;
          width: 100%;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-image: linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)),
          url(/static/images/add1.png);
          text-align: center;
        }

        .bottom_div_ad p {
          font-size: 16px;
          color: #CED8E1;
          position: relative;
          vertical-align: middle;
          line-height: normal;
        }

        .pt-20 {
            padding-bottom: 20px;
            padding-top: 20px;
        }

        .pb-20 {
          padding-bottom: 20px;

        }

        .bottom_div_ad1 {
          line-height: normal;
          width: 100%;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-image: linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)),
          url(/static/images/add2.png);
          text-align: center;
        }

        .bottom_div_ad1 p {
          font-size: 16px;
          color: #CED8E1;
          position: relative;
          vertical-align: middle;
        }

        .bottom_div_ad1 h5 {
          position: relative;
          color: #fff;
          font-weight: 600;
          font-size: 25px;
          padding: 0px 10px;
          vertical-align: middle;
        }

        .bottom_div_ad2 {
          line-height: normal;
          width: 100%;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-image: linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)),
          url(/static/images/add3.png);
          text-align: center;
        }

        .bottom_div_ad2 p {
          font-size: 16px;
          color: #CED8E1;
          position: relative;
          vertical-align: middle;
          line-height: normal;
        }

        .bottom_div_ad2 h5 {
          position: relative;
          color: #fff;
          font-weight: 600;
          font-size: 25px;
          padding: 0px 10px;
          vertical-align: middle;
        }

        .bottom_div_ad h5 {
          position: relative;
          color: #fff;
          font-weight: 600;
          font-size: 25px;
          padding: 0px 10px;
          vertical-align: middle;
          line-height: normal;
        }

        .a-tag:hover {
          text-decoration:none;
        }
    `}</style>
    </div>
  );
}

export default Blogs;
