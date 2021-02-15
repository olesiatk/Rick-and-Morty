const BaseURL = 'https://rickandmortyapi.com/api';

export const getCharacters = p => fetch(`${BaseURL}/character?page=${p}`)
  .then(response => response.json());

export const getLocations = p => fetch(`${BaseURL}/location?page=${p}`)
  .then(response => response.json());

export const getEpisodes = p => fetch(`${BaseURL}/episode?page=${p}`)
  .then(response => response.json());
