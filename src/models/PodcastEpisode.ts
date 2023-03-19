class PodcastEpisodeModel {
  id: string;
  title: string;
  description: string;
  duration: number;
  date: string;
  audio: string;

  constructor(
    id: string,
    title: string,
    description: string,
    duration: number,
    date: string,
    audio: string,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.duration = duration;
    this.date = date;
    this.audio = audio;
  }
}

export default PodcastEpisodeModel;
