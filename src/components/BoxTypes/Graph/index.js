import React from 'react';
import withBox from 'components/Box';
import PropTypes from 'prop-types';
var BarChart = require('react-d3-components').BarChart;

export function Graph(props) {
  const {
    data: { compData },
  } = props;
  const tooltipScatter = (x, y0, y) => y;

  return (
    <div id="app">
      <div className="box-tools pull-right  yeardrop">
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
      <BarChart
        tooltipHtml={tooltipScatter}
        data={compData}
        width={700}
        height={500}
        yAxis={[0, 100]}
        margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
      />
      <style>{`
                #app {
                    width: 100%;
                    height: 100%;
                }
                
                .bar {    
                    fill: #37B300;
                    stroke: #37B300;
                }
                
                .tooltip {
                    padding: 3px;
                    border: 2px solid;
                    border-radius: 2px;
                    background-color: red;
                    opacity: 0.6;
                    justify-content: center;
                    align-items: center;
                }
            `}</style>
    </div>
  );
}

Graph.propTypes = {
  data: PropTypes.shape({
    compData: PropTypes.array,
  }),
};

export default withBox(Graph);
