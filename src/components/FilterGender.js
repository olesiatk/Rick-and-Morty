import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export const FilterGender = ({ gender, handleChange }) => (
<FormControl variant="outlined" style={{minWidth: 100}}>
        <InputLabel >Gender</InputLabel>
        <Select
          value={gender}
          onChange={handleChange}
          label="Status"
        >
          <MenuItem value="" >
            <em>All</em>
          </MenuItem>
          <MenuItem value='Male'>Male</MenuItem>
          <MenuItem value='Female'>Female</MenuItem>
          <MenuItem value='genderless'>genderless</MenuItem>
          <MenuItem value='unknown'>unknown</MenuItem>
        </Select>
      </FormControl>
);

FilterGender.propTypes = {
  gender: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

