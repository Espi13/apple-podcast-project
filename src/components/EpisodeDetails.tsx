import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import PodcastEpisodeModel from '../models/PodcastEpisode';

const EpisodeDetails: FC<{ episode: PodcastEpisodeModel }> = ({ episode }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" mb={2}>
          {episode.title}
        </Typography>

        <Typography
          variant="body1"
          component="div"
          sx={{ fontStyle: 'italic' }}
          dangerouslySetInnerHTML={{
            __html: descriptionParser(episode.description),
          }}
        ></Typography>
        <Divider sx={{ margin: '2rem auto' }} />
        <CardMedia component="audio" image={episode.audio} controls />
      </CardContent>
    </Card>
  );
};

export default EpisodeDetails;

//Function to parse the description of the episode adding the <br/> tag to the description and adding the links to the description

const descriptionParser = (description: string) => {
  const textParsed = description
    .split('\n')
    .map((element) => {
      if (element.includes('http')) {
        let withLinks = '';
        const positionStart = element.indexOf('http');
        let positionEnd = element.indexOf(' ', positionStart);

        if (positionEnd === -1) {
          positionEnd = element.length;
          const link = element.slice(positionStart, positionEnd);
          withLinks = [
            element.slice(0, positionStart),
            `<a href="${link}">`,
            element.slice(positionStart, positionEnd),
            '</a>',
            element.slice(positionEnd),
          ].join('');
        } else {
          const link = element.slice(positionStart, positionEnd);
          withLinks = [
            element.slice(0, positionStart),
            `<a href="${link}">`,
            element.slice(positionStart, positionEnd),
            '</a>',
            element.slice(positionEnd),
          ].join('');
        }

        return withLinks;
      } else {
        return element;
      }
    })
    .join(' <br/>');

  return textParsed;
};
