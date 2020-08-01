import React from 'react';

function Table({ users, onSort }) {
  return (
    <div className='users-table'>
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
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
