import React, { useCallback, useEffect, useState } from 'react';
import orderBy from 'lodash/orderBy';
import isEmpty from 'lodash/isEmpty';

import TableSearch from '../components/TableSearch';
import Table from '../components/Table';
import Redirect from '../components/Redirect';
import Loader from '../components/Loader';

function UsersPage({ token }) {
  const [users, setUsers] = useState([]);
  const [sortType, setSortType] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(null);

  const onSort = useCallback(
    (field) => {
      setSortType(sortType === 'asc' ? 'desc' : 'asc');
      setUsers(orderBy([...users], field, sortType));
    },
    [sortType, users]
  );

  const getFilteredData = useCallback(
    (value) => {
      if (!value) {
        return null;
      }

      return users.filter((user) => user['username'].toLowerCase().includes(value.toLowerCase()));
    },
    [users]
  );

  useEffect(() => {
    setFilteredData(getFilteredData(searchTerm));
  }, [getFilteredData, searchTerm]);

  useEffect(() => {
    const controller = new AbortController();

    const getUsers = async (token) => {
      try {
        const response = await fetch(
          'https://emphasoft-test-assignment.herokuapp.com/api/v1/users/',
          {
            signal: controller.signal,
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        if (response.ok) {
          let json = await response.json();
          setUsers(json);
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (token) {
      getUsers(token);
    }

    return () => {
      controller.abort();
    };
  }, [token]);

  return token ? (
    <div className='users-page'>
      <TableSearch setSearchTerm={setSearchTerm} />
      {isEmpty(users) ? (
        <Loader />
      ) : isEmpty(filteredData) && filteredData ? (
        <span className='error'>No such users</span>
      ) : (
        <Table users={filteredData ? filteredData : users} onSort={onSort} />
      )}
    </div>
  ) : (
    <Redirect message='You are not authorized' link='/emphasoft-test' button='Sign In' />
  );
}

export default UsersPage;
