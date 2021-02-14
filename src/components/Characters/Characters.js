import React, {useEffect, useState} from 'react';

import { TablePaginationActions } from '../pagination'
// import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import TextField from '@material-ui/core/TextField';

import { FilterStatus } from '../FilterStatus';
import { FilterGender } from '../FilterGender';

export const Characters = ({ characters }) => {
  console.log(characters[0]);

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState(characters);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [queryName, setQueryName] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');


 
  useEffect(() => {
    setColumns([
      {key: 'image', name: 'Image'},
      {key: 'name', name: 'Name'},
      {key: 'status', name: 'Status'},
      {key: 'species', name: 'Species'},
      {key: 'gender', name: 'Gender'},
    ])
  }, [])

  useEffect(() => {
    const newRows = characters
      .filter(character => character.name.toLowerCase()
        .includes(queryName.toLocaleLowerCase())
      );
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
        <Table className='Characters__table' aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map(header => (
              <TableCell key={header.key}>
                {header.key ==='name' ? (
                  <TextField 
                    label={header.name}
                    variant="outlined" 
                    type="text"
                    className="new-todo"
                    placeholder="Find me!"
                    value={queryName}
                    onChange={e => {
                      setQueryName(e.target.value);
                    }}
                  />
                ) 
                : header.key ==='status'
                ? (
                  <FilterStatus 
                    status={status}
                    handleChange={handleChangeStatus}
                  />
                ) 
                : header.key ==='gender'
                ? (
                  <FilterGender 
                    gender={gender}
                    handleChange={handleChangeGender}
                  />
                ) : header.name }
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
              <TableCell width='10%'>
                <img alt={row.name} src={row.image} width="50" height="50"></img>
              </TableCell>
              <TableCell width='30%'>{row.name}</TableCell>
              <TableCell width='20%'>{row.status}</TableCell>
              <TableCell width='20%'>{row.species}</TableCell>
              <TableCell width='20%'>{row.gender}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
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
  )
}