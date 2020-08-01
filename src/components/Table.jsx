import React from 'react';
import isEmpty from 'lodash/isEmpty';

function Table({ users, onSort }) {
  return isEmpty(users) ? (
    <p>Loading...</p>
  ) : (
    <table>
      <thead>
        <tr>
          <th onClick={() => onSort('id')}>ID</th>
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <th>{user.id}</th>
            <th>{user.username}</th>
            <th>{user.first_name}</th>
            <th>{user.last_name}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
