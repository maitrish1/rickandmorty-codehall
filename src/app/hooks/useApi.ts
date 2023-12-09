"use client"

import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';

interface PageInfo {
  info?: {
    next?: string;
  };
}
// Define API endpoint types
type Endpoint = 'character' | 'location' | 'episode';

// Define a generic function to fetch data for a specific endpoint
const fetchData = async (endpoint: Endpoint, pageParam: number | null, params: Record<string, string>) => {
  const query = new URLSearchParams(params).toString();
  const url = `https://rickandmortyapi.com/api/${endpoint}?page=${pageParam}&${query}`;
  const response = await fetch(url);

  if (!response.ok) {
    if(response.status===404){
      console.log('no results')
    }
    else throw new Error('Network response was not ok');
  }

  return response.json();
};


// Define custom hook to fetch data with React Query
const useApi = <T extends PageInfo>(endpoint: Endpoint, filter: Record<string, string>, options?: UseInfiniteQueryOptions<T, Error>) => {
  return useInfiniteQuery<T, Error>(
    endpoint,
    ({ pageParam = 1 }) => fetchData(endpoint, pageParam, filter),
    {
      ...options,
      getNextPageParam: (lastPage) => {
        // Extract the page number from the next URL
        if (lastPage?.info?.next) {
          const url = new URL(lastPage.info?.next);
          const nextPage = url.searchParams.get('page');
          return nextPage ? Number(nextPage) : undefined;
        }
        return undefined;
      },
      
    }
  );
};


export default useApi;