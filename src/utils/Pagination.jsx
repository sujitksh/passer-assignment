import React from 'react';
import "../css/styles.css"

const Pagination = ({ currentPage,perPage,totalPages,onPageChange,previousPage, nextPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPages / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
     
      <button disabled={currentPage === 1 ? true : false} onClick={previousPage} >
               Prev
            </button>
       
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={currentPage === number ? 'active' : ''}
            onClick={() => onPageChange(number)}
          >
            {number}
          </li>
        ))}
            <button disabled={currentPage === Math.ceil(totalPages / perPage) ? true : false} onClick={nextPage} >
               Next
            </button>
      </ul>
    </nav>
  );
};

export default Pagination;