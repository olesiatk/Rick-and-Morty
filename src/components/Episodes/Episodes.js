import React, { useState, useEffect } from 'react';
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

export const Episodes = ({ episodes }) => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState(episodes);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [queryName, setQueryName] = useState('');

  useEffect(() => {
    setColumns([
      {
        key: 'name', name: 'Name',
      },
      {
        key: 'episode', name: 'Episode',
      },
      {
        key: 'air_date', name: 'Air date',
      },
    ]);
  }, []);

  useEffect(() => {
    const newRows = episodes
      .filter(episode => episode.name.toLowerCase()
        .includes(queryName.toLocaleLowerCase()));

    setRows(newRows);
  }, [episodes, queryName]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <h1>Episodes</h1>
      {columns && rows && (
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map(header => (
                <TableCell
                  key={header.key}
                >
                  {header.key === 'name' ? (
                    <TextField
                      label={header.name}
                      variant="outlined"
                      type="text"
                      className="new-todo"
                      placeholder="Find me!"
                      value={queryName}
                      onChange={(e) => {
                        setQueryName(e.target.value);
                      }}
                    />
                  ) : header.name}
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
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.episode}</TableCell>
                <TableCell>{row.air_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, {
                  label: 'All', value: -1,
                }]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
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

Episodes.propTypes = {
  episodes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    nama: PropTypes.string.isRequired,
    episode: PropTypes.string.isRequired,
    air_data: PropTypes.string.isRequired,
  })).isRequired,
};
