import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { WishList } from './UI/WishList';

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
      const newTitle = {
        id: +new Date(),
        title,
        completed: false,
      };

      setList([...list, newTitle]);
    }

    setTitle('');
  };

  const deleteTitle = (titleId) => {
    setList(list.filter(item => item.id !== titleId));
  };

  const changeTitleStatus = (titleId) => {
    setList(prevList => prevList.map((item) => {
      if (item.id === titleId) {
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
      <Paper
        style={{
          margin: 20, backgroundColor: 'rgba(255, 255, 255, 0.5)',
        }}
      >
        <form
          style={{ padding: 20 }}
          onSubmit={(e) => {
            e.preventDefault();
            addTitle();
          }}
        >
          <FormControl
            style={{
              display: 'flex', flexDirection: 'row',
            }}
          >
            <TextField
              label="I want to watch..."
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
  );
};
