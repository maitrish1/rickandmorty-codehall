import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Character } from '../types';

type Props = {
  character: Character;
};

const CharacterCard: React.FC<Props> = ({ character }) => {
  return (
    <Card sx={{ maxWidth: 200, maxHeight:500, mb:5,  }}>
      <CardMedia
        component="img"
        height="200"
        image={character?.image}
        alt={character?.name}
      />
      <CardContent>
        <Typography gutterBottom variant="subtitle1" component="div">
          {character?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {character?.status}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Species: {character?.species}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gender: {character?.gender}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CharacterCard;