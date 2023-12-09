"use client";

import React, { useEffect, useState } from 'react';
import useCharacter from "../../hooks/useCharacter";
import {Typography, Button, Menu, MenuItem, Box, Grid } from "@mui/material";
import { Character, LocationData } from '@/app/types';

type CharacterPageProps = {
  params: {
    id: string;
  };
};

const CharacterPage: React.FC<CharacterPageProps> = ({ params }) => {
  const { data: characterData, error: characterError, isLoading: characterLoading } = useCharacter<Character>(
    "character",
    Number(params.id)
  );

  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [episodeNames, setEpisodeNames] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (characterData?.location.url) {
      fetch(characterData.location.url)
        .then(response => response.json())
        .then(data => setLocationData(data));
    }
  }, [characterData]);

  useEffect(() => {
    if (characterData?.episode) {
      Promise.all(characterData.episode.map(url => fetch(url).then(res => res.json())))
        .then(episodes => setEpisodeNames(episodes.map(episode => episode.name)));
    }
  }, [characterData]);

  if (characterLoading) return <div>Loading...</div>;
  if (characterError) return <div>An error has occurred: {characterError.message}</div>;

  return (
    <Grid textAlign='center' container alignItems='center' flexDirection='column' justifyContent='center'>
        <Typography variant="h3" gutterBottom>
          {characterData?.name}
        </Typography>
        <img src={characterData?.image} alt={characterData?.name} />
        <Typography variant="body1">Status: {characterData?.status}</Typography>
        <Typography variant="body1">Species: {characterData?.species}</Typography>
        <Typography variant="body1">Gender: {characterData?.gender}</Typography>
        <Typography variant="body1">Origin: {characterData?.origin.name}</Typography>
        {locationData && (
          <>
            <Typography variant="body1">Location Name: {locationData.name}</Typography>
            <Typography variant="body1">Dimension: {locationData.dimension}</Typography>
            <Typography variant="body1">Number of Residents: {locationData.residents.length}</Typography>
          </>
        )}
        {episodeNames.length > 0 && (
          <>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              Episodes
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {episodeNames.map((name, index) => (
                <MenuItem key={index} onClick={handleClose}>
                  {name}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
    </Grid>
  );
};

export default CharacterPage;