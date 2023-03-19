import { Container, Grid } from '@mui/material';
import { FC } from 'react';
import { useLoaderData } from 'react-router-dom';
import EpisodeDetails from '../components/EpisodeDetails';
import PodcastCardDetails from '../components/PodcastCardDetails';
import PodcastDetailModel from '../models/PodcastDetail.model';
import PodcastEpisodeModel from '../models/PodcastEpisode';
import { checkTimePassed } from '../utils/checkTimePassed';

const Episode: FC = () => {
  const podcastEpisode = useLoaderData() as PodcastDetailModel;

  return (
    <Container maxWidth="xl" sx={{ marginTop: 4 }}>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 12 }}>
        <Grid item xs={12} sm={6} md={4}>
          <PodcastCardDetails
            id={podcastEpisode.id}
            title={podcastEpisode.title}
            artist={podcastEpisode.artist}
            summary={podcastEpisode.summary}
            image={podcastEpisode.image}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <EpisodeDetails episode={podcastEpisode.episodes[0]} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Episode;

export const loader = async (
  podcastId: string | undefined,
  episodeId: string | undefined,
) => {
  const podcastDetailsStorage = localStorage.getItem('podcastDetails');
  if (podcastDetailsStorage) {
    const podcastDetailsParsed = JSON.parse(podcastDetailsStorage);
    if (
      podcastDetailsParsed.id == podcastId &&
      !checkTimePassed('podcastDetailsTime')
    ) {
      const episode = podcastDetailsParsed.episodes.find(
        (episode: any) => episode.id == episodeId,
      );
      return {
        id: podcastDetailsParsed.id,
        title: podcastDetailsParsed.title,
        artist: podcastDetailsParsed.artist,
        summary: podcastDetailsParsed.summary,
        image: podcastDetailsParsed.image,
        episodes: [
          {
            id: episode.id,
            title: episode.title,
            description: episode.description,
            image: episode.image,
            audio: episode.audio,
            duration: episode.duration,
            date: episode.date,
          } as PodcastEpisodeModel,
        ],
      } as PodcastDetailModel;
    }
  }

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
  const episode = resPodcast.results.find(
    (episode: any) => episode.trackId == episodeId,
  );

  const podcastDetails = {
    id: podcastInfo.trackId,
    title: podcastInfo.collectionName,
    artist: podcastInfo.artistName,
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque venenatis mauris et suscipit facilisis. Curabitur nisl ante, placerat et massa venenatis, efficitur congue magna. Integer dui sem, pellentesque quis tortor sit amet, bibendum facilisis velit.', //The endpoint doesn't provide a summary,
    image: podcastInfo.artworkUrl600,
    episodes: [
      {
        id: episode.trackId,
        title: episode.trackName,
        description: episode.description,
        image: episode.artworkUrl600,
        audio: episode.episodeUrl,
        duration: episode.trackTimeMillis,
        date: episode.releaseDate,
      } as PodcastEpisodeModel,
    ],
  } as PodcastDetailModel;

  return podcastDetails;
};
