import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { faEnvelope, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

function Product(props) {
  const { searchedProductDetail, productDetails, categoryProductList, carousalCategoryDetails } = props;
  const router = useRouter();
  const query = router.query;
  const healthcareProductList = [];
  let isHealthCareProduct = false;
  const productDetailsData =
    productDetails != undefined &&
    searchedProductDetail != undefined &&
    productDetails.length > searchedProductDetail.length
      ? searchedProductDetail
      : productDetails != undefined
      ? productDetails
      : searchedProductDetail;

  if (query && query.healthcare != undefined && query.healthcare) {
    Object.keys(productDetailsData).map(product => {
      Object.keys(productDetailsData[product]).map(productkey => {
        const healthcareProductDetail = productDetailsData[product][productkey];
        const medicalProducts = healthcareProductDetail.filter(
          medicalproduct => medicalproduct.category != 'Integrated Circuits'
        );
        if (medicalProducts.length > 0) {
          const healthcareProductMetadata = {
            [productkey]: medicalProducts,
          };
          healthcareProductList.push(healthcareProductMetadata);
        }
      });
    });
  }

  const detailView =
    categoryProductList.length > 0
      ? categoryProductList
      : query.healthcare
      ? healthcareProductList
      : productDetailsData;
  const partDetailListing =
    carousalCategoryDetails != undefined && carousalCategoryDetails.length > 0 ? carousalCategoryDetails : detailView;
  const [expandedRows, setExpandedRows] = useState([]);
  const [expandedMedicalRows, setExpandedMedicalRows] = useState([]);
  const [favourites, setIsFavourite] = useState([]);

  const togglePartNo = td_id => {
    const currentExpandedRows = expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(td_id);
    const newExpandedRows = isRowCurrentlyExpanded
      ? currentExpandedRows.filter(id => id !== td_id)
      : currentExpandedRows.concat(td_id);
    setExpandedRows(newExpandedRows);
  };

  const toggleMedicalPart = part_id => {
    const currentExpandedMedicalRows = expandedMedicalRows;
    const isMediclRowCurrentlyExpanded = currentExpandedMedicalRows.includes(part_id);
    const newMedicalExpandedRows = isMediclRowCurrentlyExpanded
      ? currentExpandedMedicalRows.filter(id => id !== part_id)
      : currentExpandedMedicalRows.concat(part_id);
    setExpandedMedicalRows(newMedicalExpandedRows);
    setExpandedRows([]);
  };

  const handleRfq = (part_id, supplier_id) => {
    const token = window.localStorage.getItem('ftp_token');
    if (token) {
      router.push({ pathname: '/rfq/buy/create', query: { supp_id: supplier_id, part_id: part_id } });
    } else {
      window.localStorage.setItem('supplier_id', supplier_id);
      window.localStorage.setItem('part_id', part_id);
      query.category !== undefined && router.query.category != 'null'
        ? router.push(`/login?isppeuser=${true}`)
        : router.push('/login');
    }
  };

  const addAsFavourite = id => {
    const currentFavourites = favourites;
    const isFavouriteClicked = currentFavourites.includes(id);
    const newFavourites = isFavouriteClicked ? currentFavourites.filter(id => id !== id) : currentFavourites.concat(id);
    setIsFavourite(newFavourites);
  };

  return (
    <React.Fragment>
      {Object.keys(partDetailListing).map((product, i) => {
        return (
          <React.Fragment key={i}>
            {Object.keys(partDetailListing[product]).map((productkey, l) => {
              const productDetail = partDetailListing[product][productkey];
              return (
                <React.Fragment key={l}>
                  <div className="box box-widget">
                    <div className="box-header with-border">
                      <div className="row">
                        <div className="col-md-12">
                          <h5 className="head_test">
                            <img
                              src={
                                productDetail.length == 1
                                  ? productDetail[0].image
                                    ? productDetail[0].image
                                    : '/static/images/no_image.png'
                                  : productDetail[1].image
                                  ? productDetail[1].image
                                  : '/static/images/no_image.png'
                              }
                              className="img-responsive instru_img"
                              // height="70"
                              // width={
                              //   productDetail.length == 1
                              //     ? productDetail[0].image
                              //       ? productDetail[0].image
                              //       : 70
                              //     : productDetail[1].image
                              //     ? productDetail[1].image
                              //     : 'auto'
                              // }
                            />
                            {productDetail.length > 0
                              ? productDetail.map((singleproduct, hlp) => {
                                  return singleproduct.category == 'Integrated Circuits' ? (
                                    <p className="instr_head">
                                      <span className="part_no_instr">{productkey}</span>
                                    </p>
                                  ) : (
                                    <React.Fragment>
                                      <p
                                        className="instr_head ppe_product_underline"
                                        key={hlp}
                                        onClick={e => toggleMedicalPart(e.currentTarget.id)}
                                        id={singleproduct.id}>
                                        <span className="part_no_instr">{productkey}</span>
                                      </p>

                                      {expandedMedicalRows.includes(singleproduct.id) ? (
                                        <React.Fragment>
                                          <p className="hiddenRow">
                                            <div>
                                              <strong>{productkey}</strong>
                                              <br />
                                              {singleproduct.description.split('\n').map((desc, d) => (
                                                <p key={d}>{desc}</p>
                                              ))}
                                            </div>
                                          </p>
                                        </React.Fragment>
                                      ) : (
                                        ''
                                      )}
                                    </React.Fragment>
                                  );
                                })
                              : ''}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="box-body">
                      <div className="table-responsive">
                        <table id="example1" className="table table-bordered">
                          <thead>
                            <tr>
                              {productDetail.length > 0
                                ? productDetail.map((singleproduct, sgp) => {
                                    if (singleproduct.category == 'Integrated Circuits') {
                                      isHealthCareProduct = false;
                                      return (
                                        <th className="table_vert_align" key={sgp}>
                                          <p className="table_head">
                                            Manufacturer
                                            <br /> Part No.
                                          </p>
                                        </th>
                                      );
                                    } else {
                                      isHealthCareProduct = true;
                                      return (
                                        <th className="table_vert_align">
                                          <p className="table_head">
                                            {(query.category !== undefined && router.query.category != 'null') ||
                                            isHealthCareProduct
                                              ? 'Certificates'
                                              : 'Product Items'}
                                          </p>
                                        </th>
                                      );
                                    }
                                  })
                                : ''}

                              <th className="table_vert_align">
                                <p className="table_head">
                                  {isHealthCareProduct ? 'Manufacturing Country' : 'Manufacturer'}
                                </p>
                              </th>
                              {!isHealthCareProduct ? (
                                <th className="table_vert_align">
                                  <p className="table_head">
                                    Available <br />
                                    Quantity
                                  </p>
                                </th>
                              ) : (
                                ''
                              )}

                              {!isHealthCareProduct ? (
                                <th className="table_vert_align">
                                  <p className="table_head">
                                    Date <br />
                                    Code
                                  </p>
                                </th>
                              ) : (
                                ''
                              )}

                              <th className="table_vert_align">
                                <p className="table_head">
                                  Unit Price <br />
                                  (USD)
                                </p>
                              </th>
                              <th className="table_vert_align">
                                <p className="table_head">MOQ </p>
                              </th>
                              <th className="table_vert_align">
                                <p className="table_head">{isHealthCareProduct ? 'Lead Time' : 'Packaging'}</p>
                              </th>
                              <th className="table_vert_align">
                                <p className="table_head">Supplier Info </p>
                              </th>
                              <th className="table_vert_align">
                                <p className="table_head">RFQ</p>
                              </th>
                              <th className="table_vert_align">
                                <p className="table_head">Favourite</p>
                              </th>
                            </tr>
                          </thead>
                          {productDetail.length > 0
                            ? productDetail.map((singleproduct, k) => {
                                return (
                                  <React.Fragment key={k}>
                                    <tbody>
                                      <tr>
                                        <td className="table_vert_align">
                                          <p
                                            className="body_table part_no part_limit"
                                            onClick={e => togglePartNo(e.currentTarget.id)}
                                            id={singleproduct.id}>
                                            {(query.category !== undefined && router.query.category != 'null') ||
                                            isHealthCareProduct
                                              ? ''
                                              : productkey}
                                          </p>
                                          <p className="body_table part_no part_limit">
                                            {productDetail.length > 0
                                              ? productDetail.map((singleproduct, k) => {
                                                  return singleproduct.extra_data != null &&
                                                    singleproduct.extra_data != undefined &&
                                                    Object.keys(singleproduct.extra_data).length > 0 &&
                                                    singleproduct.extra_data.certificates &&
                                                    singleproduct.extra_data.certificates.length > 0 ? (
                                                    <div key={k} className="single_Certificate">
                                                      {singleproduct.extra_data.certificates.map((certificate, c) => {
                                                        return (
                                                          <React.Fragment key={c}>
                                                            {Object.keys(certificate).map(crtName => {
                                                              return (
                                                                <React.Fragment key={crtName}>
                                                                  <span className="cert_position">
                                                                    <a
                                                                      href={certificate[crtName]}
                                                                      rel="noopener noreferrer"
                                                                      target="_blank">
                                                                      <center>
                                                                        {' '}
                                                                        <img
                                                                          src={`/static/images/${crtName.substring(
                                                                            0,
                                                                            2
                                                                          )}.png`}
                                                                          height="10"
                                                                          className="certificate"
                                                                        />
                                                                      </center>
                                                                    </a>
                                                                  </span>
                                                                  <br />
                                                                </React.Fragment>
                                                              );
                                                            })}
                                                          </React.Fragment>
                                                        );
                                                      })}
                                                    </div>
                                                  ) : (
                                                    ''
                                                  );
                                                })
                                              : ''}
                                            <img
                                              src="/static/images/KYC.png"
                                              height="10"
                                              title="FTP Verified"
                                              className="certificate kyc"
                                            />
                                          </p>
                                        </td>
                                        {((query.healthcare != undefined && query.healthcare) ||
                                          singleproduct.category !== 'Integrated Circuits') &&
                                        singleproduct.extra_data != null &&
                                        singleproduct.extra_data != undefined &&
                                        Object.keys(singleproduct.extra_data).length > 0 &&
                                        singleproduct.extra_data.manufacturing_country ? (
                                          <td className="table_vert_align">
                                            <p className="body_table ">
                                              {singleproduct.extra_data.manufacturing_country}
                                            </p>
                                          </td>
                                        ) : isHealthCareProduct && singleproduct.extra_data === null ? (
                                          <td className="table_vert_align">
                                            <p className="body_table ">{'-'}</p>
                                          </td>
                                        ) : (
                                          <td className="table_vert_align">
                                            <p className="body_table ">{singleproduct.brand}</p>
                                          </td>
                                        )}

                                        {singleproduct.category == 'Integrated Circuits' ? (
                                          <React.Fragment>
                                            <td className="table_vert_align">
                                              <p className="body_table">{singleproduct.stock}</p>
                                            </td>
                                            <td className="table_vert_align">
                                              <p className="body_table">{singleproduct.dc}</p>
                                            </td>
                                          </React.Fragment>
                                        ) : (
                                          ''
                                        )}

                                        <td className="table_vert_align">
                                          <p className="body_table">From USD {singleproduct.unit_price}/pcs</p>
                                        </td>
                                        <td className="table_vert_align">
                                          <p className="body_table">{singleproduct.moq.toLocaleString()}</p>
                                        </td>
                                        {isHealthCareProduct &&
                                        singleproduct.extra_data != null &&
                                        singleproduct.extra_data != undefined &&
                                        Object.keys(singleproduct.extra_data).length > 0 &&
                                        singleproduct.extra_data.lead_time ? (
                                          <td className="table_vert_align">
                                            {singleproduct.extra_data.lead_time.split('\n').map((ld_time, ld) => (
                                              <p className="body_table" key={ld}>
                                                {ld_time}
                                              </p>
                                            ))}
                                          </td>
                                        ) : (
                                          <td className="table_vert_align">
                                            <p className="body_table">{singleproduct.packaging}</p>
                                          </td>
                                        )}
                                        <td className="table_vert_align">
                                          <p className="body_table">{singleproduct.seller}</p>
                                        </td>
                                        <td className="table_vert_align">
                                          <center>
                                            <FontAwesomeIcon
                                              icon={faEnvelope}
                                              width="12"
                                              className="mail_icon"
                                              onClick={() => handleRfq(singleproduct.id, singleproduct.seller_id)}
                                            />
                                          </center>
                                        </td>
                                        <td className="table_vert_align">
                                          <center>
                                            <div className="rating-group">
                                              <label aria-label="1 star" className="rating__label" htmlFor="rating-1">
                                                <FontAwesomeIcon
                                                  icon={faStar}
                                                  width="12"
                                                  id={singleproduct.id}
                                                  className={
                                                    favourites.includes(singleproduct.id)
                                                      ? 'rating__icon--star'
                                                      : 'rating__icon--empty_star'
                                                  }
                                                  onClick={e => addAsFavourite(e.currentTarget.id)}
                                                />
                                              </label>
                                            </div>
                                          </center>
                                        </td>
                                      </tr>

                                      {!isHealthCareProduct && expandedRows.includes(singleproduct.id) ? (
                                        <React.Fragment>
                                          <tr>
                                            <td colSpan="11" className="hiddenRow">
                                              <div>
                                                <strong>{productkey} </strong>
                                                <br />
                                                {singleproduct.description.split('\n').map((desc, d) => (
                                                  <p key={d}>{desc}</p>
                                                ))}
                                              </div>
                                            </td>
                                          </tr>
                                        </React.Fragment>
                                      ) : (
                                        ''
                                      )}
                                      {productDetail.length >= 3 ? (
                                        <tr key={l}>
                                          <td rowSpan="5">
                                            <p className="red_name">Show More(32)</p>
                                          </td>
                                        </tr>
                                      ) : (
                                        ''
                                      )}
                                    </tbody>
                                  </React.Fragment>
                                );
                              })
                            : ''}
                        </table>
                      </div>
                    </div>
                    <style>{`
                        .rating__label {
                            cursor: pointer;
                            padding: 0 0.1em;
                            font-size: 1.2rem;
                        }

                        .part_no {
                            color:red;
                            cursor:pointer;
                            text-decoration:underline;
                        }

                        .mail_icon {
                          font-size: 20px;
                          color: #D2232A;
                          cursor: pointer;
                        }
                        .table_vert_align
                        {
                          vertical-align: middle !Important;
                        }

                        .rating-group {
                            display: inline-flex;
                        }
                        .rating_new
                        {
                            margin-right:10px;
                        }
                        .rating__icon--empty_star {
                            color: grey;
                        }

                        rating__icon--star {
                          color: orange;
                        }

                        .body_table {
                            font-size:14px;
                            text-align:center;
                        }
                        .part_limit
                        {
                          width:200px;
                        }

                        .hiddenRow {
                          padding: 10px !important;
                          background-color: #eeeeee;
                          font-size: 13px;
                        }

                        .instr_head {
                            display: inline-block;
                            color: rgba(210, 35, 42, 1.0);
                            font-weight: 400;
                            padding-top: 0px;
                            padding-left: 10px;
                        }

                        .ppe_product_underline {
                          cursor: pointer;
                          text-decoration:underline;
                        }

                        .body_table
                        {
                          margin-bottom:0px;
                        }
                        .part_no_instr {
                            display: -webkit-box;
                            margin-top: 0px;
                            font-size: 24px;
                            font-weight: 600;
                        }
                        .table_head
                        {
                          margin-bottom:0px;
                        }
                        .instru_img {
                          display:inline-block;
                          height: 70px !important;
                        }

                        .single_Certificate {
                          display: inline-flex;
                        }

                        .certificate {
                          height: 30px;
                          margin: 0 auto;
                          text-align:center;
                        }

                        .kyc{
                          padding-top:2px;
                          height:30px;
                        }

                        .cert_name_color {
                          color: #333;
                        }

                        .cert_position {
                          margin-right: 10px;
                        }
                    `}</style>
                  </div>
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}

Product.propTypes = {
  searchedProductDetail: PropTypes.array,
  productDetails: PropTypes.array,
  categoryProductList: PropTypes.array,
  carousalCategoryDetails: PropTypes.array,
};

export default Product;
