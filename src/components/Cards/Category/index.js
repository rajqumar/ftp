import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getSelectedSearchFilterData } from 'containers/SearchParts/actions';

function Category(props) {
  const { image, text, key } = props;
  const dispatch = useDispatch();

  const getCarouselCategory = () => {
    const filterSearchMetadata = {
      name: 'CarouselCategory',
      value: text,
    };
    dispatch(getSelectedSearchFilterData(filterSearchMetadata));
  };

  return (
    <div key={key} className="product">
      <div className="product-top">
        <div id="box-1" className="top-white-box" onClick={getCarouselCategory}>
          <span className="box-icon">
            <img src={image} className="img-responsive" />
          </span>
          <h5 className="box-title">{text}</h5>
        </div>
      </div>

      <style>
        {`
        .box-icon img
              {
                height: 97px;
                  width: 97px;
                  margin: 0px auto;
              }
              
          .box-title
            {
                  color: #333;
                font-weight: 400;
                font-size: 12px;
                line-height: 13px;
                margin-top:10px;
                word-break: break-word;
            }
      
              .top-white-box {
                display: block;
                background-color: #fff;
                border-radius: 3px;
                width: 120px;
                padding: 7px;
                height: 145px;
                text-align: center;
                box-shadow: 0 15px 45px 0 rgba(0, 0, 0, 0.05);
                transition: all 0.3s ease-in-out 0s;
                border: 1px solid #e1e0e0ba;
                transition: transform .5s ease;
                cursor: pointer;
            }
            
          
        .iconPrevious{
          cursor: pointer;
          background: #ccc;
          width: 40px;
          height: 130px;
        }
        .iconNext{
          cursor: pointer;
          background: #ccc;
          width: 40px;
          height: 130px;
        }
        .a-tag:hover{
          text-decoration:none;
      }

      .product-carousel-header {
        background: #4a4a4a;
        color: #ffffff;
        box-sizing: border-box;
        font-family: "Open Sans", sans-serif;
        padding: 10px 14px;
        width: 100%;
      }
      .product-carousel {
          background: #ffffff;
          box-sizing: border-box;
          padding: 0px 40px;
          width: 100%;
      }

      .product-carousel .product-top {
        width: 100%;
      }
      .product-carousel p,
      .product-carousel .product-image,
      .product-carousel img.review-stars {
        margin: 0 0 10px 0;
      }
      .product-carousel .product-image {
        align-self: flex-start;
        width: 100%;
      }
      img.review-stars {
        width: 100px;
        display: inline-block;
      }
      .product-carousel .product-name {
        font-weight: bold;
        display: -webkit-box;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
                flex-flow: column wrap;
        -webkit-box-pack: start;
                justify-content: flex-start;
        width: 100%;
      }
      .product-carousel .product-bottom {
        margin-top: auto;
        -webkit-box-align: end;
                align-items: flex-end;
      }
      .product-carousel .product-prices {
        display: -webkit-box;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
                flex-flow: row wrap;
        -webkit-box-flex: 1;
                flex: 1 0 100%;
        align-self: center;
      }
      .product-carousel .product-prices span {
        width: 100%;
      }
      .product-carousel .product-prices span.price-was {
        color: #a2a2a2;
        text-decoration: line-through;
      }
      .product-carousel .product-prices span.price-was:before {
        content: 'Was ';
      }
      .product-carousel .product-prices span.price-save {
        color: red;
      }
      .product-carousel .product-prices span.price-save:before {
        content: 'Save ';
      }
      .product-carousel .product-prices span.price-now {
        font-weight: bold;
      }
      .product-carousel .product-prices span.price-now:before {
        content: 'Now ';
      }
      .product-carousel button.shop-now {
        border: none;
        background-image: none;
        background-color: #4a4a4a;
        color: #ffffff;
        box-shadow: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        font-size: 16px;
        padding: 8px 10px;
        align-self: center;
      }
      .icon_sld {
        border: solid #000000;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 12px;
        position: absolute;
        top: calc(50% - 12px/2);
        cursor: pointer;
      }
      .right_pr {
        right: -20px;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
      }
      .left_pr {
        left: -20px;
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
      }
      .slick-slider {
        position: relative;
        box-sizing: border-box;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
        -khtml-user-select: none;
        touch-action: pan-y;
        -webkit-tap-highlight-color: transparent;
      }
      .slick-list {
        position: relative;
        overflow: hidden;
        margin: 0;
        padding: 0;
      }
      .slick-list:focus {
        outline: none;
      }
      .slick-list.dragging {
        cursor: pointer;
        cursor: hand;
      }
      .slick-slider .slick-track,
      .slick-slider .slick-list {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }
      .slick-track {
        display: -webkit-box;
        display: flex;
        position: relative;
        top: 0;
        left: 0;
      }
      .slick-loading .slick-track {
        visibility: hidden;
      }
      [dir='rtl'] .slick-slide {
        float: right;
      }
      .slick-slide.slick-loading img {
        display: none;
      }
      .slick-slide.dragging img {
        pointer-events: none;
      }
      .slick-loading .slick-slide {
        visibility: hidden;
      }
      .slick-vertical .slick-slide {
        height: auto;
        border: 1px solid transparent;
      }
      .slick-arrow.slick-hidden {
        display: none;
      }
      .pt-50
      {
        padding-top:50px;
      }
      

`}
      </style>
    </div>
  );
}

Category.propTypes = {
  link: PropTypes.string,
  image: PropTypes.string,
  text: PropTypes.string,
  key: PropTypes.integer,
};

export default Category;
