import { Container, Grid } from '@mui/material';
import { FC } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import PodcastCardDetails from '../components/PodcastCardDetails';
import PodcastEpisodesDetails from '../components/PodcastEpisodesDetails';
import PodcastDetailModel from '../models/PodcastDetail.model';
import PodcastEpisodeModel from '../models/PodcastEpisode';
import { checkTimePassed } from '../utils/checkTimePassed';

const PodcastDetails: FC = () => {
  const podcastDetails = useLoaderData() as PodcastDetailModel;
  const navigate = useNavigate();

  const handlerNavigateToEpisode = (episodeId: number) => {
    navigate(`/podcast/${podcastDetails.id}/episode/${episodeId}`);
  };

  return (
    <Container maxWidth='xl' sx={{ marginTop: 4 }}>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 12 }}>
        <Grid item xs={12} sm={6} md={4}>
          <PodcastCardDetails
            id={podcastDetails.id}
            title={podcastDetails.title}
            artist={podcastDetails.artist}
            summary={podcastDetails.summary}
            image={podcastDetails.image}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <PodcastEpisodesDetails
            episodes={podcastDetails.episodes}
            onClick={(episodeId: number) => handlerNavigateToEpisode(episodeId)}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default PodcastDetails;

export const loader = async (podcastId: string | undefined) => {
  const podcastDetails = localStorage.getItem('podcastDetails');
  if (podcastDetails) {
    const podcastDetailsParsed = JSON.parse(podcastDetails);
    if (
      podcastDetailsParsed.id == podcastId &&
      !checkTimePassed('podcastDetailsTime')
    ) {
      return podcastDetailsParsed;
    } else {
      localStorage.removeItem('podcastDetailsTime');
      localStorage.removeItem('podcastDetails');
    }
  }

  if (checkTimePassed('podcastDetailsTime')) {
    const response: any = await fetch(
      `https://api.allorigins.win/raw?url=${encodeURIComponent(
        `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode`
      )}`
    );

    if (response.status == 400) {
      console.error('Error: ', response.status);
      return [];
    }
    const resPodcast = await response.json();

    const podcastInfo = resPodcast.results[0];
    resPodcast.results.shift();
    const podcastDetails = {
      id: podcastInfo.trackId,
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
          audio: podcast.episodeUrl,
          duration: podcast.trackTimeMillis,
          date: podcast.releaseDate,
        };
      }) as PodcastEpisodeModel[],
    } as PodcastDetailModel;

    localStorage.setItem('podcastDetails', JSON.stringify(podcastDetails));
    localStorage.setItem('podcastDetailsTime', new Date().toString());

    return podcastDetails;
  }
};
