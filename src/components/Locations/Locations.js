import React, {useState, useEffect} from 'react';
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

export const Locations = ({ locations }) => {
  console.log(locations[0]);

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState(locations);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [queryName, setQueryName] = useState('');
  const [queryType, setQueryType] = useState('');
  const [queryDimension, setQueryDimension] = useState('');


  useEffect(() => {
    setColumns([
      {key: 'name', name: 'Name'},
      {key: 'type', name: 'Type'},
      {key: 'dimension', name: 'Dimension'},
    ])
  }, [])

  useEffect(() => {
    const newRows = locations
      .filter(location => location.name.toLowerCase()
        .includes(queryName.toLocaleLowerCase())
      );
    setRows(newRows);
  }, [locations, queryName]);

  useEffect(() => {
    const newRows = locations
      .filter(location => location.type.toLowerCase()
        .includes(queryType.toLocaleLowerCase())
      );
    setRows(newRows);
  }, [locations, queryType]);

  useEffect(() => {
    const newRows = locations
      .filter(location => location.dimension.toLowerCase()
        .includes(queryDimension.toLocaleLowerCase())
      );
    setRows(newRows);
  }, [locations, queryDimension]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <h1>Locations</h1>
        <form noValidate autoComplete="off">
      </form>
      {columns && rows && (
          <Table className='Table' aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map(header => (
                <TableCell 
                  key={header.key}
                >
                  {header.key ==='name' ? (
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
                  ) : header.key ==='type' ? (
                    <TextField 
                      label={header.name}
                      variant="outlined" 
                      type="text"
                      className="new-todo"
                      placeholder="Find me!"
                      value={queryType}
                      onChange={(e) => {
                        setQueryType(e.target.value);
                    }}
                  />
                  ) : header.key === 'dimension' ? (
                    <TextField 
                      label={header.name}
                      variant="outlined" 
                      type="text"
                      className="new-todo"
                      placeholder="Find me!"
                      value={queryDimension}
                      onChange={(e) => {
                        setQueryDimension(e.target.value);
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
                <TableCell width='33%'>{row.name}</TableCell>
                <TableCell width='33%'>{row.type}</TableCell>
                <TableCell width='33%'>{row.dimension}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
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
  )
}