import React from 'react';
import Layout from 'containers/Layout';
import Search from 'components/SearchInput';
import FTPValueAddedServices from 'components/FTPValueAddedServices';
import NewClearanceSell from 'components/NewClearanceSell';
import BrowsePartsByCategory from 'components/BrowsePartsByCategory';
import NewBlockchainProcureMent from 'components/NewBlockchainProcureMent';
import NewHotDeals from 'components/NewHotDeals';
import ReverseAuction from 'components/ReverseAuction';
import GroupBy from 'components/GroupBy';
import Blogs from 'components/Blog';

export function CreateAdmin() {
  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <div className="search_part ">
            <div className="container">
              <div className="row p-0-20 ">
                <h2 className="seadrch_head">{'Fast Transaction'}</h2>
                <div className="row w-100">
                  <div className="col-md-8">
                    <div className="span12">
                      <Search  isKeywordSearch={false}/>
                      
                      <div className="strip_search">
                        <div className="container">
                          <p>
                            HelloFTP is the easiest Search engine for electronic parts. Search across hundreds of
                            suppliers and thousands of manufacturers.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BrowsePartsByCategory />
        <div className="browse_by_category">
          <div className="container">
            <div className="row order_contain">
              <div className="col-md-9 one">
                <FTPValueAddedServices />
                <NewBlockchainProcureMent />
              </div>
              <div className="col-md-3 two">
                <NewHotDeals />
                <NewClearanceSell />
                <br />
                <GroupBy />
                <ReverseAuction />
              </div>
            </div>
            <Blogs />
          </div>
        </div>
        <style jsx>{`
          .search_part {
            background-color: #d31e25;
            padding: 0px;
            margin-top: 85px;
          }
          . w-100 {
            width: 100%;
          }
          .p-0-20 {
            padding: 0 20px;
          }
          .seadrch_head {
            color: #fff;
            font-weight: 600;
            font-size: 24px;
            margin-top: 8px;
            margin-bottom: 8px;
          }
          .strip_search p {
            color: #fff;
            padding: 15px 0;
            margin: 0px 0px 0px -10px;
          }
        `}</style>
      </div>
    </Layout>
  );
}

export default CreateAdmin;
