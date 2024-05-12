import React from 'react';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table } from 'reactstrap';

const groupData = [
  {
    partNo: 'PSDJ30',
    moq: '110/500',
    id: 1,
  },
  {
    partNo: 'PSDJ30',
    moq: '110/500',
    id: 2,
  },
  {
    partNo: 'PSDJ30',
    moq: '110/500',
    id: 3,
  },
  {
    partNo: 'PSDJ30',
    moq: '110/500',
    id: 4,
  },
  {
    partNo: 'PSDJ30',
    moq: '110/500',
    id: 5,
  },
  {
    partNo: 'PSDJ30',
    moq: '110/500',
    id: 6,
  },
  {
    partNo: 'PSDJ30',
    moq: '110/500',
    id: 7,
  },
  {
    partNo: 'PSDJ30',
    moq: '110/500',
    id: 8,
  },
  {
    partNo: 'PSDJ30',
    moq: '110/500',
    id: 9,
  },
  {
    partNo: 'PSDJ30',
    moq: '110/500',
    id: 10,
  },
];

function GroupBy() {
  var my_time;
  const onmouseover = () => {
    clearTimeout(my_time);
  };
  const onmouseout = () => {
    pageScroll();
  };
  const pageScroll = () => {
    var objDiv = document.getElementById('contain');
    objDiv.scrollTop = objDiv.scrollTop == null ? 100 + 1 : objDiv.scrollTop + 1;
    if (objDiv.scrollTop == objDiv.scrollHeight - 100) {
      objDiv.scrollTop = 0;
    }
    my_time = setTimeout(pageScroll, 95);
  };

  return (
    <div className="grp_buy">
      <div className="pa-0">
        <h5 className="buy_group_new">
          <FontAwesomeIcon icon={faUsers} />
          &nbsp; Group Buy
        </h5>
      </div>
      <Table className="table table-bordered inventory_table grp_table">
        <thead className="group_head">
          <tr>
            <th scope="row" className="heading">
              <center>
              Part No
              </center>
            </th>
            <th className="heading"><center>MOQ</center></th>
            <th className="heading"><center>Join Group</center></th>
          </tr>
        </thead>
      </Table>
      <div id="contain" onMouseOver={onmouseover} onMouseOut={onmouseout} onBlur={pageScroll}>
        <div className="table-responsive bidding_table pa-none">
          <Table className="table table-bordered inventory_table bidding_table_bt" id="table_scroll">
            <tbody>
              {groupData.map((item, index) => (
                <tr key={index}>
                  <td scope="row" className="heading-data">
                    {item.partNo}
                  </td>
                  <td className="heading-data"> {item.moq}</td>
                  <td className="heading-data">
                    <center>
                    <button type="button" className="btn btn-danger bidding_btn join_btn_new">
                      <center>
                        <img src="/static/images/teamwork.png" height="20" width="20" />{' '}
                      </center>
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
.join_btn_new {
  padding: 4px 13.3px !Important;
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
#contain {
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
.join_btn_new {
  padding: 4px 19.3px;
}
.bidding_table
{
	padding:0 10px;
}
.bidding_table_bt
{
	margin-bottom:0px;
}
.heading {
  font-size: 12px;
  width: 70px;
  text-transform: capitalize;
  font-weight: 700;
}
.heading-data{
  font-size: 11px;
  width: 70px;
  text-transform: capitalize;
}

    `}</style>
    </div>
  );
}

export default GroupBy;
