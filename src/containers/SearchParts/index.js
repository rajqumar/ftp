import React, { useEffect, useState } from 'react';
import Layout from 'containers/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getProductData, getSearchFilters, seachFilterFormHandler, getSelectedSearchFilterData } from './actions';
import { useInjectSaga } from 'utils/inject-saga';
import { useInjectReducer } from 'utils/inject-reducer';
import reducer from './reducer';
import saga from './saga';
import Search from 'components/SearchInput';
import BrowsePartsByCategory from 'components/Home/BrowsePartsByCategory';
import Product from 'components/Cards/Product';
import Plain from 'components/Input';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import H2 from 'components/H2';
import PageLoader from 'components/Loaders/PageLoader';

export function SearchParts(props) {
  useInjectSaga({ key: 'product', saga });
  useInjectReducer({ key: 'product', reducer });

  const dispatch = useDispatch();
  const router = useRouter();
  const path = router.pathname;
  const query = router.query;
  const { handleSubmit } = props;
  const [keyword, setKeyword] = useState(router.query.searchvalue);
  const [category, setDetailView] = useState([]);
  const [isFilterSelected, setFilterSelected] = useState(false);
  const [ppeData, setppeData] = useState('');
  const productCategory = router.query.category;
  let sum = 0;
  const partNumbersList = [];
  let partAndSuppplierList;
  let isHealthCareProduct = false;

  useEffect(() => {
    dispatch(getProductData());
    dispatch(getProductData(router.query.searchvalue));
    dispatch(getSearchFilters());
    setKeyword(router.query.searchvalue);
  }, []);

  const searchedProductDetail = useSelector(state => {
    if (
      state.product != undefined &&
      Object.keys(state.product.searchedProductDetail).length > 0 &&
      state.product.searchedProductDetail.search_result &&
      state.product.searchedProductDetail.search_result.length > 0
    ) {
      return state.product.searchedProductDetail.search_result;
    }
  });

  useEffect(() => {
    if (productCategory != null) {
      const ppedetailViewData = showDetailView(productCategory);
      setppeData(ppedetailViewData);
    }
  }, [searchedProductDetail]);

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

  const categoryCountList = useSelector(state => {
    if (
      state.product != undefined &&
      Object.keys(state.product.searchedProductDetail).length > 0 &&
      state.product.searchedProductDetail.category_count_list &&
      state.product.searchedProductDetail.category_count_list.length > 0
    ) {
      return state.product.searchedProductDetail.category_count_list;
    }
  });

  const carousalCategoryCountList = useSelector(state => {
    if (
      state.product != undefined &&
      Object.keys(state.product.supplierData).length > 0 &&
      state.product.supplierData.carousal_search_result != undefined &&
      Object.keys(state.product.supplierData.carousal_search_result).length > 0 &&
      state.product.supplierData.carousal_search_result.search_result
    ) {
      return state.product.supplierData.carousal_search_result.category_count_list;
    }
  });

  const categoryDetailView =
    carousalCategoryCountList != undefined
      ? carousalCategoryCountList
      : categoryCountList != undefined
      ? categoryCountList
      : '';

  const sellerNames = [];
  const manufacturerNames = [];
  const countryNames = [];

  const sellers = useSelector(state => {
    if (
      state.product != undefined &&
      Object.keys(state.product.searchFilters).length > 0 &&
      state.product.searchFilters.sellers.length > 0
    ) {
      return state.product.searchFilters.sellers;
    }
  });

  const manufacturers = useSelector(state => {
    if (
      state.product != undefined &&
      Object.keys(state.product.searchFilters).length > 0 &&
      state.product.searchFilters.manufacturers.length > 0
    ) {
      return state.product.searchFilters.manufacturers;
    }
  });

  const countries = useSelector(state => {
    if (
      state.product != undefined &&
      Object.keys(state.product.searchFilters).length > 0 &&
      state.product.searchFilters.countries.length > 0
    ) {
      return state.product.searchFilters.countries;
    }
  });

  if (sellers && sellers.length > 0) {
    sellers.map(seller => {
      const sellerMetadata = {
        value: seller,
        name: seller,
      };
      sellerNames.push(sellerMetadata);
    });
  }

  if (manufacturers && manufacturers.length > 0) {
    manufacturers.map(manufacturer => {
      const manufacturerMetadata = {
        value: manufacturer,
        name: manufacturer,
      };
      manufacturerNames.push(manufacturerMetadata);
    });
  }

  if (countries && countries.length > 0) {
    countries.map(countrie => {
      const countriesMetadata = {
        value: countrie,
        name: countrie,
      };
      countryNames.push(countriesMetadata);
    });
  }

  const onChange = e => {
    if (e.target.type == 'select-one') {
      setFilterSelected(true);
      const filterSearchMetadata = {
        name: e.target.name,
        value: e.target.value,
      };

      if (e.target.name == 'Country') {
        dispatch(getProductData('n'));
      } else {
        dispatch(getProductData(e.target.value));
      }

      dispatch(getSelectedSearchFilterData(filterSearchMetadata));
    }
  };

  const productDetails = useSelector(state => {
    if (
      state.product != undefined &&
      Object.keys(state.product.supplierData).length > 0 &&
      state.product.supplierData &&
      state.product.supplierData.length > 0
    ) {
      return state.product.supplierData;
    }
  });

  const carousalCategoryDetails = useSelector(state => {
    if (
      state.product != undefined &&
      Object.keys(state.product.supplierData).length > 0 &&
      state.product.supplierData.carousal_search_result != undefined &&
      Object.keys(state.product.supplierData.carousal_search_result).length > 0 &&
      state.product.supplierData.carousal_search_result.search_result
    ) {
      return state.product.supplierData.carousal_search_result.search_result;
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

  let categoryMetadata = {};
  const showDetailView = e => {
    const categoryProductList = [];
    let categoryProducts = null;

    if (searchedProductDetail != undefined) {
      {
        Object.keys(searchedProductDetail).map(product => {
          Object.keys(searchedProductDetail[product]).map(poductKey => {
            const productDetail = searchedProductDetail[product][poductKey];
            categoryProducts = productDetail.filter(
              singleProduct => singleProduct.category === (e.target == undefined ? e : e.target.getAttribute('value'))
            );
            if (categoryProducts.length > 0) {
              categoryMetadata = {
                [poductKey]: categoryProducts,
              };
              categoryProductList.push(categoryMetadata);
              setDetailView(categoryProductList);
            }
          });
        });
      }
    }
    return categoryProductList;
  };

  const noRecordsFound = (
    <div className="box box-widget">
      <div className="box-header with-border">
        <div className="row">
          <div className="col-md-6">
            <h5 className="head_test">
              <p className="instr_head">
                <span className="part_no_instr"></span>
              </p>
            </h5>
          </div>
        </div>
      </div>
      <div className="box-body">
        <div className="table-responsive">
          <table id="example1" className="table table-bordered">
            <thead>
              <tr>
                <th>
                  <p className="table_head">Wish List</p>{' '}
                </th>
                <th>
                  <p className="table_head">
                    Manufacturer
                    <br /> Part No.
                  </p>
                </th>
                <th>
                  <p className="table_head">Manufacturer</p>
                </th>
                <th>
                  <p className="table_head">Description</p>
                </th>
                <th>
                  <p className="table_head">Available Qty</p>
                </th>
                <th>
                  <p className="table_head">Date Code</p>
                </th>
                <th>
                  <p className="table_head"> Unit Price (USD)</p>
                </th>
                <th>
                  <p className="table_head">MOQ </p>
                </th>
                <th>
                  <p className="table_head">Packaging</p>
                </th>
                <th>
                  <p className="table_head">Supplier Info </p>
                </th>
              </tr>
            </thead>
          </table>
          <tbody>
            <tr>
              {searchedProductDetail == undefined && allSearchedProductDetail == undefined ? (
                <PageLoader text="Loading..." />
              ) : (
                <div className="no-records">
                  <H2 data={'No records found.'}></H2>{' '}
                </div>
              )}
            </tr>
          </tbody>
        </div>
      </div>
    </div>
  );

  // const showMedicalProductsView = () => {
  //   router.push(`/search?searchvalue=n&search=&healthcare=${true}&category=null`);
  //   dispatch(getProductData('n'));
  // };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <div className="search_part ">
            <div className="container">
              <div className="row p-0-20">
                <h3 className="search_head">{'Fast Transaction'}</h3>
                <div className="row w-100">
                  <div className="col-md-8">
                    <div className="span12">
                      <Search
                        partAndSuppplierList={partAndSuppplierList}
                        SearchedKeyword={keyword == 'n' ? '' : keyword}
                        isKeywordSearch={false}
                      />
                      {productCategory != undefined && productCategory != 'null' ? (
                        ''
                      ) : (
                        <div className="strip_search">
                          <div className="container">
                            <p>
                              HelloFTP is the easiest Search engine for electronic parts. Search across hundreds of
                              suppliers and thousands of manufacturers.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* {categoryDetailView != undefined
                    ? Object.keys(categoryDetailView).map((category, q) => {
                        return (
                          <React.Fragment key={q}>
                            {Object.keys(categoryDetailView[category]).map(category_name => {
                              return query.healthcare == undefined && category_name == 'Integrated Circuits' ? (
                                <div className="col-md-4">
                                  <div className="row">
                                    <center>
                                      <button
                                        type="button"
                                        className="button-3"
                                        onClick={() => router.push('/semiconductor')}>
                                        <div className="eff-3"></div>
                                        <a href="#" className="sem_head">
                                          Semiconductor & Electronics
                                        </a>
                                      </button>
                                      <button
                                        type="button"
                                        className="button-4"
                                        onClick={() => showMedicalProductsView()}>
                                        <div className="eff-4"></div>
                                        <a href="#" className="sem_head">
                                          {' '}
                                          Medical & Healthcare
                                        </a>
                                      </button>
                                    </center>
                                  </div>
                                </div>
                              ) : (
                                ''
                              );
                            })}
                          </React.Fragment>
                        );
                      })
                    : ''} */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {categoryDetailView != undefined
          ? Object.keys(categoryDetailView).map((category, q) => {
              return (
                <React.Fragment key={q}>
                  {Object.keys(categoryDetailView[category]).map(category_name => {
                    if (query.healthcare != undefined && category_name != 'Integrated Circuits') {
                      const category_count = categoryDetailView[category][category_name];
                      sum = sum + category_count;
                      isHealthCareProduct = true;
                    } else {
                      const category_count = categoryDetailView[category][category_name];
                      sum != 0 ? sum : (sum = sum + category_count);
                      isHealthCareProduct = false;
                    }
                    return path != '/search' ||
                      (query.healthcare == undefined && category_name == 'Integrated Circuits') ? (
                      <BrowsePartsByCategory />
                    ) : (
                      ''
                    );
                  })}
                </React.Fragment>
              );
            })
          : ''}
        <section className="parts_search_section">
          <div className="container-fluid">
            {query.healthcare != undefined || isHealthCareProduct ? (
              <div className="row">
                <div className="section text-center med_center_sec">
                  <h2 className="health_welness_head">Medical & Healthcare</h2>
                  <p className="ppe_kit">PPE (Personal protective equipment)</p>
                </div>
              </div>
            ) : (
              ''
            )}
            <div className="row">
              <div className="fliter_section">
                <div className="row">
                  <div className="col-md-2">
                    <div className="box box-widget">
                      <div className="box-header with-border">
                        <h5 className="head_test">
                          <FontAwesomeIcon icon={faSearch} width="12" />
                          &nbsp; Search Results ({sum})
                        </h5>
                      </div>

                      {categoryDetailView != undefined
                        ? Object.keys(categoryDetailView).map((category, q) => {
                            if (query.healthcare) {
                              return (
                                <React.Fragment key={q}>
                                  {Object.keys(categoryDetailView[category]).map((category_name, l) => {
                                    if (category_name != 'Integrated Circuits') {
                                      const category_count = categoryDetailView[category][category_name];
                                      return (
                                        <div className="box-body" key={l}>
                                          <div className="search_result">
                                            <span className="resut_part" value={category_name} onClick={showDetailView}>
                                              {category_name}
                                              <span className="no_product">({category_count})</span>
                                            </span>
                                            <div className="clearfix"></div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  })}
                                </React.Fragment>
                              );
                            }
                            return (
                              <React.Fragment key={q}>
                                {Object.keys(categoryDetailView[category]).map((category_name, l) => {
                                  const category_count = categoryDetailView[category][category_name];
                                  return (
                                    <div className="box-body" key={l}>
                                      <div className="search_result">
                                        <span className="resut_part" value={category_name} onClick={showDetailView}>
                                          {category_name}
                                          <span className="no_product">({category_count})</span>
                                        </span>
                                        <div className="clearfix"></div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </React.Fragment>
                            );
                          })
                        : ''}
                    </div>
                    <div className="box box-widget">
                      <div className="box-header with-border">
                        <h5 className="head_test">
                          <FontAwesomeIcon icon={faFilter} width="12" />
                          &nbsp;&nbsp; Filters
                          <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="btn btn-success reset-btn"
                            disabled={!isFilterSelected}>
                            Reset
                          </button>
                        </h5>
                      </div>
                      <div className="box-body">
                        <form id="msform" onSubmit={handleSubmit(seachFilterFormHandler)}>
                          <fieldset className="padding_form">
                            <div className="form-group">
                              <label htmlFor="keyword" className="fl-left">
                                Keywords
                              </label>
                              <br />
                              <div>
                                <Search
                                  partAndSuppplierList={partAndSuppplierList}
                                  SearchedKeyword={keyword == 'n' ? '' : keyword}
                                  isKeywordSearch={true}
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <Plain
                                data={{
                                  label: 'Supplier',
                                  dynamicClass: 'fl-left',
                                  dropdownData: sellerNames,
                                  type: 'dropdown',
                                  defaultOption: 'Any',
                                  name: 'Supplier',
                                  onChange: onChange,
                                }}
                              />
                            </div>
                            <div className="form-group">
                              <Plain
                                data={{
                                  label: 'Manufacturer',
                                  dynamicClass: 'fl-left',
                                  dropdownData: manufacturerNames,
                                  type: 'dropdown',
                                  defaultOption: 'Any',
                                  name: 'Manufacturer',
                                  onChange: onChange,
                                }}
                              />
                            </div>
                            <div className="form-group">
                              <Plain
                                data={{
                                  label: 'Country of origin',
                                  dynamicClass: 'fl-left',
                                  dropdownData: countryNames,
                                  type: 'dropdown',
                                  defaultOption: 'Any',
                                  name: 'Country',
                                  onChange: onChange,
                                }}
                              />
                            </div>
                          </fieldset>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-10 pl-0">
                    {(searchedProductDetail == undefined &&
                      productDetails == undefined &&
                      carousalCategoryDetails == undefined) ||
                    (carousalCategoryDetails
                      ? carousalCategoryDetails.length == 0
                      : '' || (productCategory && productCategory != 'null' && ppeData.length == 0)) ? (
                      noRecordsFound
                    ) : (
                      <Product
                        searchedProductDetail={searchedProductDetail}
                        productDetails={productDetails}
                        categoryProductList={category}
                        carousalCategoryDetails={carousalCategoryDetails}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <style>{`
          .search_part {
            background-color: #d31e25;
            padding: 0px;
            margin-top: 85px;
          }

          .search_part_position {
            background-color: #d31e25;
            padding: 0px;
            margin-top: 77px !important;
          }
.w-100
{
width:100%;
}
          .p-0-20 {
            padding: 0 20px;
          }

          .tbody-bg-color {
            background-color: #f0efef;
          }
          
          .search_head {
            width: 100%;
            color: #fff;
            font-weight: 600;
            font-size: 24px;
            margin-top: 8px;
            margin-bottom: 8px;
          }
          .med_center_sec
          {
            width:100%;
          }
.sem_head
{
  font-size:27px !important;
}
          .strip_search p {
            color: #fff;
            padding: 15px 0;
            margin: 0px 0px 0px -10px;
          }

          .reset-btn {
            float: right;
            background-color: #6DC144;
            border: 1px solid #6DC144;
            border-radius: 50px;
            font-size: 14px;
            padding: 0px 20px;
          } 

          .no-records {
            margin-left: 500px;
          }
          .table_head
          {
            font-size:14px;
            text-align:center;
          }
          .body_table
          {
            font-size:14px;

          }
          .parts_search_section {
            margin-top:30px;
            padding:0px 10px;
            width:100%;
          }
          .pl-0
          {
            padding-left:0px !important;
          }
          .advertisement {
            margin:20px 0;
          }

          .centered {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .fliter_section {
            padding:0px 15px;
            width:100%;
          }
          
          .rating__icon {
            pointer-events: none;
          }
          
          .rating__icon--none {
            color: #eee;
          }

          .rating__input--none:checked + .rating__label .rating__icon--none {
            color: red;
          }
        
          .rating__input:checked ~ .rating__label .rating__icon--star {
            color: #ddd;
          }

          .rating__icon--star {
            color: orange;
          }

          .box-widget {
            border: 1px solid #e1dede;
            position: relative;
          }
          
          .box {
            position: relative;
            border-radius: 3px;
            background: #ffffff;
            border: 1px solid #ececec;
            margin-bottom: 20px;
            width: 100%;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1)
          }

          .box-header {
            color: #444;
            display: block;
            padding: 10px;
            position: relative
          }

          .box-header.with-border {
            border-bottom: 1px solid #e9e5e5;
          }
        
          .collapsed-box .box-header.with-border {
            border-bottom: none
          }

          .box-header:after,
          .box-body:after,
          .box-footer:after {
            clear: both
          }
          
          .head_test {
	          font-size: 16px;
            font-weight: 700;
          }

          .box-body {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-bottom-right-radius: 3px;
            border-bottom-left-radius: 3px;
            padding: 10px
          }

          .resut_part {
            background: #d2232a;
            padding: 5px 10px;
            border-radius: 15px;
            color: #fff;
            font-size:12px;
            margin-bottom: 10px !important;
            cursor: pointer;
          }

          #msform {
            text-align: center;
            position: relative;
            width:100%;
          }

          .padding_form {
            padding:0px 10px !important;
          }

          .fl-left {
            float:left;
            font-size:14px;
          }

          .form-control {
            border-radius: 0;
            box-shadow: none;
            font-size:14px !important;
            border-color: #d2d6de;
            border-radius:.25rem !important;
          }

          .table-responsive {
            overflow: auto;
          }

          .table-responsive >.table tr th,
          .table-responsive >.table tr td {
            white-space: normal !important
          }

          .box-body >.table {
            margin-bottom: 0
          }

          .table-bordered {
            border: 1px solid #f4f4f4
          }
        
          .table-bordered>thead>tr>th,
          .table-bordered>tbody>tr>th,
          .table-bordered>tfoot>tr>th,
          .table-bordered>thead>tr>td,
          .table-bordered>tbody>tr>td,
          .table-bordered>tfoot>tr>td {
              border: 1px solid #f4f4f4
          }
        
          .table-bordered>thead>tr>th,
          .table-bordered>thead>tr>td {
              border-bottom-width: 2px
          }

          .table-striped>tbody>tr:nth-of-type(odd) {
            background-color: #f0efef;
          }

          .red_name {
            margin:0px;
            color:#D2232A;
          }

          .btn_active {
            background-color: #6DC144;
            border: 1px solid #6DC144;
            border-radius: 50px;
            font-size: 14px;
            padding: 0px 20px;
          }

          .mb-0 {
	          margin-bottom:0px;
          }

          .mob_icon {
            font-size:24px;
            margin-right:5px;
            color:#D2232A;
          }

          .mail_icon {
            font-size:20px;
            color:#D2232A;
          }

          .btn_inactive {
            background-color: #D31E25;
            border: 1px solid #D31E25;
            border-radius: 50px;
            font-size: 14px;
            padding: 0px 15px;
          }

          label {
            display: inline-block;
            max-width: 100%;
            margin-bottom: 5px;
            font-weight: 700;
          }

          body {
            font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-weight: 400;
          }

          .pagination>li>a {
            background: #fafafa;
            color: #666
          }
        
          .pagination.pagination-flat>li>a {
            border-radius: 0 !important
          }

          .red_back { 
            background-color:#d2232a !important;
            color:#fff !important;
          }
          
          .health_welness_head {
            text-align: center;
            font-weight: bold;
            font-size: 36px;
            margin-bottom: 0px;
            margin-top:0px;
          }
          .ppe_kit
          {
            font-size:18px;
            margin-bottom:40px;
            font-weight:700;
          }

          .button-3 {
            width: 60%;
            padding: 10px 12px;
            border: 1px solid #fff;
            text-align: center;
            cursor: pointer;
            background:transparent;
            margin-top: -15px;
            border-radius: 5px;
            position: relative;
            box-sizing: border-box;
            overflow: hidden;
          }

          .button-3 a {
            font-size: 14px !important;
            color: #fff;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.5s ease;
            z-index: 2;
            position: relative;
          }

          .button-3:hover .eff-3 {
            bottom: 0;
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
            background:transparent;
            border-radius: 5px;
            position: relative;
            box-sizing: border-box;
            overflow: hidden;
          }

          .button-4 a {
            font-size: 14px !important;
            color: #fff;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.5s ease;
            z-index: 2;
            position: relative;
          }

          .button-4:hover .eff-4 {
            bottom: 0;
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

    `}</style>
      </div>
    </Layout>
  );
}

SearchParts.propTypes = {
  handleSubmit: PropTypes.func,
};

export default reduxForm({ form: 'searchparts' })(SearchParts);
