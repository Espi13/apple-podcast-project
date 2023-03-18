import { Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import PodcastModel from '../models/podcast.model';
import Podcast from './Podcast';

interface IPodcastListProps {
  searchTerm: string;
  setNumPodcast: (numPodcasts: number) => void;
}

const PodcastList: FC<IPodcastListProps> = ({ searchTerm, setNumPodcast }) => {
  const navigate = useNavigate();

  const podcasts = useLoaderData() as PodcastModel[];

  const [podcastList, setPodcastList] = useState<PodcastModel[]>([]);

  useEffect(() => {
    if (searchTerm) {
      const filteredPodcasts = podcasts.filter(
        (podcast) =>
          podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          podcast.artist.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setPodcastList(filteredPodcasts);
      setNumPodcast(filteredPodcasts.length);
    } else {
      setPodcastList(podcasts);
      setNumPodcast(podcasts.length);
    }
  }, [searchTerm]);

  useEffect(() => {
    setPodcastList(podcasts);
    setNumPodcast(podcasts.length);
  }, [podcasts]);
  return (
    <Grid
      container
      rowSpacing={5}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      padding={5}
    >
      {podcastList.map((podcast) => (
        <Podcast
          key={podcast.id}
          id={podcast.id}
          image={podcast.image}
          title={podcast.title}
          author={podcast.artist}
          onClick={() => {
            navigate(`/podcasts/${podcast.id}`);
          }}
        />
      ))}
    </Grid>
  );
};

export default PodcastList;
