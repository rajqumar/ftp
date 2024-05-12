import React from 'react';
import H5 from 'components/H5';
import Rating from 'components/Rating';
import PropTypes from 'prop-types';

export default function BoxLayout({ children, data, WrappedComponent }) {
  return (
    <div className="box">
      <div className="box-header with-border">
        <H5 className="mb-0" data={data.heading} icon={data.icon} position="left" />
        <div className="box-tools pull-right">{data.rating ? <Rating className="mtm-5" rating={data.rating} /> : ''}</div>
      </div>
      <div className="box-body">
        <div className="row">
          {WrappedComponent ? <WrappedComponent data={data} /> : children}
        </div>
      </div>

      <style>{`
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
                
                .collapsed-box .box-header.with-border {
                  border-bottom: none
                }
                
                .box-header {
                    color: #444;
                    display: block;
                    padding: 10px;
                    position: relative;
                }
                
                .box-header>.box-tools {
                    position: absolute;
                    right: 10px;
                    top: 5px;
                }
                
                .mt-10 {
                    margin-top: 10px !important;
                }
                
                .rating-group {
                    display: inline-flex;
                }
                .rating_new
                {
                    margin-right:10px;
                }
                .box-body {
                    border-top-left-radius: 0;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 3px;
                    border-bottom-left-radius: 3px;
                    padding: 30px;
                }
            `}</style>
    </div>
  );
}

BoxLayout.propTypes = {
  children: PropTypes.node,
  data: PropTypes.object,
  WrappedComponent: PropTypes.node,
};
