import React from 'react';

function TableSearch({ setSearchTerm }) {
  const valueChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className='search'>
      <label>
        <span>Find by username: </span>
        <input type='text' onChange={valueChangeHandler} />
      </label>
    </div>
  );
}

export default TableSearch;
