import React from 'react';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NewHotDeals() {
  const hotDealsMetadata = [
    {
      date: '12/11/2019',
      img: '/static/images/semi4.jpg',
      name: 'XC4VSX55-11FF1148I having sale',
      discount: '40% off',
    },
    {
      date: '20/12/2019',
      img: '/static/images/semi4.jpg',
      name: 'XC4VSX55-11FF1148I having sale',
      discount: '35% off',
    },
    {
      date: '21/07/2019',
      img: '/static/images/semi1.jpg',
      name: 'XC4VSX55-11FF1148I having sale',
      discount: '20% off',
    },
    {
      date: '11/12/2019',
      img: '/static/images/semi3.jpg',
      name: 'XC4VSX55-11FF1148I having sale',
      discount: '50% off',
    },
  ];

  return (
    <div className="hot_offer">
      <h5 className="hot_offer_head">
        <FontAwesomeIcon icon={faTags} />
        &nbsp; Hot Deals
      </h5>
      <div className="hot_offer_slider">
        <ul className="hot_offer_ul" id="contain-deal">
          {hotDealsMetadata.map((deal, i) => {
            return (
              <li key={i} className="hot_offer_list marquee">
                <a href="#" className="a-tag">
                  <div className="offer_season">
                    <div className="row">
                      <div className="col-md-6">
                        <span className="date_span">{deal.date}</span>
                      </div>
                      <div className="col-md-6">
                        <span className="blink_offer blink_me">{deal.discount}</span>
                      </div>
                      <div className="col-md-3">
                        <img src={deal.img} className="img-responsive thumb_semi" />
                      </div>
                      <div className="col-md-8">
                        <span className="desc_semi"> {deal.name} </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <style>{`
        .hot_offer
        {
            border:1px solid #D31E25;
            margin-top:25px;
            border-radius:5px;
        }
        .hot_offer_head
        {
            text-align: center;
            font-size: 18px;
            font-weight: 600;
            background: #D31E25;
            margin: 0px;
            padding: 10px 0;
            color: #fff;
            border-radius:5px 5px 0 0;
        }
        .hot_offer_slider{
            overflow:hidden
         
        }
        #contain-deal {
          height: 313px;
    width: 293px;
          overflow-y: hidden;
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
        .hot_offer_list{
          padding:5px;
           text-align:center;
          border-bottom:1px solid #d31e25;
        }
        .offer_season
        {
            padding:0px 10px;
            text-align:left;
        }
        .date_span
        {
        margin-bottom:10px;
        font-weight:700;
        font-size:14px;
        color:#4b4848;
        }
        .blink_offer
        {
        background-color:#F1B600;
        float:right;
        border-radius:10px;
        color:#fff;
        padding:0px 10px;
        font-weight:700;
        margin-bottom:10px
        }
        .blink_me {
            -webkit-animation-name: blinker;
            -webkit-animation-duration: 1s;
            -webkit-animation-timing-function: linear;
            -webkit-animation-iteration-count: infinite;
        
            -moz-animation-name: blinker;
            -moz-animation-duration: 1s;
            -moz-animation-timing-function: linear;
            -moz-animation-iteration-count: infinite;
        
            animation-name: blinker;
            animation-duration: 1s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
        }
        
        @-moz-keyframes blinker {  
            0% { opacity: 1.0; }
            50% { opacity: 0.0; }
            100% { opacity: 1.0; }
        }
        
        @-webkit-keyframes blinker {  
            0% { opacity: 1.0; }
            50% { opacity: 0.0; }
            100% { opacity: 1.0; }
        }
        
        @keyframes blinker {  
            0% { opacity: 1.0; }
            50% { opacity: 0.0; }
            100% { opacity: 1.0; }
        }
        .mb-20
        {
            margin-bottom:20px !important;
        }
        .thumb_semi
        {
            height:50px;
            width:50px;
        }
        .desc_semi
        {
            font-size:14px;
            font-weight:600;
            color:#4b4848;
        }
        .a-tag:hover{
            text-decoration:none;
        }
        .marquee {
          top: 6em;
          position: relative;
          box-sizing: border-box;
          animation: marquee 15s linear infinite;
      }
      
      .hot_offer_ul:hover  .marquee
      {
          -webkit-animation-play-state: paused;
          -moz-animation-play-state: paused;
          -o-animation-play-state: paused;
          animation-play-state: paused;
      }
      .marquee:hover {
          animation-play-state: paused;
      }
      
      @keyframes marquee {
          0%   { top:   8em }
          100% { top: -11em }
      }
      

        `}</style>
    </div>
  );
}
export default NewHotDeals;
