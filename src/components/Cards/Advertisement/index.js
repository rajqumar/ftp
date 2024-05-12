import React from 'react';

export function Advertisement() {

  return (
    <div className="advertisement">
      <div className="centered">Advertisement</div>
      <img src="static/images/partslogged-outsearch-rectangle.png" className="img-responsive" />

      <style>{`
                .advertisement {
                    margin: 20px 0;
                }

                .centered {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            `}</style>
    </div>
  );
}

export default Advertisement;
