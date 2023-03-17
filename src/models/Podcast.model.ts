class PodcastModel {
  id: string;
  artist: string;
  image: string;
  title: string;

  constructor(id: string, artist: string, image: string, title: string) {
    this.id = id;
    this.artist = artist;
    this.image = image;

    this.title = title;
  }
}

export default PodcastModel;
