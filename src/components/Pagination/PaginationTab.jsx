import "./PaginationTab.css";

import { useState } from "react";

import Pagination from "react-bootstrap/Pagination";

const PaginationTab = ({ pages, loadPage }) => {
  const [activePageNo, setactivePageNo] = useState(1);
  const handleClick = (pageNo) => {
    setactivePageNo(pageNo);
    loadPage(pageNo);
  };
  return (
    <div className="pagination">
      <Pagination>
        <Pagination.First
          disabled={activePageNo === 1}
          onClick={() => {
            handleClick(1);
          }}
        />
        <Pagination.Prev
          disabled={activePageNo === 1}
          onClick={() => {
            handleClick(activePageNo - 1);
          }}
        />
        {pages.map((_, i) => (
          <Pagination.Item
            active={i + 1 === activePageNo}
            onClick={() => {
              handleClick(i + 1);
            }}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={activePageNo === 19}
          onClick={() => {
            handleClick(activePageNo + 1);
          }}
        />
        <Pagination.Last
          disabled={activePageNo === 19}
          onClick={() => {
            handleClick(pages.length);
          }}
        />
      </Pagination>
    </div>
  );
};

export default PaginationTab;
