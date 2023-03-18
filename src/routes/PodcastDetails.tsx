import { Container, Grid } from '@mui/material';
import { FC } from 'react';
import { useLoaderData } from 'react-router-dom';
import PodcastCardDetails from '../components/PodcastCardDetails';
import PodcastEpisodesDetails from '../components/PodcastEpisodesDetails';
import PodcastDetailModel from '../models/PodcastDetail.model';
import PodcastEpisodeModel from '../models/PodcastEpisode';

const PodcastDetails: FC = () => {
  const podcastDetails = useLoaderData() as PodcastDetailModel;

  return (
    <Container maxWidth="xl" sx={{ marginTop: 4 }}>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 12 }}>
        <Grid item xs={12} sm={6} md={4}>
          <PodcastCardDetails
            title={podcastDetails.title}
            artist={podcastDetails.artist}
            summary={podcastDetails.summary}
            image={podcastDetails.image}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <PodcastEpisodesDetails episodes={podcastDetails.episodes} />
        </Grid>
      </Grid>
    </Container>
  );
};
export default PodcastDetails;

export const loader = async (podcastId: string | undefined) => {
  // const url = "https://itunes.apple.com/lookup?id=${podcastId}";
  // const url2 =
  //   "https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode";
  const response = await fetch(
    `https://api.allorigins.win/raw?url=${encodeURIComponent(
      `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode`,
    )}`,
  );

  if (response.status == 400) {
    throw new Error('Podcast not found');
  }
  const resPodcast = await response.json();

  const podcastInfo = resPodcast.results[0];
  resPodcast.results.shift();

  const podcastDetails = {
    id: podcastInfo.collectionId,
    title: podcastInfo.collectionName,
    artist: podcastInfo.artistName,
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque venenatis mauris et suscipit facilisis. Curabitur nisl ante, placerat et massa venenatis, efficitur congue magna. Integer dui sem, pellentesque quis tortor sit amet, bibendum facilisis velit.', //The endpoint doesn't provide a summary
    image: podcastInfo.artworkUrl600,
    episodes: resPodcast.results.map((podcast: any) => {
      return {
        id: podcast.trackId,
        title: podcast.trackName,
        description: podcast.description,
        image: podcast.artworkUrl600,
        audio: podcast.previewUrl,
        duration: podcast.trackTimeMillis,
        date: podcast.releaseDate,
      };
    }) as PodcastEpisodeModel[],
  } as PodcastDetailModel;

  return podcastDetails;
};
