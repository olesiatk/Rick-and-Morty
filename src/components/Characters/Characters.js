import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import { TablePaginationActions } from './UI/pagination';
import { PopUp } from './UI/PopUp';
import { FilterStatus } from './UI/FilterStatus';
import { FilterGender } from './UI/FilterGender';

export const Characters = ({ characters }) => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState(characters);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [queryName, setQueryName] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    setColumns([
      {
        key: 'image', name: 'Image',
      },
      {
        key: 'name', name: 'Name',
      },
      {
        key: 'status', name: 'Status',
      },
      {
        key: 'gender', name: 'Gender',
      },
    ]);
  }, []);

  useEffect(() => {
    const newRows = characters.filter(character => (
      character.name.toLowerCase().includes(queryName.toLocaleLowerCase())
    ));

    setRows(newRows);
  }, [characters, queryName]);

  useEffect(() => {
    const newRows = characters
      .filter(character => character.status.includes(status));

    setRows(newRows);
  }, [characters, status]);

  useEffect(() => {
    const newRows = characters
      .filter(character => character.gender.includes(gender));

    setRows(newRows);
  }, [characters, gender]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  return (
    <div>
      <h1>Characters</h1>
      {columns && rows && (
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map(header => (
                <TableCell key={header.key}>
                  {header.key === 'name' && (
                    <TextField
                      label={header.name}
                      variant="outlined"
                      type="text"
                      className="new-todo"
                      placeholder="Find me!"
                      value={queryName}
                      onChange={e => setQueryName(e.target.value)}
                    />
                  )}
                  {header.key === 'status' && (
                    <FilterStatus
                      status={status}
                      handleChange={handleChangeStatus}
                    />
                  )}
                  {header.key === 'gender' && (
                    <FilterGender
                      gender={gender}
                      handleChange={handleChangeGender}
                    />
                  )}
                  {header.key !== 'name'
                  && header.key !== 'status'
                  && header.key !== 'gender'
                  && header.name }
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, i) => (
              <TableRow key={row.id}>
                <TableCell>
                  <PopUp
                    character={row}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.gender}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, {
                  label: 'All', value: -1,
                }]}
                // colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
};

Characters.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
};
