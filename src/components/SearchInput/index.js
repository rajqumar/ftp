import React from 'react';
import Autocomplete from '../Autocomplete';
import PropTypes from 'prop-types';

export function Search(props) {
  const { partAndSuppplierList, SearchedKeyword,  isKeywordSearch} = props;

  return (
    <div>
      <form action="/search" method="get" className="sidebar-form">
        <div className="input-group">
          <Autocomplete
            options={partAndSuppplierList}
            name="searchvalue"
            dynamicClass={isKeywordSearch ? `form-control new-search-form-control` : `form-control search-form-control`}
             placeholder="Search by keywords, specifications or part numbers"
            SearchedKeyword={SearchedKeyword}
          />
        </div>
      </form>

      <style jsx>{`
        #search-btn {
          background: #fff !important;
          border: 0px !important;
          border-radius: 0px 5px 5px 0px;
          margin-right: 20px;
          padding: 7px;
          border-left: none !important;
        }

        .sidebar-form,
        .sidebar-menu > li.header {
          text-overflow: clip;
        }

        input[role='combobox'] {
          width: 100%;
        }
        .form-control
        {
          border-radious:.25rem !important;
        }
      `}</style>
    </div>
  );
}

Search.propTypes = {
  partAndSuppplierList: PropTypes.array,
  SearchedKeyword: PropTypes.string,
};

export default Search;
