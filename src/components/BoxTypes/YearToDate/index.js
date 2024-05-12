import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import withBox from 'components/Box';

function YearToDate(props) {
  const {
    data: { data },
  } = props;
  const icon = '';
  const title = '';
  const dynamicClass = '';

  return (
    <div className="box">
      <div className="box-header with-border">
        <h3 className="box-title">
          <FontAwesomeIcon icon={icon} width="12" />
          &nbsp; {title}
        </h3>

        <div className="box-tools pull-right yeardrop">
          <div className="form-group">
            <select className="form-control select2 putwidth">
              <option value="default">2019 &nbsp;&nbsp;&nbsp;</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
            </select>
          </div>
        </div>
      </div>
      <div className="box-body">
        <div className="row yeartodate">
          {data.map((item, index) => (
            <div className={dynamicClass} key={item.id} id={index}>
              <center>
                <div className="quote_block">
                  <p className="quote_side">{item.number}</p>
                  <p className="qoute_sent">{item.title}</p>
                </div>
              </center>
            </div>
          ))}
        </div>
      </div>
      <style>{`
                .select2-container--default .select2-selection--single {
                    background-color: #fff;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                .putwidth{
                    width:100%;
                }

                .select2-container .select2-selection--single {
                    box-sizing: border-box;
                    cursor: pointer;
                    display: block;
                    height: 34px;
                    user-select: none;
                    -webkit-user-select: none;
                }

                .select2-container--default .select2-selection--single, .select2-selection .select2-selection--single {
                    border: 1px solid #d2d6de;
                    border-radius: 0;
                    padding: 6px 12px;
                    height: 34px;
                }

                .box {
                  position: relative;
                  border-radius: 3px;
                  background: #ffffff;
                  border: 1px solid #ececec;
                  margin-bottom: 20px;
                  width: 100%;
                  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
                }

                .box-header.with-border {
                    border-bottom: 1px solid #e9e5e5;
                }

                .box-header {
                    color: #444;
                    display: block;
                    padding: 10px;
                    position: relative;
                }

                .box-title {
                    color: #333;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 0;
                    word-break: break-word;
                }
                
                .pull-right {
                    float: right!important;
                }
            
                box-header.box-tools {
                    position: absolute;
                    right: 10px;
                    top: 5px;
                }
            
                .box-body {
                    border-top-left-radius: 0;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 3px;
                    border-bottom-left-radius: 3px;
                    padding: 10px;
                }

                .quote_side {
                    margin-bottom: 0px;
                    font-weight: 400;
                    font-size: 34px;
                }
                
                .qoute_sent
                {
                  font-size: 14px;
                  font-weight: 400;
                }
                
                center {
                    display: block;
                    text-align: -webkit-center;
                }
                
                .yeartodate {
                    width: 100%;
                }           
                `}</style>
    </div>
  );
}

YearToDate.propTypes = {
  data: PropTypes.array,
  icon: PropTypes.object,
  title: PropTypes.string,
  dynamicClass: PropTypes.string,
};

export default withBox(YearToDate);
