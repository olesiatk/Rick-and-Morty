const BaseURL = 'https://rickandmortyapi.com/api';

export  const getCharacters = (page) => fetch(`${BaseURL}/character?page=${page}`)
  .then(response => response.json());

export  const getLocations = (page) => fetch(`${BaseURL}/location?page=${page}`)
  .then(response => response.json());

export  const getEpisodes = (page) => fetch(`${BaseURL}/episode?page=${page}`)
  .then(response => response.json());