import React from 'react';
import { faGavel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table } from 'reactstrap';
const ReverseData = [
  {
    partNo: 'ZASK',
    qty: '1',
    price: '1000',
    id: 1,
  },
  {
    partNo: 'PSH3',
    qty: '2',
    price: '1020',
    id: 2,
  },
  {
    partNo: 'PSH4',
    qty: '3',
    price: '1060',
    id: 3,
  },
  {
    partNo: 'Q234',
    qty: '5',
    price: '1010',
    id: 4,
  },
  {
    partNo: 'Q235',
    qty: '5',
    price: '2500',
    id: 5,
  },
  {
    partNo: 'Q232',
    qty: '5',
    price: '2500',
    id: 6,
  },
];
function ReverseAuction() {
  var my_time_rev;
  const onmouseover = () => {
    clearTimeout(my_time_rev);
  };
  const onmouseout = () => {
    pageScroll();
  };
  const pageScroll = () => {
    var objDiv = document.getElementById('contain_rev');
    objDiv.scrollTop = objDiv.scrollTop == null ? 100 + 1 : objDiv.scrollTop + 1;
    if (objDiv.scrollTop == objDiv.scrollHeight - 100) {
      objDiv.scrollTop = 0;
    }
    my_time_rev = setTimeout(pageScroll, 25);
  };
  return (
    <div className="grp_buy  mt-30 mb-20">
      <div className="pa-0">
        <h5 className="buy_group_new">
          <FontAwesomeIcon icon={faGavel} />
          &nbsp; Reverse Auction
        </h5>
      </div>
      <Table className="table table-bordered inventory_table grp_table">
        <thead className="group_head">
          <tr>
            <th scope="row" className="rev-heading">
              Part No
            </th>
            <th className="rev-heading">Qty</th>
            <th className="rev-heading">Price($)</th>
            <th className="rev-heading">Bidding</th>
          </tr>
        </thead>
      </Table>
      <div id="contain_rev" onMouseOver={onmouseover} onMouseOut={onmouseout} onBlur={pageScroll}>
        <div className="table-responsive bidding_table pa-none">
          <Table className="table table-bordered inventory_table bidding_table_bt" id="table_scroll">
            <tbody>
              {ReverseData.map((item, index) => (
                <tr key={index}>
                  <td scope="row" className="rev-heading-data">
                    {item.partNo}
                  </td>
                  <td className="rev-heading-data"> {item.price}</td>
                  <td className="rev-heading-data"> {item.qty}</td>
                  <td className="rev-heading-data">
                    <center>
                    <button type="button" className="btn btn-danger bidding_btn">
                      <FontAwesomeIcon icon={faGavel} />
                    </button>
                    </center>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <style>{`
    .grp_buy {
      border: 1px solid #D31E25;
      border-radius: 5px 5px 0 0;
  }
  .pa-0 {
    padding-left: 0px !important;
    padding-right: 0px !important;
}
.pa-none {
  padding: 0px !Important;
}
    .buy_group_new
    {
      background: #D31E25;
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 0px;
        margin-top: 0px;
        padding: 10px;
      border-radius:5px 5px 0 0;
        text-align: center;
        color: #fff;
    }
    .grp_table
{
	 table-layout: fixed !important;
	 margin-bottom:0px;
}


.table>thead>tr>th {
    border-bottom: 2px solid #f4f4f4
    font-size: 10px !important;
}

.table tr td .progress {
    margin-top: 5px
}

.table-bordered {
    border: 1px solid #f4f4f4
    font-size: 10px !important;
}

.table-bordered>thead>tr>th,
.table-bordered>tbody>tr>th,
.table-bordered>tfoot>tr>th,
.table-bordered>thead>tr>td,
.table-bordered>tbody>tr>td,
.table-bordered>tfoot>tr>td {
    border: 1px solid #f4f4f4
    border-top: 1px solid #f4f4f4

}
#contain_rev {
  height: 200px;
  overflow-y: hidden;
}
#table_scroll {
  width: 100%;
  margin-top: 100px;
  margin-bottom: 100px;
  border-collapse: collapse;
}
.table-bordered>thead>tr>th,
.table-bordered>thead>tr>td {
    border-bottom-width: 2px
}

.table.no-border,
.table.no-border td,
.table.no-border th {
    border: 0
}

table.text-center,
table.text-center td,
table.text-center th {
    text-align: center
}

.table.align th {
    text-align: left
}

.table.align td {
    text-align: right
}

.label-default {
    background-color: #d2d6de;
    color: #444
}
.inventory_table>tbody>tr>th {
  border: 1px solid #d1cbcb;
}
.bidding_btn
{
  background: #d31e25;
  border: #d31e25;
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 500;
}
.bidding_table
{
	padding:0 10px;
}
.bidding_table_bt
{
	margin-bottom:0px;
}

.rev-heading {
  font-size: 10px;
  text-transform: capitalize;
  font-weight: 700;
}
.rev-heading-data{
  font-size: 11px;
  width: 70px;
  height: 50px;
  text-transform: capitalize;
}

    `}</style>
    </div>
  );
}

export default ReverseAuction;
