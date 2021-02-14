import React from 'react';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const WishList = ({ list, changeTitleStatus, deleteTitle }) => (
  <List style={{ padding: 20 }}>
    {list.map(title => (
      <ListItem key={title.id} style={{ borderBottom: '1px solid grey', display: 'flex', justifyContent: 'space-between' }}>
        <FormControlLabel
          control={  
          <Checkbox 
            color="primary" 
            edge="start"
            onChange={() => changeTitleStatus(title.id)}
            checked={title.completed}
          />
          }
          label={title.title}
        />
        <Button
          color="secondary"
          style={{ width: 100, textAlign: 'flex-end'}}
          startIcon={<CloseIcon />}
          onClick={() => deleteTitle(title.id)}
        />
      </ListItem>
    ))}
  </List>
);