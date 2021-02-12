import React, {useState, useEffect} from 'react';
// import Characters from './'
import './App.css';

function App() {
  const [links, setLinks] = useState({});
  const [characters, setCharacters] = useState({});
  const [locations, setLocations] = useState({});
  const [episodes, setEpisodes] = useState({});


  const BaseURL = 'https://rickandmortyapi.com/api';

  const getLinks = () => fetch(BaseURL)
    .then(response => response.json())
      .then(result => setLinks(result));

  useEffect(() => {
    getLinks();
  }, []);

  const getCharacters = (links) => fetch(links.characters)
  .then(response => response.json())
    .then(result => setCharacters(result.results));

  const getLocations = (links) => fetch(links.locations)
  .then(response => response.json())
    .then(result => setLocations(result.results));

  const getEpisodes = (links) => fetch(links.episodes)
  .then(response => response.json())
    .then(result => setEpisodes(result.results));
  
  useEffect(() => {
    getCharacters(links);
    getLocations(links);
    getEpisodes(links);
  }, [links]);




  console.log(links, characters, locations, episodes);

  return (
    <div className="App">
      <header className="App-header">
        <nav className='App__menu'>
          <ul className='App__menu-list'>
            <li className='App__menu-link'>Characters</li>
            <li className='App__menu-link'>Episodes</li>
            <li className='App__menu-link'>Locations</li>
            <li className='App__menu-link'>My watch list</li>
          </ul>
        </nav>
      </header>
      {/* <Characters /> */}
    </div>
  );
}

export default App;
