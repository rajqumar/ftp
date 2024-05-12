import React from 'react';
import H6 from 'components/H6';
import withBox from 'components/Box';

export function Profile(props) {
  const {
    data: { allignment, compData },
  } = props;

  if (allignment === 'vertical') {
    return (
      <React.Fragment>
        {compData.map((d, i) => (
          <React.Fragment>
            <div className="col-md-4">
              <h6 className="part_head">{d.title}</h6>
            </div>
            <div className="col-md-8">
              <p className="buyer_para"> {d.value}</p>
            </div>
          </React.Fragment>
        ))}
        <style>{`
.part_head {
  font-weight: 700;
  font-size: 14px;
  text-align: left;
}
.buyer_para {
  padding-top: 10px;
  float: left;
}      
      `}</style>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        {compData.map((profile, i) => (
          <div className="col-md-6" key={i}>
            <H6 data={profile.title} />
            <p className="part_subhead">{profile.value}</p>
          </div>
        ))}

        <style>{`
                .part_subhead {
                    font-size: 14px;
                    text-align: left;
                }
            `}</style>
      </React.Fragment>
    );
  }
}

export default withBox(Profile);
