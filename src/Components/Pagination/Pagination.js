import React from "react";

const Pagination = (props) => {
  const { totalPosts, setPage } = props;
  let pageNumbers = [];
  const postsPerPage = 20;

  let totalPages = Math.min(Math.ceil(totalPosts / postsPerPage), 10);
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  function changePage(event) {
    let number = parseInt(event.target.innerText);
    setPage(number);
  }

  return (
    <nav className="pagination-container">
      <ul className="pagination">
        {pageNumbers.map((number) => {
          if(number === 1) {
            return(<li key={number} onClick={changePage} className='activePage'>
              {number}
            </li>)
          }
          return (
            <li key={number} onClick={changePage}>
              {number}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
