"use client"

import { useQuery } from 'react-query';

// Define API endpoint types
type Endpoint = 'character' | 'location' | 'episode';

// Define a generic function to fetch data for a specific endpoint
const fetchData = async (endpoint: Endpoint, id: number) => {
  const url = `https://rickandmortyapi.com/api/${endpoint}/${id}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

// Define custom hook to fetch data with React Query
const useCharacter = <T>(endpoint: Endpoint, id: number) => {
  return useQuery<T, Error>(
    [endpoint, id],
    () => fetchData(endpoint, id),
  );
};

export default useCharacter;