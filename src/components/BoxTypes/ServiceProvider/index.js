import React from 'react';
import H5 from 'components/H5';
import withBox from 'components/Box';
import PropTypes from 'prop-types';

export function ServiceProvider(props) {
  const {
    data: {
      data: { serviceproviders },
    },
  } = props;

  return (
    <React.Fragment>
      {serviceproviders.map((sp, i) => (
        <div className="col-md-3" key={i}>
          <div className="gift_img_first" style={{ backgroundImage: `url(${sp.image})` }}>
            <span className="h5_text">
              <H5 data={sp.title} />
            </span>
          </div>
        </div>
      ))}

      <style>{`
                .gift_img_first {
                    background-size: 100% 100%;
                    background-position: 50% 50%;
                    background-repeat: no-repeat;
                    min-height: 120px;
                }

                .h5_text {
                    position: absolute;
                    top: 33%;
                    left: 32%;                    
                }
            `}</style>
    </React.Fragment>
  );
}

ServiceProvider.propTypes = {
  data: PropTypes.object,
};

export default withBox(ServiceProvider);
