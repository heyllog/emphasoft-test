import React from 'react';
import { Link } from 'react-router-dom';

function Redirect({ message, link, button }) {
  return (
    <div className='authorized'>
      <p>{message}</p>
      <Link to={link}>
        <button className='button'>{button}</button>
      </Link>
    </div>
  );
}

export default Redirect;
