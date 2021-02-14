import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

export const PopUp = ({ character }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        onBlur={() => setAnchorEl(null)}
      >
        <img
          alt={character.name}
          src={character.image}
          width="50"
          height="50"
          style={{ borderRadius: '10px' }}
        />
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <div className={classes.paper}>
          <Paper elevation={3} style={{ padding: '15px' }}>
            <div>
              <img alt={character.name} src={character.image} />
              <p>
                Name:
                {character.name}
              </p>
              <p>
                Status:
                {character.status}
              </p>
              <p>
                Gender:
                {character.gender}
              </p>
              <p>
                Species:
                {character.species}
              </p>
              <p>
                Location:
                {character.location.name}
              </p>
              {character.type && (
                <p>
                  Type:
                  {character.type}
                </p>
              )}
            </div>
          </Paper>
        </div>
      </Popper>
    </div>
  );
};

PopUp.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    type: PropTypes.string,
    location: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

PopUp.defaultProperties = {
  type: '',
};
