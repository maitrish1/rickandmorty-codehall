"use client";

import React, { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import InfiniteScroll from "react-infinite-scroll-component";
import CharacterCard from "../components/CharacterCard";
import { useRouter } from "next/navigation";
import useDebounce from "../hooks/useDebounce";
import {
  GenderSelect,
  SpeciesSelect,
  StatusSelect,
} from "../components/FormSelect";
import { ApiResponse, Character } from "../types";
import { Grid, Skeleton, Stack, TextField, Typography } from "@mui/material";

const CharacterComponent: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    status: "",
    gender: "",
    species: "",
    type: "",
  });
  const debouncedSearchTerm = useDebounce({ value: searchTerm, delay: 800 });

  const { data, error, isLoading, fetchNextPage, hasNextPage, refetch } =
    useApi<ApiResponse<Character>>("character", {
      ...filter,
      name: debouncedSearchTerm,
    });

  useEffect(() => {
    refetch();
  }, [filter, refetch, debouncedSearchTerm]);

  if (isLoading) {
    return (
      <Grid container mt={-8}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={2} lg={2} key={index}>
            <Skeleton width={200} height={500} />
          </Grid>
        ))}
      </Grid>
    );
  }
  
  
  if (error) return <div>An error has occurred: {error.message}</div>;

  // Flatten the data.results array
  const characters = data?.pages.flatMap((page) => page.results);

  const handleCharacterClick = (id: number) => {
    router.push(`/characters/${id}`);
  };

  return (
    <Grid container display='flex' justifyContent='center' alignItems='center'>
    <Stack width='100%' flexDirection='row' alignItems='center' flexWrap={{xs:'wrap', md:'nowrap', lg:'nowrap'}}> 
      <TextField fullWidth size="small"
        label="Search"
        variant="outlined"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <StatusSelect
        value={filter.status}
        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
      />
      <GenderSelect
        value={filter.gender}
        onChange={(e) => setFilter({ ...filter, gender: e.target.value })}
      />
      <SpeciesSelect
        value={filter.species}
        onChange={(e) => setFilter({ ...filter, species: e.target.value })}
      />
      </Stack>
     

      {characters && characters.some((character) => character !== undefined) ? (
        <InfiniteScroll
          dataLength={characters.length}
          next={fetchNextPage}
          hasMore={hasNextPage ?? false}
          loader={<h4>Loading...</h4>}
        >
          <Grid mt={5} container alignItems='center' justifyContent='center'>
            {characters.map(
              (character) =>
                character && (
                  <Grid px={4} display='flex' alignItems='center' justifyContent='center'
                    xs={12}
                    sm={12}
                    md={4}
                    lg={3}
                    key={character.id}
                    onClick={() => handleCharacterClick(character.id)}
                  >
                    <CharacterCard character={character} />
                  </Grid>
                )
            )}
          </Grid>
        </InfiniteScroll>
      ) : (
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Typography variant="h3">No character as such</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default CharacterComponent;