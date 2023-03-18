class PodcastEpisodeModel {
  id: string;
  title: string;
  description: string;
  duration: number;
  date: string;

  constructor(
    id: string,
    title: string,
    description: string,
    duration: number,
    date: string,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.duration = duration;
    this.date = date;
  }
}

export default PodcastEpisodeModel;
