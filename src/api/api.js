const BaseURL = 'https://rickandmortyapi.com/api';

const request = () => fetch(BaseURL)
.then(response => response.json())
  .then(result => {console.log(result)})

export const getCharacters = () => fetch(request.characters)
.then(response => response.json())
  .then(result => {console.log(result)})


export const getLocations = (links) => fetch(request.locations)
.then(response => response.json())

export const getEpisodes = (links) => fetch(request.episodes)
.then(response => response.json())