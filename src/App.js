import React, { useState, useEffect } from 'react';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonPinIcon from '@material-ui/icons/PersonPin';

import { getCharacters, getEpisodes, getLocations } from './api/api';
import { Characters } from './components/Characters/Characters';
import { Locations } from './components/Locations/Locations';
import { Episodes } from './components/Episodes/Episodes';
import { WatchList } from './components/WatchList/WatchList';

import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  const [value, setValue] = useState('Characters');

  useEffect(() => {
    for (let i = 1; i <= 34; i += 1) {
      getCharacters(i).then((result) => {
        setCharacters(prevCharacters => [...prevCharacters, ...result.results]);
      });
    }

    for (let i = 1; i <= 6; i += 1) {
      getLocations(i).then((result) => {
        setLocations(prevLocations => [...prevLocations, ...result.results]);
      });
    }

    for (let i = 1; i <= 3; i += 1) {
      getEpisodes(i).then((result) => {
        setEpisodes(prevEpisodes => [...prevEpisodes, ...result.results]);
      });
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <BottomNavigation
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)', maxWidth: '100%',
          }}
          className="App__menu"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
        >
          <BottomNavigationAction
            label="Characters"
            value="Characters"
            icon={<PersonPinIcon />}
          />
          <BottomNavigationAction
            label="Episodes"
            value="Episodes"
            icon={<FolderIcon />}
          />
          <BottomNavigationAction
            label="Locations"
            value="Locations"
            icon={<LocationOnIcon />}
          />
          <BottomNavigationAction
            style={{ minWidth: 115 }}
            label="My watch list"
            value="WatchList"
            icon={<FavoriteIcon />}
          />
        </BottomNavigation>
      </header>
      <main>
        {value === 'Characters' && characters[0]
        && <Characters characters={characters} />
        }
        {value === 'Episodes' && episodes[0]
        && <Episodes episodes={episodes} />
        }
        {value === 'Locations' && locations[0]
        && <Locations locations={locations} />
        }
        {value === 'WatchList'
        && <WatchList />
        }
      </main>
    </div>
  );
}

export default App;
