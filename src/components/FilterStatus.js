import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export const FilterStatus = ({ status, handleChange }) => (
<FormControl variant="outlined" style={{minWidth: 100}}>
        <InputLabel >Status</InputLabel>
        <Select
          value={status}
          onChange={handleChange}
          label="Status"
        >
          <MenuItem value="" >
            <em>All</em>
          </MenuItem>
          <MenuItem value='Alive'>Alive</MenuItem>
          <MenuItem value='Dead'>Dead</MenuItem>
          <MenuItem value='unknown'>unknown</MenuItem>
        </Select>
      </FormControl>
);

FilterStatus.propTypes = {
  status: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

