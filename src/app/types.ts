export type Character = {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
      name: string;
      url: string;
    };
    location: {
      name: string;
      url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
  };

  export type Debounce ={
    value:string,
    delay:number
  }

  export type ApiResponse<T> = {
    info: {
      count: number;
      pages: number;
      next: string;
      prev: string;
    };
    results: T[];
  };

  export type LocationData = {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: string;
  };