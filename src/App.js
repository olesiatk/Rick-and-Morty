import React, {useState, useEffect} from 'react';
import { getLinks, getCharacters, getEpisodes, getLocations } from './api/api'
import { Characters } from './components/Characters/Characters'
import { Locations } from './components/Locations/Locations'
import { Episodes } from './components/Episodes/Episodes'
import { WatchList } from './components/WatchList/WatchList'

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonPinIcon from '@material-ui/icons/PersonPin';


import './App.css';

function App() {
  const [links, setLinks] = useState({});
  const [characters, setCharacters] = useState({});
  const [locations, setLocations] = useState({});
  const [episodes, setEpisodes] = useState({});

  const [value, setValue] = useState("Characters");

  useEffect(() => {
    getLinks().then(result => setLinks(result));;
  }, []);
  
  useEffect(() => {
    getCharacters(links).then(result => setCharacters(result.results));;
    getLocations(links).then(result => setLocations(result.results));
    getEpisodes(links).then(result => setEpisodes(result.results));
  }, [links]);

  return (
    <div className="App">
      <header className="App-header">
        <BottomNavigation
          style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', maxWidth: '100%'}}
          className="App__menu"
          value={value}
          onChange={(event, newValue) => {
            console.log(value);
            setValue(newValue);
          }}
          showLabels
        >
          <BottomNavigationAction style={{minWidth: 100}} label="Characters" value="Characters" icon={<PersonPinIcon />} />
          <BottomNavigationAction style={{minWidth: 100}} label="Episodes" value="Episodes" icon={<FolderIcon />} />
          <BottomNavigationAction style={{minWidth: 100}} label="Locations" value="Locations" icon={<LocationOnIcon />} />
          <BottomNavigationAction style={{minWidth: 100}} label="My watch list" value="WatchList" icon={<FavoriteIcon />} />
        </BottomNavigation>
      </header>
      <main>
      {value==='Characters' && characters[0] &&
        <Characters characters={characters}/>
      }
      {value==='Episodes' && episodes[0] &&
        <Episodes episodes={episodes}/>
      }
      {value==='Locations' && locations[0] &&
        <Locations locations={locations}/>
      }
      {value==='WatchList' &&
        <WatchList />
      }
      </main>
    </div>
  );
}

export default App;
