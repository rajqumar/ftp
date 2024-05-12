import React from 'react';
import BoxLayout from 'components/Box/Layout';
import H6 from 'components/H6';
import PropTypes from 'prop-types';

export function ProfileBox(props) {
  const { data, boxData, md, md1, md2 } = props;
  return (
    <div className={`col-md-${md}`}>
    <BoxLayout data={boxData}>
      {data.map((d, i) => (
        <React.Fragment key={i}>
          <div className={`col-md-${md1 ? md1 : 4}`}>
            <H6 data={d.title} />
          </div>
          <div className={`col-md-${md2 ? md2 : 8}`}>  
            <p className="buyer_para"> {d.value}</p>
          </div>
        </React.Fragment>
      ))}
    </BoxLayout>
  </div>
  );
}

ProfileBox.propTypes = {
};

export default ProfileBox;
