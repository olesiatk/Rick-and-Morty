const BaseURL = 'https://rickandmortyapi.com/api';

export const getLinks = () => fetch(BaseURL)
.then(response => response.json())

export  const getCharacters = (links) => fetch(links.characters)
  .then(response => response.json());

export  const getLocations = (links) => fetch(links.locations)
  .then(response => response.json());

export  const getEpisodes = (links) => fetch(links.episodes)
  .then(response => response.json());