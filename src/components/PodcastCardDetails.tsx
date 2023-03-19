import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface IPodcastCardDetailsProps {
  id: string;
  title: string;
  artist: string;
  summary: string;
  image: string;
}

const PodcastCardDetails: FC<IPodcastCardDetailsProps> = ({
  id,
  title,
  artist,
  summary,
  image,
}) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/podcast/${id}`)} sx={{ cursor: 'pointer' }}>
      <CardMedia
        image={image}
        sx={{
          height: 300,
          width: 300,
          margin: '50px auto',
          borderRadius: '10px',
        }}
      />

      <CardContent>
        <Divider />
        <Typography gutterBottom variant="h5" component="div" mt={2}>
          {title}
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontStyle: 'italic' }}
          mb={2}
        >
          by {artist}
        </Typography>
        <Divider />
        <Typography variant="body1" mt={2} fontWeight={600}>
          Description:
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {summary}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PodcastCardDetails;
