import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export const PopUp = ({ character }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = ({ newPlacement }) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(({ prev }) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper elevation={3} style={{ padding: '15px' }}>
              <Typography>
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
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Button onClick={handleClick('right')}>
        <img
          alt={character.name}
          src={character.image}
          width="50"
          height="50"
          style={{ borderRadius: '10px' }}
        />
      </Button>
    </>
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
