import React from 'react';

export function CoronaVirusInfo() {
  return (
    <React.Fragment>
      <div className="col-md-6" style={{ marginBottom: '20px' }}>
        <div className="covid_top">
          <h5 className="covid_head"> Global research on coronavirus disease </h5>
          <ul className="list_man">
            <p className="reverse_para">
              WHO is gathering the latest international multilingual scientific findings & knowledge on COVID-19. The
              global literature cited in the WHO COVID-19 database is updated daily (Monday through Friday) from
              searches of bibliographic databases, hand searching, & the addition of other expert-referred scientific
              articles. This database represents a comprehensive multilingual source of current literature on the topic.
              While it may not be exhaustive, new research is added regularly.The WHO evidence retrieval sub-group has
              begun collaboration with key partners to enrich the citations & build a more comprehensive database with
              inclusion of other content.{' '}
              <a href="#" className="know_more">
                Know More
              </a>
            </p>
          </ul>
        </div>
      </div>
      <div className="col-md-6" style={{ marginBottom: '20px' }}>
        <div className="covid_top">
          <h5 className="covid_head"> Why is it difficult to get the vaccine right?</h5>
          <div className="responsive-iframe">
            <iframe
              src="https://www.youtube.com/embed/AArz-1Tavd4?autoplay=1&loop=1&autopause=0&muted=1"
              frameBorder="0"
              webkitallowfullscreen
              mozallowfullscreen
              allowFullScreen
              className="iframe-size"></iframe>
          </div>
        </div>
      </div>
      <style>{`
        .covid_top {
            margin-top:40px;
        }

        .covid_head {
            text-align: left;
            font-size: 20px;
            font-weight: 600;
            word-break: break-word;
            margin: 0px;
            padding: 0px 0 5px 5px;
            color: #2b2626;
            border-radius: 5px 5px 0 0;
        }
        .know_more {
          text-decoration: underline;
          color: red;
      }
        .list_man {
            list-style: none;
            margin-left: -40px;
            margin-bottom:0px;
        }

        .list_man li:last-child {
            border-bottom: none;	
        }

        .list_man li {
            color: #423636;
            font-weight: 600;
            line-height: 20px;
            margin-bottom:15px;
            padding: 0px 10px;
            font-size:14px;
            border-bottom: 1px dashed #e2dfdfab;	
            cursor:pointer;
            text-transform:capitalize;
        }

        .list_man li:hover {
            background-color: #d31e25;
            color: #fff;
        }

        .reverse_para {
            padding-left: 8px;
            text-align: justify;
            font-size: 14px;
        }

        #vas {
            margin-top:0px !important;
        }

        .iframe-size {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        .img-responsive {
            display: block;
            max-width: 100%;
            height: auto;
        }
    `}</style>
    </React.Fragment>
  );
}

export default CoronaVirusInfo;
