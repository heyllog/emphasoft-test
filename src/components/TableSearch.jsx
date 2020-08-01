import React, { useState } from 'react';

function TableSearch({ onSearch }) {
  const [value, setValue] = useState('');

  const valueChangeHandler = (event) => setValue(event.target.value);

  const handleSearch = () => onSearch(value);
  return (
    <>
      <input type='text' value={value} onChange={valueChangeHandler} />
      <button onClick={handleSearch}>Search</button>
    </>
  );
}

export default TableSearch;
