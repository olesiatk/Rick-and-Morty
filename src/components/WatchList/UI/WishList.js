import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';

export const WishList = ({ list, changeTitleStatus, deleteTitle }) => (
  <List style={{ padding: 20 }}>
    {list.map(item => (
      <ListItem
        key={item.title}
        style={{
          borderBottom: '1px solid grey',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Checkbox
          color="primary"
          edge="start"
          onChange={() => changeTitleStatus(item.id)}
          checked={item.completed}
        />
        <label style={{ textAligt: 'start' }}>{item.title}</label>
        <Button
          color="secondary"
          style={{
            width: 100, textAlign: 'flex-end',
          }}
          startIcon={<CloseIcon />}
          onClick={() => deleteTitle(item.id)}
        />
      </ListItem>
    ))}
  </List>
);

WishList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  changeTitleStatus: PropTypes.func.isRequired,
  deleteTitle: PropTypes.func.isRequired,
};

// (PropTypes.shape({
//   id: PropTypes.number.isRequired,
//   title: PropTypes.string.isRequired,
//   completed: PropTypes.bool.isRequired,
// })).
