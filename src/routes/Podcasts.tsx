import { Container } from '@mui/material';
import { FC, useState } from 'react';
import PodcastList from '../components/PodcastList';
import SearchInput from '../components/SearchInput';
import PodcastModel from '../models/podcast.model';

const Podcasts: FC = () => {
  const [numPodcasts, setNumPodcasts] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Container>
      <SearchInput numPodcasts={numPodcasts} onSearch={setSearchTerm} />
      <PodcastList searchTerm={searchTerm} setNumPodcast={setNumPodcasts} />;
    </Container>
  );
};

export default Podcasts;

export const loader = async () => {
  if (checkTimePassed()) {
    const response = await fetch(
      'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
    );
    const resData = await response.json();
    const { feed } = resData;

    const podcasts = feed.entry.map((podcast: any) => {
      return {
        id: podcast.id.attributes['im:id'],
        artist: podcast['im:artist'].label,
        image: podcast['im:image'][2].label,
        title: podcast.title.label,
      };
    }) as PodcastModel[];

    localStorage.setItem('podcasts', JSON.stringify(podcasts));
    localStorage.setItem('podcastTimer', new Date().toString());

    return podcasts;
  } else {
    const podcasts = localStorage.getItem('podcasts');
    if (podcasts) {
      return JSON.parse(podcasts);
    }
    return [];
  }
};

const checkTimePassed = () => {
  const podcastTimer = localStorage.getItem('podcastTimer');
  if (podcastTimer) {
    const today = new Date('March 19, 2023 11:25:00').getTime(); //new Date("March 19, 2023 11:25:00").getTime();
    const podcastDate = new Date(podcastTimer).getTime();
    const result = (today - podcastDate) / (24 * 3600 * 1000);

    if (result > 1) {
      return true;
    } else {
      return false;
    }
  }

  return true;
};
