import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Category from '../../Cards/Category';
import Slider from 'react-slick';

const partdata = [
  {
    title: 'parts',
    partMenu: [
      {
        menutitle: 'Audio',
      },
      {
        menutitle: 'Battery',
      },
      {
        menutitle: 'Capacitors',
      },
      {
        menutitle: 'Circuit Protection',
      },
      {
        menutitle: 'Coils',
      },
      {
        menutitle: 'Cables & Wires',
      },
      {
        menutitle: 'Connectors',
      },
      {
        menutitle: 'Diodes & Transistors',
      },
      {
        menutitle: 'Development Boards',
      },
      {
        menutitle: 'Discrete Semiconductor',
      },
      {
        menutitle: 'Fans & Thermal Management',
      },
      {
        menutitle: 'Filters',
      },
      {
        menutitle: 'Inductors',
      },
      {
        menutitle: 'Integrated Circuits',
      },
      {
        menutitle: 'Isolators',
      },
      {
        menutitle: 'Magnets & Heads',
      },
      {
        menutitle: 'Optoelectronics',
      },
      {
        menutitle: 'Potentiometers',
      },
      {
        menutitle: 'Relays',
      },
      {
        menutitle: 'Resistors',
      },
      {
        menutitle: 'Resonators',
      },
      {
        menutitle: 'RFID',
      },
      {
        menutitle: 'Sensors',
      },
      {
        menutitle: 'Switches',
      },
      {
        menutitle: 'Others',
      },
    ],
  },
  {
    title: 'suppliers',
    partMenu: [
      {
        menutitle: 'supplier 1',
      },
      {
        menutitle: 'supplier 2',
      },
      {
        menutitle: 'supplier 3',
      },
      {
        menutitle: 'supplier 4',
      },
      {
        menutitle: 'supplier 5',
      },
      {
        menutitle: 'supplier 6',
      },
      {
        menutitle: 'supplier 7',
      },
      {
        menutitle: 'supplier 8',
      },
      {
        menutitle: 'supplier 9',
      },
      {
        menutitle: 'supplier 10',
      },
      {
        menutitle: 'supplier 11',
      },
      {
        menutitle: 'supplier 12',
      },
      {
        menutitle: 'supplier 13',
      },
      {
        menutitle: 'supplier 14',
      },
      {
        menutitle: 'supplier 15',
      },
      {
        menutitle: 'supplier 16',
      },
    ],
  },
  {
    title: 'more',
    partMenu: [
      {
        menutitle: 'plastics',
      },
      {
        menutitle: 'resins',
      },
    ],
  },
];

const cardsMetadata = [
  {
    name: 'Audio',
    img: '/static/images/car_updated/Audio_orginal_sketch.jpg',
  },
  {
    name: 'Battery',
    img: '/static/images/car_updated/Battery_orginal_sketch.jpg',
  },
  {
    name: 'Capacitors',
    img: '/static/images/car_updated/Capacitors_orginal_sketch.jpg',
  },
  {
    name: 'Circuit Protection',
    img: '/static/images/car_updated/Circuit Protection_orginal_sketch.jpg',
  },
  {
    name: 'Coils',
    img: '/static/images/car_updated/Coils_orginal_sketch.jpg',
  },
  {
    name: 'Cables & Wires',
    img: '/static/images/car_updated/Cables & Wires_orginal_sketch.jpg',
  },
  {
    name: 'Connectors',
    img: '/static/images/car_updated/Connectors_orginal_sketch_new.png',
  },
  {
    name: 'Diodes & Transistors',
    img: '/static/images/car_updated/Diodes & Transistors_orginal_sketch.jpg',
  },
  {
    name: 'Development Boards',
    img: '/static/images/car_updated/Development Boards_orginal_sketch.jpg',
  },
  {
    name: 'Discrete Semiconductor',
    img: '/static/images/car_updated/Discrete Semiconductor_orginal_sketch.jpg',
  },
  {
    name: 'Fans & Thermal Management',
    img: '/static/images/car_updated/Fans & Thermal Management_orginal_sketch.jpg',
  },
  {
    name: 'Filters',
    img: '/static/images/car_updated/Filters_orginal_sketch.jpg',
  },
  {
    name: 'Inductors',
    img: '/static/images/car_updated/Inductors_orginal_sketch.jpg',
  },
  {
    name: 'Integrated Circuits',
    img: '/static/images/car_updated/Integrated Circuits_orginal_sketch.jpg',
  },
  {
    name: 'Isolators',
    img: '/static/images/car_updated/Isolators_orginal_sketch.jpg',
  },
  {
    name: 'Magnets & Heads',
    img: '/static/images/car_updated/Magnets & Heads_orginal_sketch.jpg',
  },
  {
    name: 'Modules',
    img: '/static/images/car_updated/Modules_orginal_sketch.jpg',
  },
  {
    name: 'Optoelectronics',
    img: '/static/images/car_updated/Optoelectronics_orginal_sketch.jpg',
  },
  {
    name: 'Potentiometers',
    img: '/static/images/car_updated/Potentiometers_orginal_sketch.jpg',
  },
  {
    name: 'Relays',
    img: '/static/images/car_updated/Relays_orginal_sketch.jpg',
  },
  {
    name: 'Resistors',
    img: '/static/images/car_updated/Resistors_orginal_sketch.jpg',
  },
  {
    name: 'Resonators',
    img: '/static/images/car_updated/Resonators_orginal_sketch.jpg',
  },
  {
    name: 'RFID',
    img: '/static/images/car_updated/RFID_orginal_pencilsketch.jpg',
  },
  {
    name: 'Sensors',
    img: '/static/images/car_updated/Sensors_orginal_sketch.jpg',
  },
  {
    name: 'Switches',
    img: '/static/images/car_updated/Switches_orginal_sketch.jpg',
  },
];

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 8,
  slidesToScroll: 1,
  autoplay: true,
  speed: 3000,
  autoplaySpeed: 3000,
  cssEase: 'linear',
  nextArrow: (
    <div>
      <i className="arrow right right_pr icon_sld slick-arrow"></i>
    </div>
  ),
  prevArrow: (
    <div>
      <i className="arrow left left_pr icon_sld slick-arrow"></i>
    </div>
  ),
};

