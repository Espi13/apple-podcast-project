import PodcastEpisodeModel from './PodcastEpisode';

class PodcastDetailModel {
  id: string;
  title: string;
  artist: string;
  summary: string;
  image: string;
  episodes: PodcastEpisodeModel[];

  constructor(
    id: string,
    title: string,
    artist: string,
    summary: string,
    image: string,
    episodes: PodcastEpisodeModel[],
  ) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.summary = summary;
    this.image = image;
    this.episodes = episodes;
  }
}

export default PodcastDetailModel;
