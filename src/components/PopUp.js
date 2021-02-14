import React from 'react';

import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export const PopUp = ({ character }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper elevation={3} style={{padding: '15px'}}>
            <Typography>
              <img alt={character.name} src={character.image} />
              <p>Name: {character.name}</p>
              <p>Status: {character.status}</p>
              <p>Gender: {character.gender}</p>
              <p>Species: {character.species}</p>
              <p>Location: {character.location.name}</p>
              {character.type && (
                <p>Type: {character.type}</p>
              )}
            </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Button onClick={handleClick('right')}>
        <img alt={character.name} src={character.image} width="50" height="50" style={{borderRadius: '10px'}} />
      </Button>
    </>
  );
};