function BrowsePartsByCategory() {
  return (
    <div className="container-fluid padding_side">
      <div className="row mt-10">
        <div className="col-md-11 pa-0">
          <div className="product-carousel">
            <Slider {...settings}>
              {cardsMetadata.map((card, i) => {
                return <Category image={card.img} text={card.name} key={i} />;
              })}
            </Slider>
          </div>
        </div>
        <div className="col-md-1 pa-0">
          <div className="part_supp">
            {partdata.map((item, i) => (
              <UncontrolledDropdown key={i} className="drop_more">
                <DropdownToggle nav caret className="new_part part_drop">
                  {item.title}
                </DropdownToggle>
                <DropdownMenu down="true" className="drop_meni">
                  {item.partMenu.map((parts, j) => (
                    <DropdownItem key={j}>
                      {parts.menutitle}
                      <DropdownItem divider />
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
            ))}
          </div>
        </div>

        <style>{`
      .col-md-4 {
        width: 33.33333333%;
    }
    .img-responsive {
      display: block;
      max-width: 100%;
      height: auto;
    }
    .mt-10
    {
      margin-top:5px;
    }
    .mb-20 {
        margin-bottom: 20px !important;
    }
     
      .pa-0
    {
      padding-left:0px !important;
      padding-right:0px !important;
    }
    .part_supp
    {
          display: block;
        background-color: #FAFAFA;
        border-radius: 3px;
        width: 100px;
        height: 143px;
        text-align: left;
        box-shadow: 0 15px 45px 0 rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease-in-out 0s;
        border: 1px solid #e1e0e0ba;
        transition: transform .5s ease;
    }
    .drop_meni {
      width: 200px;
      min-width: 200px;
      transform: unset !important;
      overflow-y: scroll;
      left:unset !important;
      top:unset !important;
      position: unset;
      right: 0 !important;
      word-break: break-word;
      left: unset;
      height: 400px;
      overflow-y: scroll;
      word-break: break-word;
      }
      .dropdown-divider
      {
        margin:0px !important;
      }
      .drop_more {
        border-bottom: 1px solid #ccc;
    }

      .drop_meni .dropdown-item{
        text-align: left;
        color: #777;
        font-size:14px;
        white-space: normal;
        word-break: break-word !important;
        padding: 3px 10px !important;
        outline: none !important;
    background: #fff;
      }
      .new_part {
        color: #333;
        font-size: 14px;
        background: #fff !important;
        border: 1px solid #fff !important;
        color: #333;
        padding: 0px;
        padding-left: 5px;
        text-align: left;
        margin-bottom: 12px !important;
        cursor: pointer;
        margin-top: 12px !important;
        box-shadow: unset !important;
    }
    .padding_side
    {
      padding-right:30px;
      padding-left:30px;
    }
    .part_drop:after {
      float: right;
      margin-right: 10px;
      margin-top: 5px;
    }

    .new_part::after {
      display: inline-block;
      width: 0;
      height: 0;
      margin-left: .255em;
      vertical-align: .255em;
      content: "";
      border-top: .3em solid;
      border-right: .3em solid transparent;
      border-bottom: 0;
      border-left: .3em solid transparent;
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
      `}</style>
      </div>
    </div>
  );
}
export default BrowsePartsByCategory;
