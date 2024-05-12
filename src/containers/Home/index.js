import React, { useEffect } from 'react';
import Layout from 'containers/Layout';
import Search from 'components/SearchInput';
import FTPValueAddedServices from 'components/Home/FTPValueAddedServices';
import NewClearanceSell from 'components/Home/NewClearanceSell';
import BrowsePartsByCategory from 'components/Home/BrowsePartsByCategory';
import NewBlockchainProcureMent from 'components/Home/NewBlockchainProcureMent';
import NewHotDeals from 'components/Home/NewHotDeals';
import ReverseAuction from 'components/Home/ReverseAuction';
import GroupBy from 'components/Home/GroupBy';
import Blogs from '../../components/Home/Blogs';
import { useDispatch, useSelector } from 'react-redux';
import { getProductData } from 'containers/SearchParts/actions';
import saga from 'containers/SearchParts/saga';
import reducer from 'containers/SearchParts/reducer';
import { useInjectSaga } from 'utils/inject-saga';
import { useInjectReducer } from 'utils/inject-reducer';
import { useRouter } from 'next/router';

export function Home() {
  useInjectSaga({ key: 'product', saga });
  useInjectReducer({ key: 'product', reducer });
  const router = useRouter();
  const path = router.pathname;

  const dispatch = useDispatch();
  const partNumbersList = [];
  useEffect(() => {
    dispatch(getProductData());
  }, []);

  let partAndSuppplierList;
  const allSearchedProductDetail = useSelector(state => {
    if (
      state.product != undefined &&
      Object.keys(state.product.allSearchedProductDetail).length > 0 &&
      state.product.allSearchedProductDetail.all_search_result &&
      state.product.allSearchedProductDetail.all_search_result.length > 0
    ) {
      return state.product.allSearchedProductDetail.all_search_result;
    }
  });

  const removeDuplicates = array => {
    return array.filter((a, b) => array.indexOf(a) === b);
  };

  if (allSearchedProductDetail != undefined) {
    {
      Object.keys(allSearchedProductDetail).map(product => {
        Object.keys(allSearchedProductDetail[product]).map(poductKey => {
          const productDetail = allSearchedProductDetail[product][poductKey];
          {
            productDetail.length > 0
              ? productDetail.map(singleProduct => {
                  partNumbersList.push(singleProduct.part_number, singleProduct.seller);
                  partAndSuppplierList = removeDuplicates(partNumbersList);
                })
              : '';
          }
        });
      });
    }
  }

  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <div className="search_part ">
            <div className="container">
              <div className="row p-0-20 ">
                <h3 className="search_head">{'Fast Transaction'}</h3>
                <div className="row w-100">
                  <div className="col-md-8">
                    <div className="span12">
                      <Search
                        partAndSuppplierList={partAndSuppplierList}
                        SearchedKeyword={''}
                        isKeywordSearch={false}
                      />
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
                  {/* {path == '/semiconductor' || path == '/healthcare' ? (
                    <div className="col-md-4">
                      <div className="row">
                        <center>
                          <button type="button" className="button-3" onClick={() => router.push('/semiconductor')}>
                            <div className="eff-3"></div>
                            <a href="#"> Semiconductor & Electronics</a>
                          </button>
                          <button
                            type="button"
                            className="button-4"
                            onClick={() =>
                              router.push(`/search?searchvalue=n&search=&healthcare=${true}&category=null`)
                            }>
                            <div className="eff-4"></div>
                            <a href="#"> Medical & Healthcare</a>
                          </button>
                        </center>
                      </div>
                    </div>
                  ) : (
                    ''
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {path == '/semiconductor' ? <BrowsePartsByCategory /> : ''}
        <div className="browse_by_category">
          <div className="container">
            {path != '/semiconductor' && path != '/healthcare' ? (
              <div className="row">
                <div className="top_two_banner">
                  <div className="col-md-6 ">
                    <a href="/semiconductor">
                      <div className="semi_video">
                        <div className="fda_img">
                          <img src="/static/images/thum_sem.png" className="img-responsive" />
                        </div>
                        <div className="text-holder">
                          <div className="text-inner">
                            <a href="/semiconductor">
                              {' '}
                              <h1 className="sem_head">Semiconductor & Electronics</h1>
                            </a>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col-md-6 ">
                    <a href={`/search?searchvalue=n&search=&healthcare=${true}&category=null`}>
                      <div className="semi_video">
                        <div className="fda_img">
                          <img src="/static/images/fda_final.png" className="img-responsive" />
                        </div>
                        <div className="text-holder-img">
                          <div className="text-inner">
                            <a href={`/search?searchvalue=n&search=&healthcare=${true}&category=null`}>
                              {' '}
                              <h1 className="sem_head">Medical & Healthcare</h1>
                            </a>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}

            <div className="row order_contain_home">
              <div className="col-md-9 one">
                <FTPValueAddedServices />
                <NewBlockchainProcureMent />
                {path != '/semiconductor' ? <Blogs /> : ''}
              </div>

              <div className="col-md-3 two">
                {path != '/semiconductor' ? (
                  <div className="single-product">
                    <div className="product-pro-img">
                      <img src="/static/images/covide.jpg" alt="" className="img-responsive" />
                    </div>
                    <div className="product-pro-title">
                      <h3>
                        <a href="" className="black_head">
                          <span className="red_name">Corona</span> Virus Is now World Thread in 2020.
                        </a>
                      </h3>
                    </div>
                    <div className="product-pro-price">
                      <p>
                        Coronavirus disease (COVID-19) is an infectious disease caused by a newly discovered
                        coronavirus.
                      </p>
                      <a href="" className="bttn-small btn-fill">
                        Know More
                      </a>
                      <div className="clearfix"></div>
                      <br />
                    </div>
                  </div>
                ) : (
                  ''
                )}

                <NewHotDeals />
                <NewClearanceSell />
                <br />
                <GroupBy />
                <ReverseAuction />
              </div>
            </div>
            {path == '/semiconductor' ? <Blogs /> : ''}
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
          .search_head {
            width: 100%;
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
          .sem_head {
            font-size: 27px !important;
          }
          .browse_by_category {
            width: 100%;
          }

          .top_two_banner {
            padding: 50px 70px 0px 70px;
            margin-bottom: 20px;
            margin-left: 40px;
            display: inherit;
          }
          .know_more {
            text-decoration: underline;
            color: red;
          }

          .semi_video {
            -webkit-box-shadow: 0px -1px 10px 0px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 0px -1px 10px 0px rgba(0, 0, 0, 0.75);
            box-shadow: 0px -1px 10px 0px rgba(0, 0, 0, 0.75);
            padding: 5px;
            margin-right: 50px;
            background: #fff;
          }

          .semi_video_top {
            -webkit-box-shadow: 0px -1px 10px 0px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 0px -1px 10px 0px rgba(0, 0, 0, 0.75);
            box-shadow: 0px -1px 10px 0px rgba(0, 0, 0, 0.75);
            padding: 5px;
            background: #fff;
            margin-right: 0px;
          }

          .text-holder h1 {
            position: absolute;
            color: #fff;
            left: 20px;
            right: 0%;
            padding: 10px;
            font-weight: bold;
            font-size: 28px;
            background: #ffff99ba;
            width: 81.5%;
            bottom: 5px;
            text-shadow: 2px 2px #333;
            text-align: center;
          }

          .text-holder-img h1 {
            position: absolute;
            color: #fff;
            font-weight: bold;
            left: 20px;
            right: 0%;
            padding: 10px;
            font-size: 27px;
            text-shadow: 2px 2px #333;
            background: #deebf7c4;
            width: 82%;
            bottom: 5px;
            text-align: center;
          }

          .text-inner-top h1 {
            position: absolute;
            color: #fff;
            font-weight: bold;
            left: 20px;
            right: 0%;
            padding: 6px 10px;
            font-size: 15px;
            text-shadow: 2px 2px #333;
            background: #ffff99ba;
            width: 88%;
            bottom: 5px;
            text-align: center;
          }
          .text-inner-top-left h1 {
            position: absolute;
            color: #fff;
            font-weight: bold;
            left: 20px;
            right: 0%;
            padding: 6px 10px;
            font-size: 15px;
            text-shadow: 2px 2px #333;
            background: #deebf7c4;
            width: 88%;
            bottom: 5px;
            text-align: center;
          }

          .order_contain_home {
            margin-top: 0px;
          }

          .img-responsive {
            display: block;
            max-width: 100%;
            height: auto;
          }

          .button-3 {
            width: 60%;
            padding: 10px 12px;
            border: 1px solid #fff;
            text-align: center;
            cursor: pointer;
            margin-top: -15px;
            background: transparent;
            border-radius: 5px;
            position: relative;
            box-sizing: border-box;
            overflow: hidden;
          }

          .button-3 a {
            font-size: 14px;
            color: #fff;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.5s ease;
            z-index: 2;
            position: relative;
          }

          .button-3:hover a {
            color: #fff;
          }

          .button-3:hover .eff-3 {
            bottom: 0;
          }

          .button-3:hover .eff-3 {
            bottom: 0;
          }

          .eff-3 {
            width: 105%;
            height: 50px;
            margin-left: -20px;
            bottom: -50px;
            background: #f1b601;
            position: absolute;
            transition: all 0.5s ease;
            z-index: 1;
          }

          .button-4 {
            width: 60%;
            padding: 10px 12px;
            border: 1px solid #fff;
            text-align: center;
            margin-top: 10px;
            margin-bottom: 20px;
            cursor: pointer;
            background: transparent;
            border-radius: 5px;
            position: relative;
            box-sizing: border-box;
            overflow: hidden;
          }

          .button-4 a {
            font-size: 14px;
            color: #fff;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.5s ease;
            z-index: 2;
            position: relative;
          }

          .button-4:hover a {
            color: #fff;
          }

          .button-4:hover .eff-4 {
            bottom: 0;
          }

          .eff-4 {
            width: 105%;
            height: 50px;
            margin-left: -20px;
            bottom: -50px;
            background: #f1b601;
            position: absolute;
            transition: all 0.5s ease;
            z-index: 1;
          }

          .single-product {
            margin-bottom: 10px;
            background: #fff;
            border: 1px solid #d31e25;
            padding: 0px;
            margin-top: 40px;
            border-radius: 5px;
            box-shadow: 0px 0px 16px 4px rgba(0, 0, 0, 0.05);
          }

          .single-product .product-pro-img {
            margin-bottom: 20px;
          }

          .single-product .product-pro-title {
            margin-bottom: 10px;
            padding: 0px 10px;
          }

          .single-product .product-pro-title h3 {
            color: #333;
            font-size: 21px;
            font-weight: 600;
          }

          .single-product .product-pro-img img {
            border-radius: 5px 5px 0px 0px;
          }

          .product-pro-img:after {
            position: absolute;
            content: '';
            width: 40px;
            height: 40px;
            right: 26px;
            bottom: 20px;
            background: url(../public/static/images/triangle.png);
            animation: rotateCircle2 20s linear 0s infinite normal none running;
          }

          .black_head {
            color: #333;
            font-size: 21px;
            text-decoration: none;
          }
          .black_head:hover {
            color: #3c8dbc;
          }

          .red_name {
            margin: 0px;
            color: #d2232a;
          }

          .product-pro-price p {
            padding: 0px 10px;
          }

          .btn-fill {
            padding: 0px 10px;
            margin-bottom: 10px;
            color: #d31e25;
          }
        `}</style>
      </div>
    </Layout>
  );
}

export default Home;
