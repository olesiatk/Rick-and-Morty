import React, { useState, useEffect } from 'react';
import { WishList } from '../WishList';
import { Paper, FormControl, TextField, Button } from '@material-ui/core';

export const WatchList = () => {

const [list, setList] = useState([]);
const [title, setTitle] = useState('');

useEffect(() => {
  if (!localStorage.list) {
    localStorage.setItem('list', JSON.stringify([]));
  } else {
    setList(JSON.parse(localStorage.getItem('list')));
  }
}, []);

useEffect(() => {
  localStorage.setItem('list', JSON.stringify(list));
}, [list]);



const addTitle = () => {
  if (title.trim()) {
    const newTitle= {
      id: +new Date(),
      title,
      completed: false,
    };

    setList([...list, newTitle]);
  }

  setTitle('');
}

const deleteTitle = (titleId) => {
  setList(list.filter(title => title.id !== titleId));
};

const changeTitleStatus = (titleId) => {
  setList(prevList => prevList.map((title) => {
    if (title.id === titleId) {
      return {
        ...title,
        completed: !title.completed,
      };
    }

    return title;
  }));
};

  return (
    <div> 
      <h1>My watch list</h1>
      <Paper style={{ margin: 20, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
        <form
          style={{ padding: 20 }}
          onSubmit = {(event) => {
            event.preventDefault();
            addTitle();
          }}
        >
          <FormControl style={{display: 'flex', flexDirection: 'row'}}>
            <TextField 
              label='I want to watch...'
              variant="outlined" 
              type="text"
              className="new-title"
              placeholder="... name of episode... "
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <Button variant="contained" color="primary" type="submit">
              Add to list
            </Button>
          </FormControl>
        </form>
        <WishList
          list={list}
          changeTitleStatus={changeTitleStatus}
          deleteTitle={deleteTitle}
        />
      </Paper>
    </div>
  )
}

