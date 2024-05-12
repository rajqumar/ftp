import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Carousel, CarouselItem, CarouselControl } from 'reactstrap';

const items = [
  {
    src: '/static/images/semi1.jpg',
    title: 'IC-87',
    offer_price: 'S$69',
    actual_price: 'S$79',
  },
  {
    src: '/static/images/semi1.jpg',
    title: 'IC-56',
    offer_price: 'S$59',
    actual_price: 'S$69',
  },
  {
    src: '/static/images/semi4.jpg',
    title: 'IC-91',
    offer_price: 'S$59',
    actual_price: 'S$89',
    status: 'Sold',
  },
  {
    src: '/static/images/semi4.jpg',
    title: 'IC-92',
    offer_price: 'S$50',
    actual_price: 'S$99',
  },
];

function NewClearanceSell() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const slides = items.map((item, index) => {
    return (
      <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={item.src}>
        <div className="item active  slider_clearance_Sell">
          <div className="row mar_car" key={index}>
            {items.map((item, i) => {
              return (
                <div key={i} className="col-md-6">
                  <div className="col-xs-6 pl-0 mb-20">
                    <div className="col-item">
                      <div className="photo">
                        <img src="/static/images/semi1.jpg" className="img-responsive" alt="a" />
                        {item.status ? <div className="ribbon orange">{item.status}</div> : ''}
                      </div>
                      <div className="info">
                        <div className="row">
                          <div className="price col-md-12">
                            <h5 className="produc_offer_name">
                              {item.title} <span className="product_price_offer">{item.actual_price}</span>
                            </h5>
                            <span className="actual_price">{item.offer_price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CarouselItem>
    );
  });

  return (
    <div className="hot_offer">
      <h5 className="hot_offer_head">
        <FontAwesomeIcon icon={faShoppingCart} width="12" />
        &nbsp; Clearance Sell
      </h5>
      <div className="hot_offer_slider">
        <div className="col-md-12 pl-0 pr-0">
          <Carousel activeIndex={activeIndex} next={next} previous={previous}>
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={next}
              style={{ marginLeft: '5px;' }}
            />
          </Carousel>
        </div>
      </div>

      <style>{`
      .hot_offer {
        border: 1px solid #D31E25;
        margin-top: 25px;
        border-radius: 5px;
    }
    .mar_car {
      margin: 0px 0px 0px 7px;
  }
  .col-item {
    border: 1px solid #d31e25;
    border-radius: 5px 5px 7px 7px;
    background: #FFF;
    cursor: pointer;
}
.photo img {
  height: 95px;
  width: 80px !important;
}
span.carousel-control-next-icon {
  margin-left: 12px;
}
    .hot_offer_head {
        text-align: center;
        font-size: 18px;
        font-weight: 600;
        background: #D31E25;
        margin: 0px;
        padding: 10px 0;
        color: #fff;
        border-radius: 5px 5px 0 0;
    }
    .hot_offer_slider {
        overflow: hidden;
    }
    .slider_clearance_Sell {
      border: 1px solid #ebebeb;
      padding: 10px 5px;
      background: #ebebeb;
  }
    .hot_offer_ul {
        list-style:none;
        position:relative;
        margin-left:-40px;
        margin-bottom:0px;
      }
      .hot_offer_ul li:last-child {
        border-bottom:none;
      
      }
      .actual_price
{
		text-align:right !important;
		float:right;
		font-size:14px !Important;
		font-weight:600;
		color:#fff;
		margin-top:-5px;
}
        .pr-0 {
            padding-right: 0px !important;
        }
        
        .pl-0 {
            padding-left: 0px !important;
        }
        pr-0 {
            padding-right: 0px !important;
        }
        
        .pl-0 {
            padding-left: 0px !important;
        }
        .mb-20
{
	margin-bottom:20px !important;
}
.col-item
{
       border: 1px solid #d31e25;
    border-radius: 5px 5px 7px 7px;
    background: #FFF;
    cursor: pointer;
}
.col-item:hover
{
	border:1px solid #F1B600;
	border-radius:5px 5px 5px 5px;
}
.col-item .photo img
{
    margin: 0 auto;
    width: 100%;
	border-radius:5px;

}

.col-item .info
{
    padding: 5px;
    border-radius: 0 0 5px 5px;
    margin-top: 1px;
	background-color:#d31e25;
}

.col-item:hover .info {
    background-color: #F1B600;
}
.col-item .price
{
    float: left;
    margin-top: 5px;
}

.col-item .price h5
{
    line-height: 13px;
}

.price-text-color
{
    color: #219FD1;
}
.produc_offer_name
{
	color: #fff;
    font-size: 14px;
    margin-bottom: 5px;
    margin-top: 0px;
    font-weight: 500;
}
.product_price_offer
{
		color:#fff;
		float:right;

}
.col-item .info .rating
{
    color: #777;
}

.col-item .rating
{
    float: left;
    font-size: 17px;
    text-align: right;
    line-height: 52px;
    margin-bottom: 10px;
    height: 52px;
}

.col-item .separator
{
    border-top: 1px solid #E1E1E1;
}

.clear-left
{
    clear: left;
}

.col-item .separator p
{
    line-height: 20px;
    margin-bottom: 0;
    margin-top: 10px;
    text-align: center;
}

.col-item .separator p i
{
    margin-right: 5px;
}
.col-item .btn-add
{
    width: 50%;
    float: left;
}

.col-item .btn-add
{
    border-right: 1px solid #E1E1E1;
}

.col-item .btn-details
{
    width: 50%;
    float: left;
    padding-left: 10px;
}
.photo img
{
	height:95px;
	width:80px !important;
}
.ribbon {
	position: absolute;
	z-index: 10;
	padding: 0px 7px;
	border-top-left-radius: 2px;
	border-bottom-left-radius: 2px;
	font-size: 15px;
	line-height: 32px;
	font-weight: bold;
	text-align: center;
	color: #fff;
	text-shadow: 0 1px 1px rgba(0,0,0,0.2);
	-webkit-box-shadow: 0 1px 1px rgba(0,0,0,0.2);
	-moz-box-shadow: 0 1px 1px rgba(0,0,0,0.2);
	box-shadow: 0 1px 1px rgba(0,0,0,0.2);
	zoom: 1;
	top: 0%; 
	right: 3%;
	min-width: 40%;
	max-width: 50%;
	height: 32px;

}
.orange {
	background: #FF9600;
}

.ribbon:after {
	content: "";
	position: absolute;
	z-index: -20;
	top: 100%;
	left: auto;
	border-style: solid;
	border-width: 0 0 10px 10px;
	right: 0;
}
.orange:after {
	border-color: transparent #DC5F0B;
}


.no-ribbon {
	height: 41px;
	position: absolute;
	z-index: 2000;
}

      `}</style>
    </div>
  );
}
export default NewClearanceSell;
