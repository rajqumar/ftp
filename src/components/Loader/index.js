import React from 'react';

function Loader() {
  return (
<div className="spinner-box">
  <div className="circle-border">
    <div className="circle-core"></div>
  </div>  
  <style>
    {`
    .spinner-box {
      width: 100px;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
    }

.circle-border {
  width: 35px;
  height: 35px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #ff7675;
  background: linear-gradient(0deg, #ff7675 33%, #fdcb6e 100%);
  animation: spin .8s linear 0s infinite;
}

.circle-core {
  width: 80%;
  height: 80%;
  background-color: #fff;
  border-radius: 50%;
}
@keyframes spin {
  from {
    transform: rotate(0);
  }
  to{
    transform: rotate(359deg);
  }
}
    `}
  </style>
</div>

  );
}

export default Loader;
