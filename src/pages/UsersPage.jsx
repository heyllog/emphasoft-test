import React, { useCallback, useEffect, useState } from 'react';
import Table from '../components/Table';
import orderBy from 'lodash/orderBy';
import { Link } from 'react-router-dom';
import TableSearch from '../components/TableSearch';

function UsersPage({ token }) {
  const [users, setUsers] = useState([]);
  const [sortType, setSortType] = useState('asc');
  const [filteredData, setFilteredData] = useState();

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

  const onSearch = (value) => {
    setFilteredData(getFilteredData(value));
  };

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
        // TODO обработка ошибок
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
    <>
      <TableSearch onSearch={onSearch} />
      <Table users={filteredData ? filteredData : users} onSort={onSort} />
    </>
  ) : (
    <>
      <span>You are not authorized</span>
      <span>
        <Link to='/'>Sign In</Link>
      </span>
    </>
  );
}

export default UsersPage;