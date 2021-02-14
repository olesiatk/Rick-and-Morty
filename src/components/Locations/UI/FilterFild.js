import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

export const FilterFild = ({ name, query, setQuery }) => (
  <TextField
    label={name}
    variant="outlined"
    type="text"
    className="new-todo"
    placeholder="Find me!"
    value={query}
    onChange={(e) => {
      setQuery(e.target.value);
    }}
  />
);

FilterFild.propTypes = {
  name: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};
