import React from 'react';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

function LatestUpdatesIndustryInformation() {
  return (
    <div className="col-md-6">
      <h5 className="about_ftp">Latest Updates & Industry Information </h5>
      <div className="line"></div>
      <ul className="list_man lat_updates">
        <Link
          href="https://www.thebalancesmb.com/business-continuity-plan-to-protect-your-company-4156386?utm_term=sample+of+business+continuity+plan&utm_content=p1-main-3-title&utm_medium=sem&utm_source=msn_s&utm_campaign=adid-ce7353b5-f4bb-4db5-9b13-8fde628ef70e-0-ab_msb_ocode-31752&ad=semD&an=msn_s&am=broad&q=sample+of+business+continuity+plan&o=31752&qsrc=999&l=sem&askid=ce7353b5-f4bb-4db5-9b13-8fde628ef70e-0-ab_msb"
          prefetch={false}>
          <a className="a-tag" target="_blank">
            <li>
              <span>
                <FontAwesomeIcon icon={faSnowflake} className="li_icon" />
              </span>
              How a Business Continuity Plan Can Protect Your Company – Given the Covic 19 Pandamic
            </li>
          </a>
        </Link>
        <Link href="https://www.thebalancesmb.com/how-to-create-a-disaster-recovery-plan-2533799" prefetch={false}>
          <a className="a-tag" target="_blank">
            <li>
              <span>
                <FontAwesomeIcon icon={faSnowflake} className="li_icon" />
              </span>
              How to Create a Disaster Recovery Plan – When Your Strategic Supply Chain is disrupted
            </li>
          </a>
        </Link>

        <li>
          <span>
            <FontAwesomeIcon icon={faSnowflake} className="li_icon" />
          </span>
          Strategic sourcing to significant cost reduction
        </li>
        <li>
          <span>
            <FontAwesomeIcon icon={faSnowflake} className="li_icon" />
          </span>
          Plastic Packaging Procurement Research
        </li>
        <li>
          <span>
            <FontAwesomeIcon icon={faSnowflake} className="li_icon" />
          </span>
          Solutions for Chemical Purchasing and Procurement{' '}
        </li>
        <li>
          <span>
            <FontAwesomeIcon icon={faSnowflake} className="li_icon" />
          </span>
          A comprehensive for assessing supply performance
        </li>
        <li>
          <span>
            <FontAwesomeIcon icon={faSnowflake} className="li_icon" />
          </span>
          Strategic sourcing to significant cost reduction
        </li>
      </ul>
      <style>{`
  
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
            .a-tag:hover{
              text-decoration:none;
          }
            .list_man {
                list-style: none;
                margin-left: -40px;
                margin-bottom: 0px;
            }
            .lat_updates li {
                border-bottom: none !important;
                font-size: 14px !important;
                font-weight: 400 !important;
                margin-bottom: 5px;
            }
            .list_man li {
                color: #423636;
                font-weight: 600;
                line-height: 20px;
                margin-bottom:15px;
                padding: 0px 10px;
                font-size: 14px;
                border-bottom: 1px dashed #e2dfdfab;
                cursor: pointer;
                text-transform: capitalize;
            }
            .li_icon {
              padding-right: 5px;
              color: #333;
              font-size: 15px;
              margin-top: 2px;
            }
            .lat_updates li:hover {
                background-color: transparent !important;
                color: #D31E25 !Important;
            }
            .list_man li:hover {
                background-color: #d31e25;
                color: #fff;
            }
    `}</style>
    </div>
  );
}
export default LatestUpdatesIndustryInformation;
